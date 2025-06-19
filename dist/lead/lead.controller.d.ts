import { LeadService } from './lead.service';
import { PaginationDto } from './dto/pagination.lead.dto';
import { LeadDto, UpdateLeadDto, UpdateLeadNoteDto } from './dto/lead.dto';
import { ActivityDto } from './dto/activity.dto';
import { Request } from 'express';
export declare class LeadController {
    private readonly leadService;
    constructor(leadService: LeadService);
    getAll({ page, limit, stage, title }: PaginationDto): Promise<import("../interfaces/lead").ILead>;
    create(req: Request, leadData: LeadDto): Promise<{
        newLead: {
            pipelineStage: {
                id: number;
            };
            pipeline: {
                id: number;
            };
            stage: string;
            status: string;
            lastScoredAt: Date;
            scoringInsights: string;
            assignedTo: import("../user/entity/user.entity").User;
            priority: string;
            fullName: string;
            email: string;
            phone: string;
            source: import("../enums").LeadSource;
            sector: import("../enums").LeadSector;
            propertyType: string;
            budget: number;
            financingStatus: import("../enums").LeadFinancingStatus;
            requirement: string;
            notes: string;
            financing: string;
            pipelineStageId: number;
            pipelineId: number;
        } & import("./entity/lead.entity").Lead;
        activity: {
            lead: {
                id: number;
            };
            user: import("../user/entity/user.entity").User;
            type: string;
            content: string;
        } & import("../activities/entity/activity.entity").Activity;
    }>;
    getLeadsByAssignee(req: Request, { page, limit }: PaginationDto): Promise<{
        data: import("./entity/lead.entity").Lead[];
        total: number;
        page: number;
        limit: number;
        pageCount: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    getPipelines({ page, limit }: PaginationDto): Promise<{
        pipelines: import("../pipelines/entity/pipeline.entity").Pipeline[];
    }>;
    moveToStage({ id, stageId }: {
        id: string;
        stageId: string;
    }): Promise<{
        message: string;
    }>;
    postLeadActivities(req: Request, data: ActivityDto, id: string): Promise<{
        lead: import("./entity/lead.entity").Lead;
        user: import("../user/entity/user.entity").User;
        type: string;
        content: string;
    } & import("../activities/entity/activity.entity").Activity>;
    getLeadsByStage(req: Request, { id, view }: {
        id: string;
        view: string;
    }, { page, limit }: PaginationDto): Promise<{
        data: import("./entity/lead.entity").Lead[];
    }>;
    getLeadActivities(id: string): Promise<{
        data: import("../activities/entity/activity.entity").Activity[];
    }>;
    get(id: string): Promise<import("./entity/lead.entity").Lead>;
    update(leadData: UpdateLeadDto, id: string): Promise<import("typeorm").UpdateResult>;
    updateLeadNote({ note }: UpdateLeadNoteDto, id: string): Promise<import("typeorm").UpdateResult>;
    deleteLead(leadId: string): Promise<boolean>;
}
