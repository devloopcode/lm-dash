import { User } from "src/user/entity/user.entity";
import { PipelineStage } from "src/pipelineStages/entity/pipeline-stage.entity";
import { Pipeline } from "src/pipelines/entity/pipeline.entity";
import { Activity } from "src/activities/entity/activity.entity";
export declare class Lead {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    stage: string;
    score: number;
    sector: string;
    status: string;
    propertyType: string;
    requirement: string;
    budget: number;
    financingStatus: string;
    financing: string;
    source: string;
    note: string;
    lastActivity: Date;
    lastContacted: Date;
    createdAt: Date;
    updatedAt: Date;
    priority: string;
    aiScore: number;
    engagementScore: number;
    behaviorScore: number;
    demographicScore: number;
    lastScoredAt: Date;
    scoringInsights: string;
    assignedTo: User;
    pipelineStage: PipelineStage;
    pipeline: Pipeline;
    activities: Activity[];
}
