import { IsEmail, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { } from 'class-transformer';
import { LeadFinancingStatus, LeadPriority, LeadSector, LeadSource, LeadStatus } from 'src/enums';
import { Lead } from '../entity/lead.entity';
import { PartialType } from '@nestjs/mapped-types';



export class LeadDto {
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsOptional()
    @IsEnum(LeadStatus)
    status: string;

    @IsOptional()
    @IsEnum(LeadPriority)
    priority: string;

    @IsEnum(LeadSource)
    source: LeadSource;

    @IsEnum(LeadSector)
    sector: LeadSector;

    @IsString()
    propertyType: string;

    @IsNumber()
    budget: number;

    @IsString()
    @IsEnum(LeadFinancingStatus)
    financingStatus: LeadFinancingStatus;

    @IsOptional()
    @IsString()
    requirement: string;

    @IsOptional()
    @IsString()
    notes: string;

    @IsOptional()
    @IsString()
    financing: string;

    // @IsNumber()
    // assignedTo: number;

    @IsNumber()
    pipelineStageId: number;

    @IsNumber()
    pipelineId: number;
}

export class UpdateLeadNoteDto {
    @IsString()
    note: string;
}



export class UpdateLeadDto {
    @IsString()
    fullName: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    @IsEnum(LeadSource)
    source: LeadSource;

    @IsOptional()
    @IsEnum(LeadSector)
    sector: string;

    @IsOptional()
    propertyType: string;

    @IsOptional()
    @IsNumber()
    budget: number;

    @IsOptional()
    @IsEnum(LeadFinancingStatus)
    financingStatus: string;

    @IsOptional()
    requirement: string;

    @IsOptional()
    notes: string;

    @IsNumber()
    pipelineStageId: number;

    @IsNumber()
    pipelineId: number;
}