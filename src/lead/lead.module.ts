import { Module } from '@nestjs/common';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './entity/lead.entity';
import { User } from 'src/user/entity/user.entity';
import { PipelineStage } from 'src/pipelineStages/entity/pipeline-stage.entity';
import { Pipeline } from 'src/pipelines/entity/pipeline.entity';
import { Activity } from 'src/activities/entity/activity.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Lead, User, PipelineStage, Pipeline, Activity])],
  providers: [LeadService, AuthGuard],
  controllers: [LeadController],
  exports: [LeadService],
})
export class LeadModule { }
