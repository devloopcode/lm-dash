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
exports.UpdateLeadDto = exports.UpdateLeadNoteDto = exports.LeadDto = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../../enums");
class LeadDto {
    fullName;
    email;
    phone;
    status;
    priority;
    source;
    sector;
    propertyType;
    budget;
    financingStatus;
    requirement;
    notes;
    financing;
    pipelineStageId;
    pipelineId;
}
exports.LeadDto = LeadDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LeadDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LeadDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LeadDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.LeadStatus),
    __metadata("design:type", String)
], LeadDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.LeadPriority),
    __metadata("design:type", String)
], LeadDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.LeadSource),
    __metadata("design:type", String)
], LeadDto.prototype, "source", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.LeadSector),
    __metadata("design:type", String)
], LeadDto.prototype, "sector", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LeadDto.prototype, "propertyType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LeadDto.prototype, "budget", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(enums_1.LeadFinancingStatus),
    __metadata("design:type", String)
], LeadDto.prototype, "financingStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LeadDto.prototype, "requirement", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LeadDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LeadDto.prototype, "financing", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LeadDto.prototype, "pipelineStageId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LeadDto.prototype, "pipelineId", void 0);
class UpdateLeadNoteDto {
    note;
}
exports.UpdateLeadNoteDto = UpdateLeadNoteDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLeadNoteDto.prototype, "note", void 0);
class UpdateLeadDto {
    fullName;
    email;
    phone;
    source;
    sector;
    propertyType;
    budget;
    financingStatus;
    requirement;
    notes;
    pipelineStageId;
    pipelineId;
}
exports.UpdateLeadDto = UpdateLeadDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.LeadSource),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "source", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.LeadSector),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "sector", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "propertyType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateLeadDto.prototype, "budget", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.LeadFinancingStatus),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "financingStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "requirement", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateLeadDto.prototype, "pipelineStageId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateLeadDto.prototype, "pipelineId", void 0);
//# sourceMappingURL=lead.dto.js.map