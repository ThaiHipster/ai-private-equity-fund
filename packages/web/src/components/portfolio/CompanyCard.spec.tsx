import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { PortfolioCompany } from '@ai-pe-fund/shared';
import { CompanyCard } from './CompanyCard';

const mockCompany: PortfolioCompany = {
  id: 'pc-1' as any,
  dealId: 'deal-1' as any,
  companyName: 'TechCorp Solutions',
  status: 'active',
  sector: 'Technology',
  geography: 'North America',
  investmentDate: '2022-03-15' as any,
  initialInvestment: 25000000 as any,
  totalInvested: 30000000 as any,
  ownershipPercentage: 0.35 as any,
  currentValuation: 75000000 as any,
  lastValuationDate: '2024-06-30' as any,
  leadPartner: 'sarah.johnson@aipefund.com' as any,
  boardRepresentatives: ['sarah.johnson@aipefund.com' as any],
  createdAt: '2022-03-15' as any,
  updatedAt: '2024-07-01' as any,
};

describe('CompanyCard', () => {
  test('displays company name and sector', () => {
    render(<CompanyCard company={mockCompany} />);
    
    expect(screen.getByText('TechCorp Solutions')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
  });

  test('displays financial metrics correctly', () => {
    render(<CompanyCard company={mockCompany} />);
    
    expect(screen.getByText('$30,000,000')).toBeInTheDocument();
    expect(screen.getByText('$75,000,000')).toBeInTheDocument();
    expect(screen.getByText('2.50x')).toBeInTheDocument();
  });

  test('displays ownership percentage', () => {
    render(<CompanyCard company={mockCompany} />);
    
    expect(screen.getByText('35.0%')).toBeInTheDocument();
  });

  test('displays active status with correct styling', () => {
    render(<CompanyCard company={mockCompany} />);
    
    const statusElement = screen.getByText('active');
    expect(statusElement).toHaveClass('bg-green-100', 'text-green-800');
  });

  test('displays investment date and geography', () => {
    render(<CompanyCard company={mockCompany} />);
    
    expect(screen.getByText('Invested Mar 2022')).toBeInTheDocument();
    expect(screen.getByText('North America')).toBeInTheDocument();
  });
});