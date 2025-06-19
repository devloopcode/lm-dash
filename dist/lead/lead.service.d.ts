import { Lead } from './entity/lead.entity';
import { Repository } from 'typeorm';
import { ILead } from 'src/interfaces/lead';
import { LeadDto, UpdateLeadDto } from './dto/lead.dto';
import { User } from 'src/user/entity/user.entity';
import { PipelineStage } from 'src/pipelineStages/entity/pipeline-stage.entity';
import { Pipeline } from 'src/pipelines/entity/pipeline.entity';
import { Activity } from 'src/activities/entity/activity.entity';
import { ActivityDto } from './dto/activity.dto';
import { Request } from 'express';
export declare class LeadService {
    private readonly leadRepository;
    private readonly userRepository;
    private readonly piplineStageRepository;
    private readonly piplineRepository;
    private readonly activityRepository;
    constructor(leadRepository: Repository<Lead>, userRepository: Repository<User>, piplineStageRepository: Repository<PipelineStage>, piplineRepository: Repository<Pipeline>, activityRepository: Repository<Activity>);
    getAllLeads(id: number, page: number, limit: number, title: string): Promise<ILead>;
    getPipelinesService(): Promise<{
        pipelines: Pipeline[];
    }>;
    private searchLeadsService;
    createLeadService(req: Request, lead: LeadDto): Promise<{
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
            assignedTo: User;
            priority: string;
            fullName: string;
            email: string;
            phone: string;
            source: import("src/enums").LeadSource;
            sector: import("src/enums").LeadSector;
            propertyType: string;
            budget: number;
            financingStatus: import("src/enums").LeadFinancingStatus;
            requirement: string;
            notes: string;
            financing: string;
            pipelineStageId: number;
            pipelineId: number;
        } & Lead;
        activity: {
            lead: {
                id: number;
            };
            user: User;
            type: string;
            content: string;
        } & Activity;
    }>;
    getLeadActivitiesService(id: string): Promise<{
        data: Activity[];
    }>;
    getOneLeadService(id: string): Promise<Lead>;
    getLeadsByAssigneeService(req: Request, page: number, limit: number): Promise<{
        data: Lead[];
        total: number;
        page: number;
        limit: number;
        pageCount: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    moveToStageMutationService(id: string, stageId: string): Promise<{
        message: string;
    }>;
    postLeadActivitiesService(req: Request, { type, content }: ActivityDto, id: string): Promise<{
        lead: Lead;
        user: User;
        type: string;
        content: string;
    } & Activity>;
    getLeadsByStageService(req: Request, view: string, id: string, page: number, limit: number): Promise<{
        data: Lead[];
    }>;
    updateLeadService(leadData: UpdateLeadDto, id: string): Promise<import("typeorm").UpdateResult>;
    updateLeadNoteService(id: string, note: string): Promise<import("typeorm").UpdateResult>;
    deleteLeadService(leadId: string): Promise<boolean>;
}
