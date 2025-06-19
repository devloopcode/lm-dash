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
exports.PipelineStage = void 0;
const lead_entity_1 = require("../../lead/entity/lead.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const typeorm_1 = require("typeorm");
let PipelineStage = class PipelineStage {
    id;
    name;
    description;
    isDefault;
    isActive;
    isTemplate;
    templateCategory;
    isPrivate;
    createdBy;
    lead;
    createdAt;
    updatedAt;
};
exports.PipelineStage = PipelineStage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PipelineStage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PipelineStage.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PipelineStage.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], PipelineStage.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], PipelineStage.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PipelineStage.prototype, "isTemplate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PipelineStage.prototype, "templateCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PipelineStage.prototype, "isPrivate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true, nullable: false }),
    __metadata("design:type", user_entity_1.User)
], PipelineStage.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => lead_entity_1.Lead, lead => lead.pipelineStage),
    __metadata("design:type", lead_entity_1.Lead)
], PipelineStage.prototype, "lead", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PipelineStage.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PipelineStage.prototype, "updatedAt", void 0);
exports.PipelineStage = PipelineStage = __decorate([
    (0, typeorm_1.Entity)("pipelineStages")
], PipelineStage);
//# sourceMappingURL=pipeline-stage.entity.js.map