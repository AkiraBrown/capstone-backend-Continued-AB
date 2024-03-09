const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "",
  port: 587,
  secure: false,
  auth: {
    user: "Replace with the automated email address",
    pass: "replace with the password for you automated email address",
  },
});

async function main() {
  //To get this up and running correctly set up a proton mail and use it to test out sending emails on nodemailer
  // https://proton.me/support/auto-reply
  // proton emails have an stmp support
  const info = await transporter.sendMail({
    from: '"Giftune 🎁" <giftuneApp.email>',
    to: "Use a ternary that takes the signed up user's email address here",
    subject: "Verify your email address",
    text: "Provide a unique link that utilises UUID(crypto.randomUUID())  or some other unique code system",
    html: "<p>Wagwarn famalam</p>",
  });
  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
