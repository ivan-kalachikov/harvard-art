import { FiltersKeys } from '@/types/filter';
type ExtendedRoutes = FiltersKeys | 'object' | 'objectDetails';

export type Routes = {
  [K in ExtendedRoutes]: string;
};
