import type { Brand, DateString, MoneyAmount, Percentage } from './common';
import type { PortfolioCompanyId } from './portfolio';
import type { DealId } from './deals';

export type IRR = Brand<number, 'IRR'>;

export type MOIC = Brand<number, 'MOIC'>;

export type Multiple = Brand<number, 'Multiple'>;

export type FinancialMetricType = 
  | 'revenue'
  | 'ebitda'
  | 'ebit'
  | 'net_income'
  | 'free_cash_flow'
  | 'working_capital'
  | 'capex'
  | 'debt'
  | 'equity_value'
  | 'enterprise_value';

export type FinancialMetric = {
  id: Brand<string, 'FinancialMetricId'>;
  entityId: PortfolioCompanyId | DealId;
  entityType: 'portfolio_company' | 'deal';
  metricType: FinancialMetricType;
  value: MoneyAmount;
  reportingPeriod: DateString;
  periodType: 'monthly' | 'quarterly' | 'annually';
  isActual: boolean;
  isForecast: boolean;
  currency: string;
  notes?: string;
  createdAt: DateString;
  updatedAt: DateString;
};

export type ValuationMultiple = {
  id: Brand<string, 'ValuationMultipleId'>;
  entityId: PortfolioCompanyId | DealId;
  entityType: 'portfolio_company' | 'deal';
  multipleType: 'ev_revenue' | 'ev_ebitda' | 'ev_ebit' | 'p_e' | 'p_b' | 'p_s';
  multiple: Multiple;
  benchmarkMultiple?: Multiple;
  reportingDate: DateString;
  source: string;
  createdAt: DateString;
};

export type CashFlow = {
  id: Brand<string, 'CashFlowId'>;
  entityId: PortfolioCompanyId | DealId;
  entityType: 'portfolio_company' | 'deal';
  flowType: 'inflow' | 'outflow';
  amount: MoneyAmount;
  date: DateString;
  description: string;
  category: 'investment' | 'distribution' | 'management_fee' | 'carried_interest' | 'other';
  createdAt: DateString;
};

export type FundPerformance = {
  id: Brand<string, 'FundPerformanceId'>;
  fundId: Brand<string, 'FundId'>;
  asOfDate: DateString;
  totalCommitments: MoneyAmount;
  totalCalled: MoneyAmount;
  totalDistributed: MoneyAmount;
  netAssetValue: MoneyAmount;
  irr: IRR;
  moic: MOIC;
  dpi: Percentage;
  rvpi: Percentage;
  tvpi: Percentage;
  managementFeesCollected: MoneyAmount;
  carriedInterestAccrued: MoneyAmount;
  createdAt: DateString;
};

export type BenchmarkData = {
  id: Brand<string, 'BenchmarkDataId'>;
  benchmarkName: string;
  vintage: number;
  strategy: string;
  geography: string;
  irr: IRR;
  moic: MOIC;
  dpi: Percentage;
  tvpi: Percentage;
  asOfDate: DateString;
  source: string;
  createdAt: DateString;
};

export type RiskMetrics = {
  id: Brand<string, 'RiskMetricsId'>;
  entityId: PortfolioCompanyId | DealId;
  entityType: 'portfolio_company' | 'deal';
  volatility: Percentage;
  beta?: number;
  varAtRisk?: MoneyAmount;
  stressTestResults: Record<string, number>;
  concentrationRisk: Percentage;
  liquidityRisk: 'low' | 'medium' | 'high';
  calculatedAt: DateString;
  createdAt: DateString;
};