import type { Brand, DateString, MoneyAmount, EmailAddress } from './common';

export type DealId = Brand<string, 'DealId'>;

export type DealStatus = 
  | 'prospecting'
  | 'initial_review'
  | 'due_diligence'
  | 'investment_committee'
  | 'negotiation'
  | 'closing'
  | 'closed'
  | 'passed';

export type DealStage = 
  | 'sourcing'
  | 'screening'
  | 'due_diligence'
  | 'investment_decision'
  | 'execution';

export type InvestmentType = 
  | 'buyout'
  | 'growth_equity'
  | 'venture_capital'
  | 'distressed'
  | 'real_estate'
  | 'infrastructure';

export type Deal = {
  id: DealId;
  companyName: string;
  status: DealStatus;
  stage: DealStage;
  investmentType: InvestmentType;
  targetInvestment: MoneyAmount;
  enterpriseValue: MoneyAmount;
  equityValue: MoneyAmount;
  sector: string;
  geography: string;
  leadPartner: EmailAddress;
  sourceDate: DateString;
  targetCloseDate: DateString;
  actualCloseDate?: DateString;
  description: string;
  investmentThesis: string;
  createdAt: DateString;
  updatedAt: DateString;
};

export type DueDiligenceCategory = 
  | 'financial'
  | 'legal'
  | 'commercial'
  | 'operational'
  | 'technology'
  | 'management'
  | 'esg';

export type DueDiligenceStatus = 
  | 'not_started'
  | 'in_progress'
  | 'completed'
  | 'requires_attention';

export type DueDiligenceItem = {
  id: Brand<string, 'DueDiligenceItemId'>;
  dealId: DealId;
  category: DueDiligenceCategory;
  title: string;
  description: string;
  status: DueDiligenceStatus;
  assignedTo: EmailAddress;
  dueDate: DateString;
  completedDate?: DateString;
  findings: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  createdAt: DateString;
  updatedAt: DateString;
};

export type Valuation = {
  id: Brand<string, 'ValuationId'>;
  dealId: DealId;
  method: 'dcf' | 'comparable_companies' | 'precedent_transactions' | 'asset_based';
  enterpriseValue: MoneyAmount;
  equityValue: MoneyAmount;
  impliedMultiple: number;
  assumptions: Record<string, unknown>;
  createdBy: EmailAddress;
  createdAt: DateString;
};

export type InvestmentThesis = {
  dealId: DealId;
  marketOpportunity: string;
  competitiveAdvantage: string;
  managementTeam: string;
  valueCreationPlan: string;
  exitStrategy: string;
  keyRisks: string[];
  investmentHighlights: string[];
  createdAt: DateString;
  updatedAt: DateString;
};