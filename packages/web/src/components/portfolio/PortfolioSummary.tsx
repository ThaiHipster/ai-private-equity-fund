import type { PortfolioCompany } from '@ai-pe-fund/shared';
import { calculateMOIC, formatCurrency } from '@ai-pe-fund/shared';

type PortfolioSummaryProps = {
  companies: PortfolioCompany[];
};

export function PortfolioSummary({ companies }: PortfolioSummaryProps) {
  const totalInvested = companies.reduce(
    (sum, company) => sum + company.totalInvested,
    0
  );
  
  const totalCurrentValue = companies.reduce(
    (sum, company) => sum + company.currentValuation,
    0
  );
  
  const totalMOIC = calculateMOIC(totalCurrentValue as any, totalInvested as any);
  
  const activeCompanies = companies.filter(c => c.status === 'active').length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="card p-6">
        <div className="flex items-center">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Invested</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalInvested as any)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="card p-6">
        <div className="flex items-center">
          <div>
            <p className="text-sm font-medium text-gray-600">Current Value</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalCurrentValue as any)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="card p-6">
        <div className="flex items-center">
          <div>
            <p className="text-sm font-medium text-gray-600">Total MOIC</p>
            <p className="text-2xl font-bold text-green-600">
              {totalMOIC.toFixed(2)}x
            </p>
          </div>
        </div>
      </div>
      
      <div className="card p-6">
        <div className="flex items-center">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Companies</p>
            <p className="text-2xl font-bold text-gray-900">
              {activeCompanies}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}