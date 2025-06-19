import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { LeadService } from './lead.service';
import { PaginationDto, SearchLeadsDto } from './dto/pagination.lead.dto';
import { LeadDto, UpdateLeadDto, UpdateLeadNoteDto } from './dto/lead.dto';
import { ActivityDto } from './dto/activity.dto';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';
import { Request } from 'express';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/v1/leads')
export class LeadController {

    constructor(
        private readonly leadService: LeadService
    ) { }


    @Get()
    async getAll(@Query() { page = 1, limit = 10, stage, title }: PaginationDto) {
        return this.leadService.getAllLeads(stage, +page, +limit, title);
    }

    @UseGuards(AuthGuard)
    @Post("/new")
    async create(@Req() req: Request, @Body() leadData: LeadDto) {
        return await this.leadService.createLeadService(req, leadData);
    }

    @UseGuards(AuthGuard)
    @Get("/assigne")
    async getLeadsByAssignee(@Req() req: Request, @Query() { page = 1, limit = 10 }: PaginationDto) {
        return await this.leadService.getLeadsByAssigneeService(req, page, limit);
    }

    // pipelines
    @Get('pipelines')
    async getPipelines(@Query() { page = 1, limit = 10 }: PaginationDto) {
        // return this.leadService.getPipelinesService(+page, +limit);
        return await this.leadService.getPipelinesService();
    }


    @UseGuards(AuthGuard)
    @Post("/:id/move-to-stage/:stageId")
    async moveToStage(@Param() { id, stageId }: { id: string, stageId: string; }) {
        return await this.leadService.moveToStageMutationService(id, stageId);
    }

    @UseGuards(AuthGuard)
    @Post("/:id/activities")
    async postLeadActivities(@Req() req: Request, @Body() data: ActivityDto, @Param('id') id: string) {
        return await this.leadService.postLeadActivitiesService(req, data, id);
    }

    @UseGuards(AuthGuard)
    @Get("/stage/:id/:view")
    // async getLeadsByStage(@Param('id') id: string, @Query() { page = 1, limit = 10 }: PaginationDto) {
    async getLeadsByStage(@Req() req: Request, @Param() { id, view }: { id: string, view: string; }, @Query() { page = 1, limit = 10 }: PaginationDto) {
        return await this.leadService.getLeadsByStageService(req, view, id, page, limit);
    }


    @Get("/:id/activities")
    async getLeadActivities(@Param('id') id: string) {
        return await this.leadService.getLeadActivitiesService(id);
    }

    @Get("/:id")
    async get(@Param('id') id: string) {
        return await this.leadService.getOneLeadService(id);
    }

    @Put("/:id")
    async update(@Body() leadData: UpdateLeadDto, @Param('id') id: string) {
        return await this.leadService.updateLeadService(leadData, id);
    }

    @Put("note/:id")
    async updateLeadNote(@Body() { note }: UpdateLeadNoteDto, @Param('id') id: string) {
        return await this.leadService.updateLeadNoteService(id, note);
    }

    @Delete("/:id")
    async deleteLead(@Param('id') leadId: string) {
        return await this.leadService.deleteLeadService(leadId);
    }
}
