import { FiltersKeys } from '@/types/filter';
type ExtendedRoutes = FiltersKeys | 'object';

export type Routes = {
  [K in ExtendedRoutes]: string;
};
