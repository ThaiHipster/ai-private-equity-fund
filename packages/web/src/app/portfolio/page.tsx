import type { PortfolioCompany } from '@ai-pe-fund/shared';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { PortfolioSummary } from '@/components/portfolio/PortfolioSummary';

// Mock data for development
const mockPortfolioCompanies: PortfolioCompany[] = [
  {
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
  },
  {
    id: 'pc-2' as any,
    dealId: 'deal-2' as any,
    companyName: 'GreenEnergy Innovations',
    status: 'active',
    sector: 'Clean Energy',
    geography: 'Europe',
    investmentDate: '2023-01-20' as any,
    initialInvestment: 40000000 as any,
    totalInvested: 45000000 as any,
    ownershipPercentage: 0.42 as any,
    currentValuation: 95000000 as any,
    lastValuationDate: '2024-06-30' as any,
    leadPartner: 'michael.chen@aipefund.com' as any,
    boardRepresentatives: ['michael.chen@aipefund.com' as any],
    createdAt: '2023-01-20' as any,
    updatedAt: '2024-07-01' as any,
  },
  {
    id: 'pc-3' as any,
    dealId: 'deal-3' as any,
    companyName: 'HealthTech Dynamics',
    status: 'under_review',
    sector: 'Healthcare',
    geography: 'North America',
    investmentDate: '2021-11-10' as any,
    initialInvestment: 15000000 as any,
    totalInvested: 22000000 as any,
    ownershipPercentage: 0.28 as any,
    currentValuation: 38000000 as any,
    lastValuationDate: '2024-06-30' as any,
    leadPartner: 'david.wilson@aipefund.com' as any,
    boardRepresentatives: ['david.wilson@aipefund.com' as any],
    createdAt: '2021-11-10' as any,
    updatedAt: '2024-07-01' as any,
  },
];

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio Management</h1>
        <button className="btn-primary">
          Add Company
        </button>
      </div>
      
      <PortfolioSummary companies={mockPortfolioCompanies} />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Portfolio Companies</h2>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-md">
              <option>All Sectors</option>
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Clean Energy</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md">
              <option>All Status</option>
              <option>Active</option>
              <option>Under Review</option>
              <option>Exiting</option>
            </select>
          </div>
        </div>
        
        <PortfolioGrid companies={mockPortfolioCompanies} />
      </div>
    </div>
  );
}