import {
  createTestAccount,
  createTransport,
  Transporter,
  getTestMessageUrl,
} from 'nodemailer';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';

export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    createTestAccount().then(account => {
      const transporter = createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: '"Equipe GoBarber 👻" <equipe@gobarber.com.br>', // sender address
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', getTestMessageUrl(message));
  }
}
