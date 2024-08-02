import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction } from "react";
import Webcam from "react-webcam";
import RightArrowButton from "../CTAs/RightArrowButton";
import WhiteButton from "../CTAs/WhiteButton";
import CountDownTimer from "../CountDownTimer";
import LoadingSpinner from "../SVGs/LoadingSpinner";
import RightArrowWhiteSVG from "../SVGs/RightArrowWhiteSVG";
import { Question } from "../Dashboard";

interface Props {
  completed: boolean;
  recordedChunks: Blob[];
  transcript: string;
  generatedFeedback: string;
  handleNextQuestion: () => void;
  recordingPermission: boolean;
  currentQuestion: Question;
  cameraLoaded: boolean;
  seconds: number;
  isVisible: boolean;
  setVideoEnded: (value: boolean) => void;
  currentVideoSrc: string | null;
  vidRef: React.RefObject<HTMLVideoElement>;
  webcamRef: React.RefObject<Webcam>;
  videoConstraints: {
    width: number;
    height: number;
    facingMode: string;
  };
  handleUserMedia: () => void;
  setRecordingPermission: (value: SetStateAction<boolean>) => void;
  loading: boolean;
  capturing: boolean;
  handleStartCaptureClick: () => void;
  handleStopCaptureClick: () => void;
  restartVideo: () => void;
  handleDownload: () => Promise<void>;
  isSubmitting: boolean;
  isSuccess: boolean;
  setStep: Dispatch<SetStateAction<number>>;
}

const InterviewSession = ({
  completed,
  recordedChunks,
  transcript,
  generatedFeedback,
  handleNextQuestion,
  recordingPermission,
  currentQuestion,
  cameraLoaded,
  seconds,
  isVisible,
  setVideoEnded,
  currentVideoSrc,
  vidRef,
  webcamRef,
  videoConstraints,
  handleUserMedia,
  setRecordingPermission,
  loading,
  capturing,
  handleStartCaptureClick,
  handleStopCaptureClick,
  restartVideo,
  handleDownload,
  isSubmitting,
  isSuccess,
  setStep,
}: Props) => {
  return (
    <div className="w-full min-h-screen flex flex-col px-4 pt-2 pb-8 md:px-8 md:py-2 bg-[#FCFCFC] relative overflow-x-hidden">
      {completed ? (
        <div className="w-full flex flex-col max-w-[1080px] mx-auto mt-[10vh] overflow-y-auto pb-8 md:pb-12">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.35, ease: [0.075, 0.82, 0.165, 1] }}
            className="relative md:aspect-[16/9] w-full max-w-[1080px] overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md flex flex-col items-center justify-center"
          >
            <video
              className="w-full h-full rounded-lg"
              controls
              crossOrigin="anonymous"
              autoPlay
            >
              <source
                src={URL.createObjectURL(
                  new Blob(recordedChunks, { type: "video/mp4" })
                )}
                type="video/mp4"
              />
            </video>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.15,
              ease: [0.23, 1, 0.82, 1],
            }}
            className="mt-8 flex flex-col"
          >
            <div>
              <h2 className="text-xl font-semibold text-left text-[#1D2B3A] mb-2">
                Transcript
              </h2>
              <p className="prose prose-sm max-w-none">
                {transcript.length > 0
                  ? transcript
                  : "Don't think you said anything. Want to try again?"}
              </p>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-left text-[#1D2B3A] mb-2">
                Feedback
              </h2>
              <div className="mt-4 text-sm flex gap-2.5 rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] p-4 leading-6 text-gray-900 min-h-[100px]">
                <p className="prose prose-sm max-w-none">{generatedFeedback}</p>
              </div>
            </div>
          </motion.div>
          <div className="flex flex-row space-x-4 mt-8 justify-end">
            <RightArrowButton
              onClick={handleNextQuestion}
              buttonText="Continue"
            />
          </div>
        </div>
      ) : (
        <div className="h-full w-full items-center flex flex-col mt-[10vh]">
          {recordingPermission ? (
            <div className="w-full flex flex-col max-w-[1080px] mx-auto justify-center">
              <h2 className="text-2xl font-semibold text-left text-[#1D2B3A] mb-2">
                {currentQuestion && currentQuestion.question}
              </h2>
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.35,
                  ease: [0.075, 0.82, 0.965, 1],
                }}
                className="relative aspect-[16/9] w-full max-w-[1080px] overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md"
              >
                {!cameraLoaded && (
                  <div className="text-white absolute top-1/2 left-1/2 z-20 flex items-center">
                    <LoadingSpinner />
                  </div>
                )}
                <div className="relative z-10 h-full w-full rounded-lg">
                  <div className="absolute top-5 lg:top-10 left-5 lg:left-10 z-20">
                    <CountDownTimer seconds={seconds} />
                  </div>
                  {isVisible && ( // If the video is visible (on screen) we show it
                    <div className="block absolute top-[10px] sm:top-[20px] lg:top-[40px] left-auto right-[10px] sm:right-[20px] md:right-10 h-[80px] sm:h-[140px] md:h-[180px] aspect-video rounded z-20">
                      <div className="h-full w-full aspect-video rounded md:rounded-lg lg:rounded-xl">
                        <video
                          id="question-video"
                          onEnded={() => setVideoEnded(true)}
                          controls={false}
                          ref={vidRef}
                          playsInline
                          className="h-full object-cover w-full rounded-md md:rounded-[12px] aspect-video"
                          crossOrigin="anonymous"
                        >
                          <source
                            src={
                              currentVideoSrc
                                ? currentVideoSrc
                                : "/videos/RichardOther.mp4"
                            }
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </div>
                  )}
                  <Webcam
                    mirrored
                    audio
                    muted
                    ref={webcamRef}
                    videoConstraints={videoConstraints}
                    onUserMedia={handleUserMedia}
                    onUserMediaError={(error) => {
                      setRecordingPermission(false);
                    }}
                    className="absolute z-10 min-h-[100%] min-w-[100%] h-auto w-auto object-cover"
                  />
                </div>
                {loading && (
                  <div className="absolute flex h-full w-full items-center justify-center">
                    <div className="relative h-[112px] w-[112px] rounded-lg object-cover text-[2rem]">
                      <div className="flex h-[112px] w-[112px] items-center justify-center rounded-[0.5rem] bg-[#4171d8] !text-white">
                        Loading...
                      </div>
                    </div>
                  </div>
                )}

                {cameraLoaded && (
                  <div className="absolute bottom-0 left-0 z-50 flex h-[82px] w-full items-center justify-center">
                    {recordedChunks.length > 0 ? (
                      <>
                        {isSuccess ? (
                          <button
                            className="cursor-disabled group rounded-full min-w-[140px] px-4 py-2 text-[13px] font-semibold group inline-flex items-center justify-center text-sm text-white duration-150 bg-green-500 hover:bg-green-600 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-100 active:bg-green-800 active:text-green-100"
                            style={{
                              boxShadow:
                                "0px 1px 4px rgba(27, 71, 13, 0.17), inset 0px 0px 0px 1px #5fc767, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mx-auto"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <motion.path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5 }}
                              />
                            </svg>
                          </button>
                        ) : (
                          <div className="flex flex-row gap-2">
                            {!isSubmitting && (
                              <WhiteButton
                                onClick={() => restartVideo}
                                buttonText="Restart"
                              />
                            )}
                            <button
                              onClick={handleDownload}
                              disabled={isSubmitting}
                              className="group rounded-full min-w-[140px] px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex  active:scale-95 scale-100 duration-75  disabled:cursor-not-allowed"
                              style={{
                                boxShadow:
                                  "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                              }}
                            >
                              <span>
                                {isSubmitting ? (
                                  <div className="flex items-center justify-center gap-x-2">
                                    <LoadingSpinner />
                                    <span>{status}</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center gap-x-2">
                                    <span>Process transcript</span>
                                    <RightArrowWhiteSVG />
                                  </div>
                                )}
                              </span>
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="absolute bottom-[6px] md:bottom-5 left-5 right-5">
                        <div className="lg:mt-4 flex flex-col items-center justify-center gap-2">
                          {capturing ? (
                            <div
                              id="stopTimer"
                              onClick={handleStopCaptureClick}
                              className="flex h-10 w-10 flex-col items-center justify-center rounded-full bg-transparent text-white hover:shadow-xl ring-4 ring-white  active:scale-95 scale-100 duration-75 cursor-pointer"
                            >
                              <div className="h-5 w-5 rounded bg-red-500 cursor-pointer"></div>
                            </div>
                          ) : (
                            <button
                              id="startTimer"
                              onClick={handleStartCaptureClick}
                              className="flex h-8 w-8 sm:h-8 sm:w-8 flex-col items-center justify-center rounded-full bg-red-500 text-white hover:shadow-xl ring-4 ring-white ring-offset-gray-500 ring-offset-2 active:scale-95 scale-100 duration-75"
                            ></button>
                          )}
                          <div className="w-12"></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-5xl text-white font-semibold text-center"
                  id="countdown"
                ></div>
              </motion.div>
            </div>
          ) : (
            <div className="w-full flex flex-col max-w-[1080px] mx-auto justify-center">
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.35,
                  ease: [0.075, 0.82, 0.165, 1],
                }}
                className="relative md:aspect-[16/9] w-full max-w-[1080px] overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md flex flex-col items-center justify-center"
              >
                <p className="text-white font-medium text-lg text-center max-w-3xl">
                  Camera permission is denied. We don{`'`}t store your attempts
                  anywhere, but we understand not wanting to give us access to
                  your camera. Try again by opening this page in an incognito
                  window {`(`}or enable permissions in your browser settings
                  {`)`}.
                </p>
              </motion.div>
              <div className="flex flex-row space-x-4 mt-8 justify-end">
                <button
                  onClick={() => setStep(1)}
                  className="group max-w-[200px] rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
                  style={{
                    boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
                  }}
                >
                  Restart demo
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewSession;
