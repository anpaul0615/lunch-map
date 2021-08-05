export type StoreState = {
  stores: Array<Store>;
  registration: StoreRegistration;
};

export type Store = {
  id: string;
  name: string;
  description: string;
  locationWKT: string;
};

export type EditableStoreProperties = Omit<Store, 'id'>;

export type StoreRegistration = {
  isOpen: boolean;
  input: EditableStoreProperties;
};
