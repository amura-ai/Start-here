import apiClient from './client';
import { IGetServicesByUserResponse } from './types';

export const getServicesByUser = async (userId: string): Promise<IGetServicesByUserResponse> => {
  // Send a flat body — the route-level ApiCommons.authorize wraps it into req.body.payLoad.
  // Path is in SSM PUBLIC_APIS_WITHOUT_ENCRYPTION so the global authorize is skipped
  // (otherwise the body gets wrapped twice and the handler sees userId as undefined).
  // Also bypass client-side encryption since the BE will not decrypt this path.
  const response = await apiClient.post(
    '/getServicesByUser',
    { userId },
    { skipEncryption: true },
  );
  return response.data;
};
