export type User = {
  id: number;
  name: string;
  email: string;
  country: string | undefined | null;
  provinceState: string | undefined | null;
  city: string | undefined | null;
};
