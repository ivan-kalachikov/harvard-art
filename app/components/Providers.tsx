'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as ReactReduxProvider } from 'react-redux';
import store from '../store';

const queryClient: QueryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div className='teeeest'>
      <ReactReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ReactReduxProvider>
    </div>
  );
}
