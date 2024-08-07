import twilio from "twilio";

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (
  typeof twilioAccountSid !== "string" ||
  typeof twilioAuthToken !== "string" ||
  typeof twilioPhoneNumber !== "string"
) {
  throw new Error("Twilio credentials are not defined.");
}

const client = twilio(twilioAccountSid, twilioAuthToken);

export async function sendSmsVerificationCode(
  phoneNumber: string,
  code: string
) {
  try {
    await client.messages.create({
      body: `Your AIIA verification code is: ${code}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });
  } catch (error) {
    throw new Error("sms code verification failed");
  }
}
