import { Module } from '@nestjs/common';
import { Resend } from 'resend';
import { ResendService } from './resend.service';

@Module({
  providers: [
    {
      provide: 'RESEND_INSTANCE',
      useFactory: () => {
        return new Resend(process.env.RESEND_API_KEY);
      },
    },
    ResendService,
  ],
  exports: [ResendService],
})
export class ResendModule {}
