import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import * as path from "path";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: `smtp://${process.env.MAILER_USER}:${process.env.MAILER_PASSWORD}@${process.env.MAILER_SMTP}`,
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: path.join(__dirname, "..", "..", "/templates"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class CoreModule {}
