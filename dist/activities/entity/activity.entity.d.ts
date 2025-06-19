import { Lead } from 'src/lead/entity/lead.entity';
import { User } from 'src/user/entity/user.entity';
export declare class Activity {
    id: number;
    type: string;
    content: string;
    createdAt: Date;
    lead: Lead;
    user: User;
}
