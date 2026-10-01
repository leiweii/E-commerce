export interface CustomerPreferences {
  newsletter: boolean;
  promotionalOffers: boolean;
  deliverySms: boolean;
}

export interface CustomerProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    complement: string;
    postalCode: string;
    city: string;
  };
  preferences: CustomerPreferences;
}

export const DEFAULT_CUSTOMER_PROFILE: CustomerProfile = {
  firstName: 'Élodie',
  lastName: 'Bernard',
  email: 'elodie.bernard@example.fr',
  phone: '06 12 34 56 78',
  address: { street: '18 rue des Maraîchers', complement: '', postalCode: '44000', city: 'Nantes' },
  preferences: { newsletter: true, promotionalOffers: true, deliverySms: true },
};
