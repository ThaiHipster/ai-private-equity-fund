'use client';

import type { PortfolioCompany } from '@ai-pe-fund/shared';
import { CompanyCard } from './CompanyCard';

type PortfolioGridProps = {
  companies: PortfolioCompany[];
};

export function PortfolioGrid({ companies }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
}