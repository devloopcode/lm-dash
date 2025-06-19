import { Repository } from 'typeorm';
import { PipelineStage } from './pipelineStages/entity/pipeline-stage.entity';
import { Pipeline } from './pipelines/entity/pipeline.entity';
export declare class AppService {
    private pipelineStageRepo;
    private pipelineRepo;
    constructor(pipelineStageRepo: Repository<PipelineStage>, pipelineRepo: Repository<Pipeline>);
    getHello(): string;
}
