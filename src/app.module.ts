import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadController } from './lead/lead.controller';
import { LeadService } from './lead/lead.service';
import { LeadModule } from './lead/lead.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { Lead } from './lead/entity/lead.entity';
import { AuthModule } from './auth/auth.module';
import { PipelineStage } from './pipelineStages/entity/pipeline-stage.entity';
import { Pipeline } from './pipelines/entity/pipeline.entity';
import { Activity } from './activities/entity/activity.entity';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Lead, User, PipelineStage, Pipeline, Activity]),
    LeadModule,
    AuthModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule { }
