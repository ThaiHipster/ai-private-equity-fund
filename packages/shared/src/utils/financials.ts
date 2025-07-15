import type { IRR, MOIC, Multiple, MoneyAmount, Percentage } from '../types/financials';
import type { DateString } from '../types/common';

export const calculateIRR = (cashFlows: number[], dates: Date[]): IRR => {
  if (cashFlows.length !== dates.length || cashFlows.length < 2) {
    throw new Error('Invalid cash flow data for IRR calculation');
  }

  const initialGuess = 0.1;
  const tolerance = 1e-6;
  const maxIterations = 100;

  let rate = initialGuess;
  
  for (let i = 0; i < maxIterations; i++) {
    const npv = calculateNPV(cashFlows, dates, rate);
    const npvDerivative = calculateNPVDerivative(cashFlows, dates, rate);
    
    if (Math.abs(npv) < tolerance) {
      return rate as IRR;
    }
    
    rate = rate - npv / npvDerivative;
  }
  
  throw new Error('IRR calculation did not converge');
};

export const calculateMOIC = (totalDistributions: MoneyAmount, totalInvested: MoneyAmount): MOIC => {
  if (totalInvested <= 0) {
    throw new Error('Total invested must be greater than zero');
  }
  
  return (totalDistributions / totalInvested) as MOIC;
};

export const calculateNPV = (cashFlows: number[], dates: Date[], discountRate: number): number => {
  const baseDate = dates[0];
  
  return cashFlows.reduce((npv, cashFlow, index) => {
    const yearsDiff = getYearsDifference(baseDate, dates[index]);
    return npv + cashFlow / Math.pow(1 + discountRate, yearsDiff);
  }, 0);
};

const calculateNPVDerivative = (cashFlows: number[], dates: Date[], discountRate: number): number => {
  const baseDate = dates[0];
  
  return cashFlows.reduce((derivative, cashFlow, index) => {
    const yearsDiff = getYearsDifference(baseDate, dates[index]);
    return derivative - (yearsDiff * cashFlow) / Math.pow(1 + discountRate, yearsDiff + 1);
  }, 0);
};

export const calculateEVRevenue = (enterpriseValue: MoneyAmount, revenue: MoneyAmount): Multiple => {
  if (revenue <= 0) {
    throw new Error('Revenue must be greater than zero');
  }
  
  return (enterpriseValue / revenue) as Multiple;
};

export const calculateEVEBITDA = (enterpriseValue: MoneyAmount, ebitda: MoneyAmount): Multiple => {
  if (ebitda <= 0) {
    throw new Error('EBITDA must be greater than zero');
  }
  
  return (enterpriseValue / ebitda) as Multiple;
};

export const calculateDPI = (totalDistributions: MoneyAmount, totalCalled: MoneyAmount): Percentage => {
  if (totalCalled <= 0) {
    throw new Error('Total called must be greater than zero');
  }
  
  return (totalDistributions / totalCalled) as Percentage;
};

export const calculateRVPI = (residualValue: MoneyAmount, totalCalled: MoneyAmount): Percentage => {
  if (totalCalled <= 0) {
    throw new Error('Total called must be greater than zero');
  }
  
  return (residualValue / totalCalled) as Percentage;
};

export const calculateTVPI = (totalValue: MoneyAmount, totalCalled: MoneyAmount): Percentage => {
  if (totalCalled <= 0) {
    throw new Error('Total called must be greater than zero');
  }
  
  return (totalValue / totalCalled) as Percentage;
};

export const getYearsDifference = (startDate: Date, endDate: Date): number => {
  const diffInMs = endDate.getTime() - startDate.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays / 365.25;
};

export const formatCurrency = (amount: MoneyAmount, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (value: Percentage, decimalPlaces = 1): string => {
  return `${(value * 100).toFixed(decimalPlaces)}%`;
};

export const formatMultiple = (multiple: Multiple, decimalPlaces = 1): string => {
  return `${multiple.toFixed(decimalPlaces)}x`;
};

export const calculateHoldingPeriod = (investmentDate: DateString, exitDate: DateString): number => {
  const startDate = new Date(investmentDate);
  const endDate = new Date(exitDate);
  return getYearsDifference(startDate, endDate);
};

export const calculateCompoundedReturn = (initialValue: MoneyAmount, finalValue: MoneyAmount, years: number): Percentage => {
  if (initialValue <= 0 || years <= 0) {
    throw new Error('Initial value and years must be greater than zero');
  }
  
  return (Math.pow(finalValue / initialValue, 1 / years) - 1) as Percentage;
};