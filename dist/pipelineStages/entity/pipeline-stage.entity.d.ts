import { Lead } from "src/lead/entity/lead.entity";
import { User } from "src/user/entity/user.entity";
export declare class PipelineStage {
    id: number;
    name: string;
    description: string;
    isDefault: boolean;
    isActive: boolean;
    isTemplate: boolean;
    templateCategory: string;
    isPrivate: boolean;
    createdBy: User;
    lead: Lead;
    createdAt: Date;
    updatedAt: Date;
}
