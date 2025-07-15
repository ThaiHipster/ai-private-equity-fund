import type { Brand, DateString, EmailAddress, PhoneNumber } from './common';

export type UserId = Brand<string, 'UserId'>;

export type FundId = Brand<string, 'FundId'>;

export type UserRole = 
  | 'managing_director'
  | 'partner'
  | 'principal'
  | 'vice_president'
  | 'associate'
  | 'analyst'
  | 'operations'
  | 'compliance'
  | 'investor_relations'
  | 'admin';

export type AccessLevel = 
  | 'read_only'
  | 'standard'
  | 'elevated'
  | 'admin'
  | 'super_admin';

export type User = {
  id: UserId;
  email: EmailAddress;
  firstName: string;
  lastName: string;
  role: UserRole;
  accessLevel: AccessLevel;
  fundId: FundId;
  department: string;
  phoneNumber?: PhoneNumber;
  profileImageUrl?: string;
  isActive: boolean;
  lastLoginAt?: DateString;
  createdAt: DateString;
  updatedAt: DateString;
};

export type FundType = 
  | 'buyout'
  | 'growth_equity'
  | 'venture_capital'
  | 'distressed'
  | 'real_estate'
  | 'infrastructure'
  | 'fund_of_funds';

export type FundStatus = 
  | 'fundraising'
  | 'investing'
  | 'harvesting'
  | 'liquidated'
  | 'closed';

export type Fund = {
  id: FundId;
  name: string;
  fundNumber: number;
  type: FundType;
  status: FundStatus;
  vintage: number;
  targetSize: number;
  commitments: number;
  invested: number;
  realized: number;
  unrealized: number;
  managementFeeRate: number;
  carriedInterestRate: number;
  fundingDate: DateString;
  finalCloseDate?: DateString;
  liquidationDate?: DateString;
  generalPartner: string;
  limitedPartners: string[];
  investmentPeriodYears: number;
  fundLifeYears: number;
  description: string;
  createdAt: DateString;
  updatedAt: DateString;
};

export type Permission = 
  | 'deals.read'
  | 'deals.write'
  | 'deals.delete'
  | 'portfolio.read'
  | 'portfolio.write'
  | 'portfolio.delete'
  | 'users.read'
  | 'users.write'
  | 'users.delete'
  | 'reports.read'
  | 'reports.write'
  | 'settings.read'
  | 'settings.write'
  | 'admin.access';

export type UserSession = {
  id: Brand<string, 'SessionId'>;
  userId: UserId;
  token: string;
  expiresAt: DateString;
  createdAt: DateString;
  lastUsedAt: DateString;
  ipAddress: string;
  userAgent: string;
};

export type AuditLog = {
  id: Brand<string, 'AuditLogId'>;
  userId: UserId;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  timestamp: DateString;
};