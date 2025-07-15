declare const __brand: unique symbol;

export type Brand<T, B> = T & { readonly [__brand]: B };

export type Currency = 'USD' | 'EUR' | 'GBP';

export type DateString = Brand<string, 'DateString'>;

export type Percentage = Brand<number, 'Percentage'>;

export type MoneyAmount = Brand<number, 'MoneyAmount'>;

export type EmailAddress = Brand<string, 'EmailAddress'>;

export type PhoneNumber = Brand<string, 'PhoneNumber'>;

export const createDateString = (date: Date): DateString => 
  date.toISOString().split('T')[0] as DateString;

export const createPercentage = (value: number): Percentage => 
  value as Percentage;

export const createMoneyAmount = (value: number): MoneyAmount => 
  value as MoneyAmount;

export const createEmailAddress = (email: string): EmailAddress => 
  email as EmailAddress;

export const createPhoneNumber = (phone: string): PhoneNumber => 
  phone as PhoneNumber;

export type SortDirection = 'asc' | 'desc';

export type PaginationParams = {
  page: number;
  limit: number;
  sortBy?: string;
  sortDirection?: SortDirection;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};