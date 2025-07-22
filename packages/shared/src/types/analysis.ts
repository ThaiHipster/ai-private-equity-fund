import type { Brand } from './common';

export type AnalysisMode = Brand<string, 'AnalysisMode'>;

export const ANALYSIS_MODES = {
  PORTFOLIO_OVERVIEW: 'portfolio_overview' as AnalysisMode,
  DEAL_FLOW: 'deal_flow' as AnalysisMode,
  PERFORMANCE_ANALYTICS: 'performance_analytics' as AnalysisMode,
  MARKET_ANALYSIS: 'market_analysis' as AnalysisMode,
  RISK_ASSESSMENT: 'risk_assessment' as AnalysisMode,
} as const;

export type AnalysisModeKey = keyof typeof ANALYSIS_MODES;

export type AnalysisModeConfig = {
  mode: AnalysisMode;
  label: string;
  description: string;
  icon?: string;
};

export const ANALYSIS_MODE_CONFIGS: Record<
  AnalysisModeKey,
  AnalysisModeConfig
> = {
  PORTFOLIO_OVERVIEW: {
    mode: ANALYSIS_MODES.PORTFOLIO_OVERVIEW,
    label: 'Portfolio Overview',
    description: 'High-level portfolio performance and holdings',
  },
  DEAL_FLOW: {
    mode: ANALYSIS_MODES.DEAL_FLOW,
    label: 'Deal Flow',
    description: 'Pipeline analysis and investment opportunities',
  },
  PERFORMANCE_ANALYTICS: {
    mode: ANALYSIS_MODES.PERFORMANCE_ANALYTICS,
    label: 'Performance Analytics',
    description: 'Detailed metrics and benchmarking',
  },
  MARKET_ANALYSIS: {
    mode: ANALYSIS_MODES.MARKET_ANALYSIS,
    label: 'Market Analysis',
    description: 'Market trends and sector insights',
  },
  RISK_ASSESSMENT: {
    mode: ANALYSIS_MODES.RISK_ASSESSMENT,
    label: 'Risk Assessment',
    description: 'Portfolio risk metrics and stress testing',
  },
};
