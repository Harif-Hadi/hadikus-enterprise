import { createTransport } from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { to, subject, text } = req.body;

    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: "hadi4harif@gmail.com",
        pass: "occq yniy tmxv rrry",
      },
    });

    try {
      await transporter.sendMail({
        from: `Hadikus Enterprise : "hadi4harif@gmail.com"`,
        to,
        subject,
        text,
      });

      res.status(200).json({ message: "Success" });
    } catch (error) {
      res.status(500).json({ error: "Failed" + error });
    }
  }
}
