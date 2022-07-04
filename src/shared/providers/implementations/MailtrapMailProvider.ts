import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

export class MailtrapMailProvider implements IMailProvider{

    private transporter:Mail;

    constructor(){
        this.transporter = nodemailer.createTransport({
            host:"smtp.mailtrap.io",
            port:2525,
            auth:{
                user: "e82ecae6e2c204",
                pass: "9f68c874777e1e"
            }
        })
    }

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to:{
                name:message.to.name,
                address:message.to.email
            },
            from:{
                name:message.from.name,
                address:message.from.email
            },
            subject:message.subject,
            html: message.body
        });
    }

}