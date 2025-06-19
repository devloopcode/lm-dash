"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadModule = void 0;
const common_1 = require("@nestjs/common");
const lead_controller_1 = require("./lead.controller");
const lead_service_1 = require("./lead.service");
const typeorm_1 = require("@nestjs/typeorm");
const lead_entity_1 = require("./entity/lead.entity");
const user_entity_1 = require("../user/entity/user.entity");
const pipeline_stage_entity_1 = require("../pipelineStages/entity/pipeline-stage.entity");
const pipeline_entity_1 = require("../pipelines/entity/pipeline.entity");
const activity_entity_1 = require("../activities/entity/activity.entity");
const auth_guard_1 = require("../auth/auth.guard");
let LeadModule = class LeadModule {
};
exports.LeadModule = LeadModule;
exports.LeadModule = LeadModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([lead_entity_1.Lead, user_entity_1.User, pipeline_stage_entity_1.PipelineStage, pipeline_entity_1.Pipeline, activity_entity_1.Activity])],
        providers: [lead_service_1.LeadService, auth_guard_1.AuthGuard],
        controllers: [lead_controller_1.LeadController],
        exports: [lead_service_1.LeadService],
    })
], LeadModule);
//# sourceMappingURL=lead.module.js.map