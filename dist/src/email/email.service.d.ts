import * as Mail from 'nodemailer/lib/mailer';
export declare class EmailService {
    private nodemailerTransport;
    constructor();
    sendMail(options: Mail.Options): any;
}
