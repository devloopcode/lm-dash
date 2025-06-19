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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lead = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entity/user.entity");
const enums_1 = require("../../enums");
const pipeline_stage_entity_1 = require("../../pipelineStages/entity/pipeline-stage.entity");
const pipeline_entity_1 = require("../../pipelines/entity/pipeline.entity");
const activity_entity_1 = require("../../activities/entity/activity.entity");
let Lead = class Lead {
    id;
    fullName;
    email;
    phone;
    stage;
    score;
    sector;
    status;
    propertyType;
    requirement;
    budget;
    financingStatus;
    financing;
    source;
    note;
    lastActivity;
    lastContacted;
    createdAt;
    updatedAt;
    priority;
    aiScore;
    engagementScore;
    behaviorScore;
    demographicScore;
    lastScoredAt;
    scoringInsights;
    assignedTo;
    pipelineStage;
    pipeline;
    activities;
};
exports.Lead = Lead;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Lead.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Lead.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Lead.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Lead.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Lead.prototype, "stage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "float", default: 0 }),
    __metadata("design:type", Number)
], Lead.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enums_1.LeadSector,
        default: enums_1.LeadSector.COMMERCIAL_RENT,
    }),
    __metadata("design:type", String)
], Lead.prototype, "sector", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enums_1.LeadStatus,
        default: enums_1.LeadStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Lead.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Lead.prototype, "propertyType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Lead.prototype, "requirement", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        precision: 15,
        scale: 2,
        default: () => "0",
        transformer: {
            to: (value) => value,
            from: (value) => value === null ? null : parseFloat(value),
        },
        nullable: true,
    }),
    __metadata("design:type", Number)
], Lead.prototype, "budget", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enums_1.LeadFinancingStatus,
        default: enums_1.LeadFinancingStatus.CASH_BUYER,
    }),
    __metadata("design:type", String)
], Lead.prototype, "financingStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Lead.prototype, "financing", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Lead.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Lead.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz", nullable: true }),
    __metadata("design:type", Date)
], Lead.prototype, "lastActivity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz", nullable: true }),
    __metadata("design:type", Date)
], Lead.prototype, "lastContacted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], Lead.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], Lead.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enums_1.LeadPriority,
        default: enums_1.LeadPriority.MEDIUM,
    }),
    __metadata("design:type", String)
], Lead.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "float", default: 0 }),
    __metadata("design:type", Number)
], Lead.prototype, "aiScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "float", default: 0 }),
    __metadata("design:type", Number)
], Lead.prototype, "engagementScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "float", default: 0 }),
    __metadata("design:type", Number)
], Lead.prototype, "behaviorScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "float", default: 0 }),
    __metadata("design:type", Number)
], Lead.prototype, "demographicScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz", nullable: true }),
    __metadata("design:type", Date)
], Lead.prototype, "lastScoredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Lead.prototype, "scoringInsights", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.leads, {
        nullable: true,
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "assigned_to" }),
    __metadata("design:type", user_entity_1.User)
], Lead.prototype, "assignedTo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pipeline_stage_entity_1.PipelineStage, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", pipeline_stage_entity_1.PipelineStage)
], Lead.prototype, "pipelineStage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pipeline_entity_1.Pipeline, { cascade: true, }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", pipeline_entity_1.Pipeline)
], Lead.prototype, "pipeline", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activity_entity_1.Activity, (activity) => activity.lead),
    (0, typeorm_1.JoinColumn)({ name: "activity" }),
    __metadata("design:type", Array)
], Lead.prototype, "activities", void 0);
exports.Lead = Lead = __decorate([
    (0, typeorm_1.Entity)("leads")
], Lead);
//# sourceMappingURL=lead.entity.js.map