import client from './client';
import routes from './routes';
import { GetObjectsParams, ObjectsResponse } from './types/object';

const getObjects = async ({ params }: { params: GetObjectsParams }) => {
  return client
    .get<ObjectsResponse>(routes.object, { params })
    .then((response) => response.data);
};

const getFilter = async (
  routeName: key of,
  { params }: { params: GetObjectsParams },
) => {
  return client
    .get<ObjectsResponse>(routes[routeName], { params })
    .then((response) => response.data);
};

export { getObjects };
