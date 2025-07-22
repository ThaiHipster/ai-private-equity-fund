'use client';

import type { PortfolioCompany } from '@ai-pe-fund/shared';
import { calculateMOIC, formatCurrency } from '@ai-pe-fund/shared';
import { format } from 'date-fns';

type CompanyCardProps = {
  company: PortfolioCompany;
};

const getStatusColor = (status: PortfolioCompany['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'under_review':
      return 'bg-yellow-100 text-yellow-800';
    case 'exiting':
      return 'bg-blue-100 text-blue-800';
    case 'exited':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function CompanyCard({ company }: CompanyCardProps) {
  const moic = calculateMOIC(company.currentValuation as any, company.totalInvested as any);
  const investmentDate = format(new Date(company.investmentDate), 'MMM yyyy');
  
  return (
    <div className="card p-6 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {company.companyName}
          </h3>
          <p className="text-sm text-gray-600">{company.sector}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(company.status)}`}>
          {company.status.replace('_', ' ')}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Investment</span>
          <span className="text-sm font-medium">
            {formatCurrency(company.totalInvested as any)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Current Value</span>
          <span className="text-sm font-medium">
            {formatCurrency(company.currentValuation as any)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">MOIC</span>
          <span className="text-sm font-medium text-green-600">
            {moic.toFixed(2)}x
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Ownership</span>
          <span className="text-sm font-medium">
            {(company.ownershipPercentage * 100).toFixed(1)}%
          </span>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">Invested {investmentDate}</span>
          <span className="text-xs text-gray-500">{company.geography}</span>
        </div>
      </div>
    </div>
  );
}