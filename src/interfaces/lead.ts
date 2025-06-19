import { Lead } from "src/lead/entity/lead.entity";

export interface ILead {
    data: Lead[];
    total: number;
    page: number;
    limit: number;
    pageCount: number;
    hasNext: boolean;
    hasPrev: boolean;
}