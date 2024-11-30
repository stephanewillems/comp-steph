import { SerializedError } from '@reduxjs/toolkit';

type Preference = {
  mapStyle: string;
};

export type User = {
  access: string[];
  categories: string[];
  demo: boolean;
  error: SerializedError | null;
  name: string;
  pnumber: string;
  status: string;
  zone: string;
  preference: Preference;
};
