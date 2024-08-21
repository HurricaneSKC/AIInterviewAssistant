"use client";

import useQuestionPlaylistStore from "@/app/data/stores/questionPlaylist";
import InterviewSession from "@/components/InterviewSession/InterviewSession";
import InterviewerSelector from "@/components/InterviewerSelector";
import BackGroundSVG from "@/components/SVGs/BackGroundSVG";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { v4 as uuid } from "uuid";
import useInterviewerStore from "@/app/data/stores/interviewers";
import InterviewerPresentation from "./InterviewerPresentation";

export interface Interviewer {
  id: string;
  name: string;
  description: string;
  level: string;
}

interface InterviewAvatarVideo {
  srcLucy: string;
  srcSarah: string;
  srcRichard: string;
  srcPeter: string;
}

export interface Question {
  id: number;
  question: string;
  interviewAvatarVideo: InterviewAvatarVideo;
}

export interface InterviewCategory {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  interviewers: Interviewer[];
  questions: Question[];
}

export interface DataStructure {
  [key: string]: InterviewCategory;
}

const ffmpeg = createFFmpeg({
  // corePath: `http://localhost:3000/ffmpeg/dist/ffmpeg-core.js`,
  // I've included a default import above (and files in the public directory), but you can also use a CDN like this:
  corePath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js",
  log: true,
});

export default function Interview({ userEmail }: { userEmail: string | null }) {
  const playList = useQuestionPlaylistStore((state) => state.questions);
  console.log("playList", playList);

  const interviewers = useInterviewerStore((state) => state.interviewers);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  console.log("currentQuestionIndex", currentQuestionIndex);

  const [selectedInterviewer, setSelectedInterviewer] = useState<Interviewer>(
    interviewers[0]
  );
  console.log("selectedInterviewer", selectedInterviewer);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const webcamRef = useRef<Webcam | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [seconds, setSeconds] = useState(150);
  const [videoEnded, setVideoEnded] = useState(false);
  const [recordingPermission, setRecordingPermission] = useState(true);
  const [cameraLoaded, setCameraLoaded] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("Processing");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [transcript, setTranscript] = useState<string>("");
  const [generatedFeedback, setGeneratedFeedback] = useState("");

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  useEffect(() => {
    if (videoEnded) {
      const element = document.getElementById("startTimer");

      if (element) {
        element.style.display = "flex";
      }

      setCapturing(true);
      setIsVisible(false);

      mediaRecorderRef.current = new MediaRecorder(
        webcamRef?.current?.stream as MediaStream
      );
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
  }, [videoEnded, webcamRef, setCapturing, mediaRecorderRef]);

  const handleStartCaptureClick = useCallback(() => {
    const startTimer = document.getElementById("startTimer");
    if (startTimer) {
      startTimer.style.display = "none";
    }

    if (vidRef.current) {
      vidRef.current.play();
    }
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  useEffect(() => {
    let timer: any = null;
    if (capturing) {
      timer = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      if (seconds === 0) {
        handleStopCaptureClick();
        setCapturing(false);
        setSeconds(0);
      }
    }
    return () => {
      clearInterval(timer);
    };
  });

  const handleDownload = async () => {
    if (recordedChunks.length) {
      setSubmitting(true);
      setStatus("Processing");

      const file = new Blob(recordedChunks, {
        type: `video/webm`,
      });

      const unique_id = uuid();

      // This checks if ffmpeg is loaded
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }

      // This writes the file to memory, removes the video, and converts the audio to mp3
      ffmpeg.FS("writeFile", `${unique_id}.webm`, await fetchFile(file));
      await ffmpeg.run(
        "-i",
        `${unique_id}.webm`,
        "-vn",
        "-acodec",
        "libmp3lame",
        "-ac",
        "1",
        "-ar",
        "16000",
        "-f",
        "mp3",
        `${unique_id}.mp3`
      );

      // This reads the converted file from the file system
      const fileData = ffmpeg.FS("readFile", `${unique_id}.mp3`);
      // This creates a new file from the raw data
      const output = new File([fileData.buffer], `${unique_id}.mp3`, {
        type: "audio/mp3",
      });

      const formData = new FormData();
      formData.append("file", output, `${unique_id}.mp3`);
      formData.append("model", "whisper-1");

      const question = currentQuestion.question;

      setStatus("Transcribing");

      const upload = await fetch(
        `/api/transcribe?question=${encodeURIComponent(question)}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const results = await upload.json();

      if (upload.ok) {
        setIsSuccess(true);
        setSubmitting(false);

        if (results.error) {
          setTranscript(results.error);
        } else {
          setTranscript(results.transcript);
        }

        console.log("Uploaded successfully!");

        await Promise.allSettled([
          new Promise((resolve) => setTimeout(resolve, 800)),
        ]).then(() => {
          setCompleted(true);
          console.log("Success!");
        });

        if (results.transcript.length > 0) {
          const prompt = `Please give feedback on the following interview question: ${question} given the following transcript: ${
            results.transcript
          }. ${
            currentQuestion.category === "Behavioral"
              ? "Please also give feedback on the candidate's communication skills. Make sure their response is structured"
              : "Please also give feedback on the candidate's communication skills. Make sure they accurately explain their thoughts in a coherent way. Make sure they stay on topic and relevant to the question."
          } \n\n\ Feedback on the candidate's response:`;

          setGeneratedFeedback("");
          const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt,
            }),
          });

          if (!response.ok) {
            throw new Error(response.statusText);
          }

          // This data is a ReadableStream
          const data = response.body;
          if (!data) {
            return;
          }

          const reader = data.getReader();
          const decoder = new TextDecoder();
          let done = false;

          while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            setGeneratedFeedback((prev: any) => prev + chunkValue);
          }
        }
      } else {
        console.error("Upload failed.");
      }

      setTimeout(function () {
        setRecordedChunks([]);
      }, 1500);
    }
  };

  // fix restart video
  function restartVideo() {
    setRecordedChunks([]);
    setVideoEnded(false);
    setCapturing(false);
    setIsVisible(true);
    setSeconds(150);
  }

  const videoConstraints = isDesktop
    ? { width: 1280, height: 720, facingMode: "user" }
    : { width: 480, height: 640, facingMode: "user" };

  const handleUserMedia = () => {
    setTimeout(() => {
      setLoading(false);
      setCameraLoaded(true);
    }, 1000);
  };

  // fix next question
  const handleNextQuestion = () => {
    setStep(2);
    setCompleted(false);
    setGeneratedFeedback("");
    setTranscript("");
    setRecordedChunks([]);
    setVideoEnded(false);
    setCapturing(false);
    setIsVisible(true);
    setSeconds(150);
    setIsSuccess(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const fallbackQuestion = {
    id: 1,
    question:
      "Tell me about yourself, why don't you walk me through your resume",
    answer:
      "I am a software engineer with 5 years of experience in the field. I have worked on a variety of projects, including web development, mobile app development, and machine learning. I am passionate about technology and enjoy learning new things. I am a team player and enjoy working with others to solve problems. I am excited about the opportunity to work with your company and contribute to its success.",
    category: "Behavioral",
    difficulty: "Easy",
    tags: ["Demo"],
  };

  const currentQuestion = playList[currentQuestionIndex] || fallbackQuestion;

  const isFallbackQuestion = currentQuestion === fallbackQuestion;

  // const currentQuestion = MockQuestionPlaylist[currentQuestionIndex];

  //AWS
  const AWS_URL = "https://aiinterviewassistant.s3.eu-north-1.amazonaws.com/";

  // needs to built and passed
  const currentVideoSrc =
    selectedInterviewer && playList[currentQuestionIndex]
      ? `${AWS_URL}${selectedInterviewer.name}${
          playList[currentQuestionIndex]?.category
        }${playList[currentQuestionIndex]?.id.toString()}.mp4`
      : `videos/${selectedInterviewer.name}${
          currentQuestion.category
        }${currentQuestion.id.toString()}.mp4`;

  console.log("src", currentVideoSrc);

  //currentVideoSrc = `video/{interviewer}

  return (
    <AnimatePresence>
      {step === 2 ? (
        <InterviewSession
          completed={completed}
          recordedChunks={recordedChunks}
          transcript={transcript}
          generatedFeedback={generatedFeedback}
          handleNextQuestion={handleNextQuestion}
          recordingPermission={recordingPermission}
          currentQuestion={currentQuestion}
          cameraLoaded={cameraLoaded}
          seconds={seconds}
          isVisible={isVisible}
          setVideoEnded={setVideoEnded}
          currentVideoSrc={currentVideoSrc}
          vidRef={vidRef}
          webcamRef={webcamRef}
          videoConstraints={videoConstraints}
          handleUserMedia={handleUserMedia}
          setRecordingPermission={setRecordingPermission}
          loading={loading}
          capturing={capturing}
          handleStartCaptureClick={handleStartCaptureClick}
          handleStopCaptureClick={handleStopCaptureClick}
          restartVideo={restartVideo}
          handleDownload={handleDownload}
          isSubmitting={isSubmitting}
          isSuccess={isSuccess}
          setStep={setStep}
          userEmail={userEmail}
          isFallbackQuestion={isFallbackQuestion}
        />
      ) : (
        <div className="flex flex-col md:flex-row w-full md:overflow-hidden">
          <div className="w-full min-h-[60vh] md:w-1/2 md:h-screen flex flex-col px-4 pt-2 pb-8 md:px-0 md:py-2 bg-gray-100 justify-center">
            <div className="h-full w-full items-center justify-center flex flex-col">
              {step === 1 ? (
                <InterviewerSelector
                  setStep={setStep}
                  selectedInterviewer={selectedInterviewer}
                  setSelectedInterviewer={setSelectedInterviewer}
                />
              ) : (
                <p>Step 2</p>
              )}
            </div>
          </div>
          <div className="w-full h-[40vh] md:w-1/2 md:h-screen bg-[#1E2B3A] relative overflow-hidden">
            <BackGroundSVG />

            <InterviewerPresentation
              selectedInterviewer={selectedInterviewer}
            />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
