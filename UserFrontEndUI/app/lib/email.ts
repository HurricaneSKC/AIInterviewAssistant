import sgMail from "@sendgrid/mail";

const sendgridApiKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.SENDER_EMAIL;
const baseURL = process.env.NEXT_PUBLIC_URL;

if (typeof sendgridApiKey !== "string") {
  throw new Error("SENDGRID_API_KEY is not defined or not a string");
}

sgMail.setApiKey(sendgridApiKey);

export async function sendResetPasswordEmail(email: string, token: string) {
  if (typeof senderEmail !== "string") {
    throw new Error("senderEmail is not defined");
  }

  if (typeof baseURL !== "string") {
    throw new Error("baseURL is not defined");
  }
  const msg = {
    to: email,
    from: senderEmail,
    subject: "Reset Your Password",
    text: `Click this link to reset your password: ${baseURL}/reset-password?token=${token}`,
    html: `<p>Click <a href="${baseURL}/reset-password?token=${token}">here</a> to reset your password.</p>`,
  };

  await sgMail.send(msg);
}
