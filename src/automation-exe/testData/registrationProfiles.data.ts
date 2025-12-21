import { faker } from '@faker-js/faker';
import { IRegistrationProfile } from './types';

export function generateRegistrationProfile(): IRegistrationProfile {

  const allowedCountries = [
    'India',
    'United States',
    'Canada',
    'Australia',
    'Israel',
    'New Zealand',
    'Singapore'
  ] as const;

  const country = faker.helpers.arrayElement(allowedCountries);

  return {
    accountInfo: {
      username: faker.internet.username(),
      password: faker.internet.password({
        length: 12,
        memorable: false,
        pattern: /[A-Za-z0-9]/,
        prefix: 'P@'
      }),
      day: faker.number.int({ min: 1, max: 28 }).toString(),
      month: faker.date.month(),
      year: faker.number.int({ min: 1970, max: 2005 }).toString()
    },
    addressInfo: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: faker.company.name(),
      address: faker.location.streetAddress(),
      address2: faker.helpers.maybe(() => faker.location.secondaryAddress()) ?? '',
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      country,
      mobileNumber: faker.phone.number({ style: 'national' })
    }
  };
}
