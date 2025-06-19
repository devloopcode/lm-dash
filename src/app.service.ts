

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PipelineStage } from './pipelineStages/entity/pipeline-stage.entity';
import { Pipeline } from './pipelines/entity/pipeline.entity';

@Injectable()
export class AppService {
  // export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(PipelineStage)
    private pipelineStageRepo: Repository<PipelineStage>,
    @InjectRepository(Pipeline)
    private pipelineRepo: Repository<Pipeline>,
  ) { }


  getHello(): string {
    return 'Hello World!';
  }

  // async onModuleInit() {


  //   const count = await this.pipelineStageRepo.count();
  //   if (count === 0) {
  //     const now = new Date();

  //     const stages: PipelineStage[] = [
  //       { id: 1, name: 'New Lead', description: 'Initial stage for new leads', isDefault: true, isActive: true, isTemplate: false, templateCategory: '1', isPrivate: false, createdAt: now, updatedAt: now, },
  //       { id: 2, name: 'Contacted', description: 'Leads that have been contacted', isDefault: true, isActive: true, isTemplate: false, templateCategory: '2', isPrivate: false, createdAt: now, updatedAt: now, },
  //       { id: 3, name: 'Qualified', description: 'Leads that meet qualification criteria', isDefault: true, isActive: true, isTemplate: false, templateCategory: '3', isPrivate: false, createdAt: now, updatedAt: now, },
  //       { id: 4, name: 'Appointment', description: 'Appointments scheduled with leads', isDefault: true, isActive: true, isTemplate: false, templateCategory: '1', isPrivate: false, createdAt: now, updatedAt: now, },
  //       { id: 5, name: 'Property Viewing', description: 'Stage where leads view properties', isDefault: true, isActive: true, isTemplate: false, templateCategory: '2', isPrivate: false, createdAt: now, updatedAt: now, },
  //       { id: 6, name: 'Negotiation', description: 'Stage for price and terms negotiation', isDefault: true, isActive: true, isTemplate: false, templateCategory: '3', isPrivate: false, createdAt: now, updatedAt: now, },
  //       { id: 7, name: 'Contract', description: 'Contracts are being prepared or signed', isDefault: true, isActive: true, isTemplate: false, templateCategory: '1', isPrivate: false, createdAt: now, updatedAt: now, },
  //       { id: 8, name: 'Closed Won', description: 'Deals that are successfully closed', isDefault: true, isActive: true, isTemplate: false, templateCategory: '2', isPrivate: false, createdAt: now, updatedAt: now, },
  //       { id: 9, name: 'Closed Lost', description: 'Deals that did not close', isDefault: true, isActive: true, isTemplate: false, templateCategory: '3', isPrivate: false, createdAt: now, updatedAt: now, },
  //     ];

  //     await this.pipelineStageRepo.save({

  //     });
  //     console.log('✅ Seeded pipelineStages with fixed IDs');

  //     // Seed pipeline if empty
  //     const pipelineCount = await this.pipelineRepo.count();
  //     if (pipelineCount === 0) {
  //       await this.pipelineRepo.save({
  //         id: 1,
  //         name: 'Real Estate Sales Pipeline',
  //         description: 'Standard real estate sales process',
  //         isDefault: true,
  //         isActive: true,
  //         isTemplate: false,
  //         templateCategory: 'Real Estate',
  //         isPrivate: false,
  //         createdById: 1,
  //       });
  //       console.log('Seeded default pipeline');
  //     }
  //   }
  // }
}
