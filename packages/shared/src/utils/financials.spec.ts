import { describe, expect, test } from 'vitest';
import {
  calculateIRR,
  calculateMOIC,
  calculateNPV,
  calculateEVRevenue,
  calculateEVEBITDA,
  calculateDPI,
  calculateRVPI,
  calculateTVPI,
  getYearsDifference,
  calculateHoldingPeriod,
  calculateCompoundedReturn,
  formatCurrency,
  formatPercentage,
  formatMultiple,
} from './financials';

describe('calculateIRR', () => {
  test('calculates IRR for simple cash flows', () => {
    const cashFlows = [-1000, 1200];
    const dates = [new Date('2020-01-01'), new Date('2021-01-01')];
    
    const irr = calculateIRR(cashFlows, dates);
    
    expect(irr).toBeCloseTo(0.2, 2);
  });

  test('throws error for invalid cash flow data', () => {
    expect(() => calculateIRR([], [])).toThrow('Invalid cash flow data for IRR calculation');
    expect(() => calculateIRR([100], [new Date()])).toThrow('Invalid cash flow data for IRR calculation');
  });
});

describe('calculateMOIC', () => {
  test('calculates MOIC correctly', () => {
    const totalDistributions = 2000;
    const totalInvested = 1000;
    
    const moic = calculateMOIC(totalDistributions, totalInvested);
    
    expect(moic).toBe(2);
  });

  test('throws error for zero total invested', () => {
    expect(() => calculateMOIC(1000, 0)).toThrow('Total invested must be greater than zero');
  });
});

describe('calculateNPV', () => {
  test('calculates NPV correctly', () => {
    const cashFlows = [-1000, 500, 600];
    const dates = [
      new Date('2020-01-01'),
      new Date('2021-01-01'),
      new Date('2022-01-01')
    ];
    const discountRate = 0.1;
    
    const npv = calculateNPV(cashFlows, dates, discountRate);
    
    expect(npv).toBeCloseTo(-3.31, 1);
  });
});

describe('calculateEVRevenue', () => {
  test('calculates EV/Revenue multiple correctly', () => {
    const enterpriseValue = 10000;
    const revenue = 2000;
    
    const multiple = calculateEVRevenue(enterpriseValue, revenue);
    
    expect(multiple).toBe(5);
  });

  test('throws error for zero revenue', () => {
    expect(() => calculateEVRevenue(10000, 0)).toThrow('Revenue must be greater than zero');
  });
});

describe('calculateEVEBITDA', () => {
  test('calculates EV/EBITDA multiple correctly', () => {
    const enterpriseValue = 10000;
    const ebitda = 1000;
    
    const multiple = calculateEVEBITDA(enterpriseValue, ebitda);
    
    expect(multiple).toBe(10);
  });

  test('throws error for zero EBITDA', () => {
    expect(() => calculateEVEBITDA(10000, 0)).toThrow('EBITDA must be greater than zero');
  });
});

describe('calculateDPI', () => {
  test('calculates DPI correctly', () => {
    const totalDistributions = 1500;
    const totalCalled = 1000;
    
    const dpi = calculateDPI(totalDistributions, totalCalled);
    
    expect(dpi).toBe(1.5);
  });
});

describe('calculateRVPI', () => {
  test('calculates RVPI correctly', () => {
    const residualValue = 800;
    const totalCalled = 1000;
    
    const rvpi = calculateRVPI(residualValue, totalCalled);
    
    expect(rvpi).toBe(0.8);
  });
});

describe('calculateTVPI', () => {
  test('calculates TVPI correctly', () => {
    const totalValue = 2300;
    const totalCalled = 1000;
    
    const tvpi = calculateTVPI(totalValue, totalCalled);
    
    expect(tvpi).toBe(2.3);
  });
});

describe('getYearsDifference', () => {
  test('calculates years difference correctly', () => {
    const startDate = new Date('2020-01-01');
    const endDate = new Date('2023-01-01');
    
    const years = getYearsDifference(startDate, endDate);
    
    expect(years).toBeCloseTo(3, 1);
  });
});

describe('calculateHoldingPeriod', () => {
  test('calculates holding period correctly', () => {
    const investmentDate = '2020-01-01';
    const exitDate = '2023-01-01';
    
    const holdingPeriod = calculateHoldingPeriod(investmentDate, exitDate);
    
    expect(holdingPeriod).toBeCloseTo(3, 1);
  });
});

describe('calculateCompoundedReturn', () => {
  test('calculates compounded return correctly', () => {
    const initialValue = 1000;
    const finalValue = 1331;
    const years = 3;
    
    const return_ = calculateCompoundedReturn(initialValue, finalValue, years);
    
    expect(return_).toBeCloseTo(0.1, 2);
  });

  test('throws error for invalid inputs', () => {
    expect(() => calculateCompoundedReturn(0, 1000, 3)).toThrow('Initial value and years must be greater than zero');
    expect(() => calculateCompoundedReturn(1000, 1331, 0)).toThrow('Initial value and years must be greater than zero');
  });
});

describe('formatting functions', () => {
  test('formatCurrency formats correctly', () => {
    expect(formatCurrency(1234567)).toBe('$1,234,567');
    expect(formatCurrency(1234567, 'EUR')).toBe('€1,234,567');
  });

  test('formatPercentage formats correctly', () => {
    expect(formatPercentage(0.1234)).toBe('12.3%');
    expect(formatPercentage(0.1234, 2)).toBe('12.34%');
  });

  test('formatMultiple formats correctly', () => {
    expect(formatMultiple(5.67)).toBe('5.7x');
    expect(formatMultiple(5.67, 2)).toBe('5.67x');
  });
});