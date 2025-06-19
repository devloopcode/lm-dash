"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadService = void 0;
const common_1 = require("@nestjs/common");
const lead_entity_1 = require("./entity/lead.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entity/user.entity");
const pipeline_stage_entity_1 = require("../pipelineStages/entity/pipeline-stage.entity");
const pipeline_entity_1 = require("../pipelines/entity/pipeline.entity");
const enums_1 = require("../enums");
const activity_entity_1 = require("../activities/entity/activity.entity");
let LeadService = class LeadService {
    leadRepository;
    userRepository;
    piplineStageRepository;
    piplineRepository;
    activityRepository;
    constructor(leadRepository, userRepository, piplineStageRepository, piplineRepository, activityRepository) {
        this.leadRepository = leadRepository;
        this.userRepository = userRepository;
        this.piplineStageRepository = piplineStageRepository;
        this.piplineRepository = piplineRepository;
        this.activityRepository = activityRepository;
    }
    async getAllLeads(id, page, limit, title) {
        const conditions = [];
        if (title) {
            conditions.push({ fullName: (0, typeorm_2.ILike)(`%${title}%`) }, { email: (0, typeorm_2.ILike)(`%${title}%`) }, { requirement: (0, typeorm_2.ILike)(`%${title}%`) });
        }
        if (id) {
            if (conditions.length > 0) {
                for (let i = 0; i < conditions.length; i++) {
                    conditions[i] = {
                        ...conditions[i],
                        pipelineStage: { id: Number(id) },
                    };
                }
            }
            else {
                conditions.push({
                    pipelineStage: { id: Number(id) },
                });
            }
        }
        const where = conditions.length > 0 ? conditions : {};
        const [data, total] = await this.leadRepository.findAndCount({
            skip: (Number(page || 1) - 1) * Number(limit || 10),
            take: Number(limit || 10),
            relations: ['assignedTo', 'pipelineStage', 'pipeline', 'activities'],
            where,
        });
        const pageCount = Math.ceil(total / limit);
        return {
            data,
            total,
            page,
            limit,
            pageCount,
            hasNext: page < pageCount,
            hasPrev: page > 1
        };
    }
    async getPipelinesService() {
        try {
            const pipelines = await this.piplineRepository.find({});
            return { pipelines };
        }
        catch (error) {
            console.log("🚀 ~ lead.service.ts:58 ~ LeadService ~ getPipelinesService ~ error:", error);
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async searchLeadsService(title, page, limit) {
        try {
            const [data, total] = await this.leadRepository.findAndCount({
                skip: (page - 1) * limit,
                take: Number(limit),
                relations: ['assignedTo', 'pipelineStage', 'pipeline', 'activities'],
                where: [
                    { fullName: (0, typeorm_2.ILike)(`%${title}%`) },
                    { email: (0, typeorm_2.ILike)(`%${title}%`) },
                    { requirement: (0, typeorm_2.ILike)(`%${title}%`) },
                ],
            });
            const pageCount = Math.ceil(total / limit);
            return {
                data,
                total,
                page,
                limit,
                pageCount,
                hasNext: page < pageCount,
                hasPrev: page > 1
            };
        }
        catch (error) {
            console.log("🚀 ~ lead.service.ts:76 ~ LeadService ~ searchLeadsService ~ error:", error);
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async createLeadService(req, lead) {
        try {
            const pipelineStage = await this.piplineStageRepository.findOneBy({ id: lead.pipelineStageId || 1 });
            const pipeline = await this.piplineRepository.findOneBy({ id: lead.pipelineId || 1 });
            if (!pipelineStage)
                throw new common_1.BadRequestException('The pipeline stage is required');
            if (!pipeline)
                throw new common_1.BadRequestException('The pipeline is required');
            const authUser = req['user'];
            const user = await this.userRepository.findOneBy({ email: authUser?.email });
            if (!user)
                throw new common_1.BadRequestException('The user is required');
            const newLead = await this.leadRepository.save({
                ...lead,
                pipelineStage: {
                    id: pipelineStage.id
                },
                pipeline: {
                    id: pipeline?.id
                },
                stage: "New Lead",
                status: lead.status || "Active",
                lastScoredAt: new Date(),
                scoringInsights: "New lead, not yet scored.",
                assignedTo: user,
                priority: lead.priority || enums_1.LeadPriority.MEDIUM,
            });
            const activity = await this.activityRepository.save({
                lead: {
                    id: newLead.id
                },
                user: user,
                type: "note",
                content: `Lead created with status: ${newLead.status}`
            });
            return { newLead, activity };
        }
        catch (error) {
            console.log("🚀 ~ lead.service.ts:52 ~ LeadService ~ createLeadService ~ error:", error);
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async getLeadActivitiesService(id) {
        try {
            const leadId = Number(id);
            const activities = await this.activityRepository.find({
                where: {
                    lead: {
                        id: leadId
                    }
                }
            });
            return { data: activities };
        }
        catch (error) {
            console.log("🚀 ~ lead.service.ts:108 ~ LeadService ~ getLeadActivitiesService ~ error:", error);
            throw new common_1.HttpException(error, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getOneLeadService(id) {
        try {
            const leadId = Number(id);
            const lead = await this.leadRepository.findOne({
                relations: ['assignedTo', 'pipelineStage', 'pipeline', 'activities'],
                where: {
                    id: leadId,
                    activities: {
                        lead: {
                            id: leadId
                        }
                    },
                    pipelineStage: {
                        lead: {
                            id: leadId
                        }
                    }
                }
            });
            if (!lead)
                throw new common_1.HttpException('Lead not found', common_1.HttpStatus.NOT_FOUND);
            return lead;
        }
        catch (error) {
            console.log("🚀 ~ lead.service.ts:82 ~ LeadService ~ getOneLeadService ~ error:", error);
            throw new common_1.HttpException(error, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getLeadsByAssigneeService(req, page, limit) {
        try {
            const user = req['user'];
            const [data, total] = await this.leadRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                relations: ['assignedTo', 'pipelineStage', 'pipeline', 'activities'],
                where: {
                    assignedTo: {
                        id: user.sub
                    }
                }
            });
            if (data.length === 0)
                throw new common_1.HttpException('Lead not found', common_1.HttpStatus.NOT_FOUND);
            const pageCount = Math.ceil(total / limit);
            return {
                data,
                total,
                page,
                limit,
                pageCount,
                hasNext: page < pageCount,
                hasPrev: page > 1
            };
        }
        catch (error) {
            console.log("🚀 ~ lead.service.ts:82 ~ LeadService ~ getOneLeadService ~ error:", error);
            throw new common_1.HttpException(error, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async moveToStageMutationService(id, stageId) {
        try {
            const lead = await this.leadRepository.findOneBy({ id: Number(id) });
            if (!lead)
                throw new common_1.HttpException('Lead not found', common_1.HttpStatus.NOT_FOUND);
            const stage = await this.piplineStageRepository.findOneBy({ id: Number(stageId) });
            if (!stage)
                throw new common_1.HttpException('Pipeline stage not found', common_1.HttpStatus.NOT_FOUND);
            await this.leadRepository.update(lead.id, {
                pipelineStage: { id: Number(stageId) },
                stage: stage.name
            });
            return { message: 'Pipeline stage updated successfully' };
        }
        catch (error) {
            console.log("🚀 ~ lead.service.ts:280 ~ LeadService ~ moveToStageMutationService ~ error:", error);
            throw new common_1.HttpException(error, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async postLeadActivitiesService(req, { type, content }, id) {
        try {
            const authUser = req['user'];
            const user = await this.userRepository.findOneBy({ email: authUser?.email });
            if (!user)
                throw new common_1.BadRequestException('The user is required');
            const leadId = Number(id);
            const lead = await this.leadRepository.findOneBy({ id: leadId });
            if (!lead)
                throw new common_1.HttpException('Lead not found', common_1.HttpStatus.NOT_FOUND);
            const activity = await this.activityRepository.save({
                lead,
                user: user,
                type: type || "note",
                content: content
            });
            lead.lastContacted = new Date();
            await this.leadRepository.save(lead);
            return activity;
        }
        catch (error) {
            console.log("🚀 ~ lead.service.ts:200 ~ LeadService ~ postLeadActivitiesService ~ error:", error);
            throw new common_1.HttpException(error, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getLeadsByStageService(req, view, id, page, limit) {
        try {
            const user = req['user'];
            const [data, total] = await this.leadRepository.findAndCount({
                relations: ['assignedTo', 'pipelineStage', 'pipeline', 'activities'],
                where: {
                    ...(view === 'mine' && user?.sub && {
                        assignedTo: { id: user.sub },
                    }),
                    pipelineStage: {
                        id: Number(id),
                    },
                },
            });
            return {
                data,
            };
        }
        catch (error) {
            console.log("🚀 ~ lead.service.ts:82 ~ LeadService ~ getOneLeadService ~ error:", error);
            throw new common_1.HttpException(error, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateLeadService(leadData, id) {
        try {
            const leadId = Number(id);
            const updateLead = await this.leadRepository.findOneBy({ id: leadId });
            if (!updateLead)
                throw new common_1.HttpException('Lead not found', common_1.HttpStatus.NOT_FOUND);
            if (leadData.pipelineStageId && leadData.pipelineStageId !== updateLead.pipelineStage.id) {
                const oldStage = await this.piplineStageRepository.findOne({
                    where: {
                        lead: {
                            pipelineStage: {
                                id: leadId
                            }
                        }
                    }
                });
                const newStage = await this.piplineStageRepository.findOne({
                    where: {
                        lead: {
                            id: leadData.pipelineStageId
                        }
                    }
                });
                await this.activityRepository.save({
                    lead: {
                        id: updateLead.id
                    },
                    type: "stage-change",
                    content: `Lead moved from ${oldStage?.name} to ${newStage?.name}`,
                });
            }
            const updated_lead = await this.leadRepository.update(id, leadData);
            return updated_lead;
        }
        catch (error) {
            console.log("🚀 ~ lead.service.ts:93 ~ LeadService ~ updateLeadService ~ error:", error);
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateLeadNoteService(id, note) {
        try {
            const leadId = Number(id);
            const updateLeadNote = await this.leadRepository.findOneBy({ id: leadId });
            if (!updateLeadNote)
                throw new common_1.HttpException('Lead not found', common_1.HttpStatus.NOT_FOUND);
            const updatedLeadNote = await this.leadRepository.update(id, {
                note
            });
            return updatedLeadNote;
        }
        catch (error) {
            console.log("🚀 ~ lead.service.ts:358 ~ LeadService ~ updateLeadNoteService ~ error:", error);
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteLeadService(leadId) {
        try {
            const id = Number(leadId);
            const leadToBeDeleted = await this.leadRepository.findOneBy({ id });
            if (!leadToBeDeleted)
                throw new common_1.HttpException('Lead not found', common_1.HttpStatus.NOT_FOUND);
            const confirmation = await this.leadRepository.delete(leadToBeDeleted.id);
            if (confirmation.affected) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.log("🚀 ~ lead.service.ts:117 ~ LeadService ~ deleteLeadService ~ error:", error);
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.LeadService = LeadService;
exports.LeadService = LeadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lead_entity_1.Lead)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(pipeline_stage_entity_1.PipelineStage)),
    __param(3, (0, typeorm_1.InjectRepository)(pipeline_entity_1.Pipeline)),
    __param(4, (0, typeorm_1.InjectRepository)(activity_entity_1.Activity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LeadService);
//# sourceMappingURL=lead.service.js.map