import { LeadFinancingStatus, LeadSector, LeadSource } from 'src/enums';
export declare class LeadDto {
    fullName: string;
    email: string;
    phone: string;
    status: string;
    priority: string;
    source: LeadSource;
    sector: LeadSector;
    propertyType: string;
    budget: number;
    financingStatus: LeadFinancingStatus;
    requirement: string;
    notes: string;
    financing: string;
    pipelineStageId: number;
    pipelineId: number;
}
export declare class UpdateLeadNoteDto {
    note: string;
}
export declare class UpdateLeadDto {
    fullName: string;
    email: string;
    phone: string;
    source: LeadSource;
    sector: string;
    propertyType: string;
    budget: number;
    financingStatus: string;
    requirement: string;
    notes: string;
    pipelineStageId: number;
    pipelineId: number;
}
