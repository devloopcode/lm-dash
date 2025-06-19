"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadSource = exports.LeadFinancingStatus = exports.LeadSector = exports.LeadPriority = exports.LeadStatus = void 0;
var LeadStatus;
(function (LeadStatus) {
    LeadStatus["HOT"] = "Hot";
    LeadStatus["ACTIVE"] = "Active";
    LeadStatus["COLD"] = "Cold";
})(LeadStatus || (exports.LeadStatus = LeadStatus = {}));
var LeadPriority;
(function (LeadPriority) {
    LeadPriority["LOW"] = "Low";
    LeadPriority["MEDIUM"] = "Medium";
    LeadPriority["HIGH"] = "High";
})(LeadPriority || (exports.LeadPriority = LeadPriority = {}));
var LeadSector;
(function (LeadSector) {
    LeadSector["RESIDENTIAL_SALE"] = "Residential Sale";
    LeadSector["RESIDENTIAL_RENT"] = "Residential Rent";
    LeadSector["COMMERCIAL_RENT"] = "Commercial Rent";
    LeadSector["COMMERCIAL_SALE"] = "Commercial Sale";
})(LeadSector || (exports.LeadSector = LeadSector = {}));
var LeadFinancingStatus;
(function (LeadFinancingStatus) {
    LeadFinancingStatus["CASH_BUYER"] = "Cash Buyer";
    LeadFinancingStatus["MORTGAGE_PRE_APPROVED"] = "Mortgage Pre-Approved";
    LeadFinancingStatus["MORTGAGE_PENDING"] = "Mortgage Pending";
    LeadFinancingStatus["FINANCING_REQUIRED"] = "Financing Required";
    LeadFinancingStatus["INVESTOR"] = "Investor";
})(LeadFinancingStatus || (exports.LeadFinancingStatus = LeadFinancingStatus = {}));
var LeadSource;
(function (LeadSource) {
    LeadSource["WEBSITE"] = "Website";
    LeadSource["SOCIAL_MEDIA"] = "Social Media";
    LeadSource["REFERRAL"] = "Referral";
    LeadSource["WALK_IN"] = "Walk-in";
    LeadSource["COLD_CALL"] = "Cold Call";
    LeadSource["ADVERTISEMENT"] = "Advertisement";
    LeadSource["EVENT"] = "Event";
})(LeadSource || (exports.LeadSource = LeadSource = {}));
//# sourceMappingURL=index.js.map