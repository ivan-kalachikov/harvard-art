import client from '@/api/client';
import routes from '@/api/routes';
import { GetObjectsParams, ObjectsResponse } from '@/types/object';
import { GetFiltersParams, FiltersKeys, FiltersResponse } from '@/types/filter';

const getObjects = async ({ params }: { params: GetObjectsParams }) => {
  return client
    .get<ObjectsResponse>(routes.object, { params })
    .then((response) => response.data);
};

const getFilter = async (
  routeName: FiltersKeys,
  { params }: { params: GetFiltersParams },
) => {
  return client
    .get<FiltersResponse>(routes[routeName], { params })
    .then((response) => response.data);
};

export { getFilter, getObjects };
