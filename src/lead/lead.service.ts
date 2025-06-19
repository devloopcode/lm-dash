import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Lead } from './entity/lead.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { ILead } from 'src/interfaces/lead';
import { LeadDto, UpdateLeadDto } from './dto/lead.dto';
import { User } from 'src/user/entity/user.entity';
import { PipelineStage } from 'src/pipelineStages/entity/pipeline-stage.entity';
import { Pipeline } from 'src/pipelines/entity/pipeline.entity';
import { LeadPriority } from 'src/enums';
import { Activity } from 'src/activities/entity/activity.entity';
import { ActivityDto } from './dto/activity.dto';
import { Request } from 'express';
import { IAuthUser } from 'src/interfaces/auth';



@Injectable()
export class LeadService {

    constructor(
        @InjectRepository(Lead)
        private readonly leadRepository: Repository<Lead>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(PipelineStage)
        private readonly piplineStageRepository: Repository<PipelineStage>,
        @InjectRepository(Pipeline)
        private readonly piplineRepository: Repository<Pipeline>,
        @InjectRepository(Activity)
        private readonly activityRepository: Repository<Activity>,
    ) { }

    async getAllLeads(id: number, page: number, limit: number, title: string): Promise<ILead> {

        const conditions: any = [];

        if (title) {
            conditions.push(
                { fullName: ILike(`%${title}%`) },
                { email: ILike(`%${title}%`) },
                { requirement: ILike(`%${title}%`) }
            );
        }
        if (id) {
            if (conditions.length > 0) {
                for (let i = 0; i < conditions.length; i++) {
                    conditions[i] = {
                        ...conditions[i],
                        pipelineStage: { id: Number(id) },
                    };
                }
            } else {
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

        } catch (error) {
            console.log("🚀 ~ lead.service.ts:58 ~ LeadService ~ getPipelinesService ~ error:", error);
            throw new InternalServerErrorException(
                error
            );
        }
    }

    private async searchLeadsService(title: string, page: number, limit: number) {
        try {

            const [data, total] = await this.leadRepository.findAndCount({
                skip: (page - 1) * limit,
                take: Number(limit),
                relations: ['assignedTo', 'pipelineStage', 'pipeline', 'activities'],
                where: [
                    { fullName: ILike(`%${title}%`) },
                    { email: ILike(`%${title}%`) },
                    { requirement: ILike(`%${title}%`) },
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

        } catch (error) {
            console.log("🚀 ~ lead.service.ts:76 ~ LeadService ~ searchLeadsService ~ error:", error);

            throw new InternalServerErrorException(
                error
            );
        }
    }

    async createLeadService(req: Request, lead: LeadDto) {

        try {
            const pipelineStage = await this.piplineStageRepository.findOneBy({ id: lead.pipelineStageId || 1 });
            const pipeline = await this.piplineRepository.findOneBy({ id: lead.pipelineId || 1 });

            if (!pipelineStage) throw new BadRequestException('The pipeline stage is required');
            if (!pipeline) throw new BadRequestException('The pipeline is required');

            const authUser = req['user'];
            const user = await this.userRepository.findOneBy({ email: authUser?.email });
            if (!user) throw new BadRequestException('The user is required');

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
                priority: lead.priority || LeadPriority.MEDIUM,
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



        } catch (error) {
            console.log("🚀 ~ lead.service.ts:52 ~ LeadService ~ createLeadService ~ error:", error);
            throw new InternalServerErrorException(
                error
            );

        }
    }

    async getLeadActivitiesService(id: string) {
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

        } catch (error) {
            console.log("🚀 ~ lead.service.ts:108 ~ LeadService ~ getLeadActivitiesService ~ error:", error);

            throw new HttpException(
                error,
                HttpStatus.NOT_FOUND
            );
        }
    }

    async getOneLeadService(id: string) {
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
            if (!lead) throw new HttpException('Lead not found', HttpStatus.NOT_FOUND);

            return lead;
        } catch (error) {
            console.log("🚀 ~ lead.service.ts:82 ~ LeadService ~ getOneLeadService ~ error:", error);
            throw new HttpException(
                error,
                HttpStatus.NOT_FOUND
            );
        }
    }


    async getLeadsByAssigneeService(req: Request, page: number, limit: number) {
        try {
            const user = req['user'] as IAuthUser;
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
            if (data.length === 0) throw new HttpException('Lead not found', HttpStatus.NOT_FOUND);

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
        } catch (error) {
            console.log("🚀 ~ lead.service.ts:82 ~ LeadService ~ getOneLeadService ~ error:", error);
            throw new HttpException(
                error,
                HttpStatus.NOT_FOUND
            );

        }
    }

    async moveToStageMutationService(id: string, stageId: string) {

        try {
            const lead = await this.leadRepository.findOneBy({ id: Number(id) });
            if (!lead) throw new HttpException('Lead not found', HttpStatus.NOT_FOUND);

            const stage = await this.piplineStageRepository.findOneBy({ id: Number(stageId) });
            if (!stage) throw new HttpException('Pipeline stage not found', HttpStatus.NOT_FOUND);

            await this.leadRepository.update(lead.id, {
                pipelineStage: { id: Number(stageId) },
                stage: stage.name
            });

            return { message: 'Pipeline stage updated successfully' };

        } catch (error) {
            console.log("🚀 ~ lead.service.ts:280 ~ LeadService ~ moveToStageMutationService ~ error:", error);
            throw new HttpException(
                error,
                HttpStatus.NOT_FOUND
            );
        }
    }

    async postLeadActivitiesService(req: Request, { type, content }: ActivityDto, id: string) {
        try {

            const authUser = req['user'] as IAuthUser;
            const user = await this.userRepository.findOneBy({ email: authUser?.email });
            if (!user) throw new BadRequestException('The user is required');

            const leadId = Number(id);
            const lead = await this.leadRepository.findOneBy({ id: leadId });

            if (!lead) throw new HttpException('Lead not found', HttpStatus.NOT_FOUND);

            const activity = await this.activityRepository.save({
                lead,
                user: user,
                type: type || "note",
                content: content
            });

            lead.lastContacted = new Date();

            await this.leadRepository.save(lead);
            return activity;


        } catch (error) {
            console.log("🚀 ~ lead.service.ts:200 ~ LeadService ~ postLeadActivitiesService ~ error:", error);

            throw new HttpException(
                error,
                HttpStatus.NOT_FOUND
            );
        }
    }

    async getLeadsByStageService(req: Request, view: string, id: string, page: number, limit: number) {

        try {
            // skip: (page - 1) * limit,
            // take: limit,

            // const user = req.user as IAuthUser;

            // const [data, total] = await this.leadRepository.findAndCount({
            //     relations: ['assignedTo', 'pipelineStage', 'pipeline', 'activities'],
            //     where: {
            //         ...(view === 'mine' && {
            //             assignedTo: { id: user.sub },
            //         }),
            //         pipelineStage: {
            //             id: Number(id),
            //         },
            //     },
            // });

            const user = req['user'] as IAuthUser | undefined;

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
                // total,
                // page,
                // limit,
                // pageCount,
                // hasNext: page < pageCount,
                // hasPrev: page > 1
            };
        } catch (error) {
            console.log("🚀 ~ lead.service.ts:82 ~ LeadService ~ getOneLeadService ~ error:", error);
            throw new HttpException(
                error,
                HttpStatus.NOT_FOUND
            );

        }
    }


    async updateLeadService(leadData: UpdateLeadDto, id: string) {
        try {
            const leadId = Number(id);
            const updateLead = await this.leadRepository.findOneBy({ id: leadId });
            if (!updateLead) throw new HttpException('Lead not found', HttpStatus.NOT_FOUND);

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
                    // user: null,
                    type: "stage-change",
                    content: `Lead moved from ${oldStage?.name} to ${newStage?.name}`,
                });
            }

            const updated_lead = await this.leadRepository.update(id, leadData);
            return updated_lead;

        } catch (error) {
            console.log("🚀 ~ lead.service.ts:93 ~ LeadService ~ updateLeadService ~ error:", error);
            throw new HttpException(
                error,
                HttpStatus.INTERNAL_SERVER_ERROR
            );

        }
    }


    async updateLeadNoteService(id: string, note: string) {
        try {
            const leadId = Number(id);
            const updateLeadNote = await this.leadRepository.findOneBy({ id: leadId });
            if (!updateLeadNote) throw new HttpException('Lead not found', HttpStatus.NOT_FOUND);

            const updatedLeadNote = await this.leadRepository.update(id, {
                note
            });
            return updatedLeadNote;

        } catch (error) {
            console.log("🚀 ~ lead.service.ts:358 ~ LeadService ~ updateLeadNoteService ~ error:", error);
            throw new HttpException(
                error,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    async deleteLeadService(leadId: string) {
        try {
            const id = Number(leadId);
            const leadToBeDeleted = await this.leadRepository.findOneBy({ id });
            if (!leadToBeDeleted) throw new HttpException('Lead not found', HttpStatus.NOT_FOUND);

            const confirmation = await this.leadRepository.delete(leadToBeDeleted.id);

            if (confirmation.affected) {
                return true;
            }

            return false;
        } catch (error) {
            console.log("🚀 ~ lead.service.ts:117 ~ LeadService ~ deleteLeadService ~ error:", error);
            throw new HttpException(
                error,
                HttpStatus.INTERNAL_SERVER_ERROR
            );

        }
    }
}