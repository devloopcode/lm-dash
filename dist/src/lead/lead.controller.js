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
exports.LeadController = void 0;
const common_1 = require("@nestjs/common");
const lead_service_1 = require("./lead.service");
const pagination_lead_dto_1 = require("./dto/pagination.lead.dto");
const lead_dto_1 = require("./dto/lead.dto");
const activity_dto_1 = require("./dto/activity.dto");
const auth_guard_1 = require("../auth/auth.guard");
let LeadController = class LeadController {
    leadService;
    constructor(leadService) {
        this.leadService = leadService;
    }
    async getAll({ page = 1, limit = 10, stage, title }) {
        return this.leadService.getAllLeads(stage, +page, +limit, title);
    }
    async create(req, leadData) {
        return await this.leadService.createLeadService(req, leadData);
    }
    async getLeadsByAssignee(req, { page = 1, limit = 10 }) {
        return await this.leadService.getLeadsByAssigneeService(req, page, limit);
    }
    async getPipelines({ page = 1, limit = 10 }) {
        return await this.leadService.getPipelinesService();
    }
    async moveToStage({ id, stageId }) {
        return await this.leadService.moveToStageMutationService(id, stageId);
    }
    async postLeadActivities(req, data, id) {
        return await this.leadService.postLeadActivitiesService(req, data, id);
    }
    async getLeadsByStage(req, { id, view }, { page = 1, limit = 10 }) {
        return await this.leadService.getLeadsByStageService(req, view, id, page, limit);
    }
    async getLeadActivities(id) {
        return await this.leadService.getLeadActivitiesService(id);
    }
    async get(id) {
        return await this.leadService.getOneLeadService(id);
    }
    async update(leadData, id) {
        return await this.leadService.updateLeadService(leadData, id);
    }
    async updateLeadNote({ note }, id) {
        return await this.leadService.updateLeadNoteService(id, note);
    }
    async deleteLead(leadId) {
        return await this.leadService.deleteLeadService(leadId);
    }
};
exports.LeadController = LeadController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_lead_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], LeadController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)("/new"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lead_dto_1.LeadDto]),
    __metadata("design:returntype", Promise)
], LeadController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("/assigne"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_lead_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], LeadController.prototype, "getLeadsByAssignee", null);
__decorate([
    (0, common_1.Get)('pipelines'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_lead_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], LeadController.prototype, "getPipelines", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)("/:id/move-to-stage/:stageId"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeadController.prototype, "moveToStage", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)("/:id/activities"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, activity_dto_1.ActivityDto, String]),
    __metadata("design:returntype", Promise)
], LeadController.prototype, "postLeadActivities", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("/stage/:id/:view"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, pagination_lead_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], LeadController.prototype, "getLeadsByStage", null);
__decorate([
    (0, common_1.Get)("/:id/activities"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LeadController.prototype, "getLeadActivities", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LeadController.prototype, "get", null);
__decorate([
    (0, common_1.Put)("/:id"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lead_dto_1.UpdateLeadDto, String]),
    __metadata("design:returntype", Promise)
], LeadController.prototype, "update", null);
__decorate([
    (0, common_1.Put)("note/:id"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lead_dto_1.UpdateLeadNoteDto, String]),
    __metadata("design:returntype", Promise)
], LeadController.prototype, "updateLeadNote", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LeadController.prototype, "deleteLead", null);
exports.LeadController = LeadController = __decorate([
    (0, common_1.Controller)('leads'),
    __metadata("design:paramtypes", [lead_service_1.LeadService])
], LeadController);
//# sourceMappingURL=lead.controller.js.map