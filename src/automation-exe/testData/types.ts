/**
 * TypeScript interfaces for test data objects
 * Provides type safety and documentation for test data structures
 */

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserProfile extends IUserCredentials {
  username: string;
}

export interface IRegistrationAccountInfo {
  username: string;
  password: string;
  day: string;
  month: string;
  year: string;
}

export interface IRegistrationAddressInfo {
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2?: string;
  state: string;
  city: string;
  zipcode: string;
  country: string;
  mobileNumber: string;
}

export interface IRegistrationProfile {
  accountInfo: IRegistrationAccountInfo;
  addressInfo: IRegistrationAddressInfo;
}
