import { Activity } from "src/activities/entity/activity.entity";
import { Lead } from "src/lead/entity/lead.entity";
import { PipelineStage } from "src/pipelineStages/entity/pipeline-stage.entity";
export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    name: string;
    position: string;
    avatarUrl: string;
    leads: Lead[];
    createdStages: PipelineStage[];
    activities: Activity[];
    refreshToken: string | null;
}
