import { Controller, Get, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }


    @Post('send')
    async sendEmail() {
        await this.emailService.sendMail({
            from: 'oussama@cora-tech.net',
            to: 'mohamed@cora-tech.net',
            subject: "Forgot Password",
            html: `
                <h3>Hello test!</h3>
                <p>Email send.</p>
                
            `,
        });
    }




}
