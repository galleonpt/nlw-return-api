import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "caf23b8315c776",
    pass: "5c39430e42ab96"
  }
});

export class NodemailerMailAdapter implements MailAdapter{
	async sendMail(data: SendMailData) {
	await transport.sendMail({
		from: " Feedget team <hi@feedget.com>",
		to:"danadotolinho@gmail.com",
		subject: data.subject,
		html: data.body
	})
	}
}