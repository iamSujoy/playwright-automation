/**
 * User test data for login scenarios
 * Contains credentials for valid logins and invalid attempt scenarios
 */

import { IUserCredentials, IUserProfile } from './types';

export const VALID_LOGIN_USER: IUserProfile = {
  email: 'testuser123987@example.com',
  password: 'Password123',
  username: 'TestUser'
};

export const INVALID_EMAIL_LOGIN: IUserCredentials = {
  email: 'non_existance98766123987@example.com',
  password: 'Password123'
};

export const INVALID_PASSWORD_LOGIN: IUserCredentials = {
  email: 'testuser123987@example.com',
  password: 'Password124'
};
