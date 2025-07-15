import type { Brand, DateString, MoneyAmount, EmailAddress, Percentage } from './common';
import type { DealId } from './deals';

export type PortfolioCompanyId = Brand<string, 'PortfolioCompanyId'>;

export type PortfolioCompanyStatus = 
  | 'active'
  | 'under_review'
  | 'exiting'
  | 'exited';

export type ExitType = 
  | 'ipo'
  | 'strategic_sale'
  | 'financial_sale'
  | 'management_buyout'
  | 'liquidation'
  | 'write_off';

export type PortfolioCompany = {
  id: PortfolioCompanyId;
  dealId: DealId;
  companyName: string;
  status: PortfolioCompanyStatus;
  sector: string;
  geography: string;
  investmentDate: DateString;
  initialInvestment: MoneyAmount;
  totalInvested: MoneyAmount;
  ownershipPercentage: Percentage;
  currentValuation: MoneyAmount;
  lastValuationDate: DateString;
  leadPartner: EmailAddress;
  boardRepresentatives: EmailAddress[];
  exitDate?: DateString;
  exitType?: ExitType;
  exitValue?: MoneyAmount;
  createdAt: DateString;
  updatedAt: DateString;
};

export type KPICategory = 
  | 'financial'
  | 'operational'
  | 'growth'
  | 'customer'
  | 'employee'
  | 'esg';

export type KPIFrequency = 
  | 'monthly'
  | 'quarterly'
  | 'annually';

export type KPI = {
  id: Brand<string, 'KPIId'>;
  portfolioCompanyId: PortfolioCompanyId;
  name: string;
  category: KPICategory;
  description: string;
  unit: string;
  frequency: KPIFrequency;
  target?: number;
  benchmark?: number;
  isActive: boolean;
  createdAt: DateString;
  updatedAt: DateString;
};

export type KPIValue = {
  id: Brand<string, 'KPIValueId'>;
  kpiId: Brand<string, 'KPIId'>;
  portfolioCompanyId: PortfolioCompanyId;
  value: number;
  reportingPeriod: DateString;
  notes?: string;
  createdAt: DateString;
};

export type ValueCreationInitiativeStatus = 
  | 'planned'
  | 'in_progress'
  | 'completed'
  | 'on_hold'
  | 'cancelled';

export type ValueCreationInitiativeType = 
  | 'operational_improvement'
  | 'revenue_growth'
  | 'cost_reduction'
  | 'market_expansion'
  | 'digital_transformation'
  | 'acquisitions'
  | 'management_upgrade'
  | 'esg_initiative';

export type ValueCreationInitiative = {
  id: Brand<string, 'ValueCreationInitiativeId'>;
  portfolioCompanyId: PortfolioCompanyId;
  title: string;
  description: string;
  type: ValueCreationInitiativeType;
  status: ValueCreationInitiativeStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedValue: MoneyAmount;
  actualValue?: MoneyAmount;
  startDate: DateString;
  targetCompletionDate: DateString;
  actualCompletionDate?: DateString;
  owner: EmailAddress;
  stakeholders: EmailAddress[];
  milestones: string[];
  successMetrics: string[];
  createdAt: DateString;
  updatedAt: DateString;
};

export type BoardMeeting = {
  id: Brand<string, 'BoardMeetingId'>;
  portfolioCompanyId: PortfolioCompanyId;
  meetingDate: DateString;
  attendees: EmailAddress[];
  agenda: string[];
  keyDecisions: string[];
  actionItems: string[];
  nextMeetingDate?: DateString;
  presentationUrl?: string;
  minutesUrl?: string;
  createdAt: DateString;
  updatedAt: DateString;
};

export type PerformanceMetrics = {
  portfolioCompanyId: PortfolioCompanyId;
  reportingPeriod: DateString;
  revenue: MoneyAmount;
  ebitda: MoneyAmount;
  netIncome: MoneyAmount;
  cashFlow: MoneyAmount;
  employeeCount: number;
  customerCount: number;
  marketShare?: Percentage;
  createdAt: DateString;
};