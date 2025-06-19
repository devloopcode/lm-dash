"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const lead_module_1 = require("./lead/lead.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user/entity/user.entity");
const lead_entity_1 = require("./lead/entity/lead.entity");
const auth_module_1 = require("./auth/auth.module");
const pipeline_stage_entity_1 = require("./pipelineStages/entity/pipeline-stage.entity");
const pipeline_entity_1 = require("./pipelines/entity/pipeline.entity");
const activity_entity_1 = require("./activities/entity/activity.entity");
const email_service_1 = require("./email/email.service");
const email_module_1 = require("./email/email.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                synchronize: true,
                dropSchema: false,
                entities: [user_entity_1.User, lead_entity_1.Lead, pipeline_stage_entity_1.PipelineStage, pipeline_entity_1.Pipeline, activity_entity_1.Activity],
                logging: ['error', 'warn']
            }),
            typeorm_1.TypeOrmModule.forFeature([lead_entity_1.Lead, user_entity_1.User, pipeline_stage_entity_1.PipelineStage, pipeline_entity_1.Pipeline, activity_entity_1.Activity]),
            lead_module_1.LeadModule,
            auth_module_1.AuthModule,
            email_module_1.EmailModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, email_service_1.EmailService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map