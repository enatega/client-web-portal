import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  useQuery,
} from '@apollo/client';
import { WatchQueryFetchPolicy } from '@apollo/client/core/watchQueryOptions';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import { retryQuery } from '../utils/methods';

export const useQueryGQL = <
  T extends DocumentNode,
  V extends OperationVariables | QueryHookOptions,
>(
  query: DocumentNode,
  variables: V,
  options: {
    enabled?: boolean;
    debounceMs?: number;
    pollInterval?: number;
    fetchPolicy?: WatchQueryFetchPolicy;
    retry?: number;
    retryDelayMs?: number;
    onCompleted?: (data: NoInfer<T>) => void;
  } = {}
) => {
  const {
    enabled = true,
    debounceMs = 500,
    pollInterval,
    fetchPolicy,
    retry = 3,
    retryDelayMs = 1000,
    onCompleted,
  } = options;
  const { data, error, loading, refetch } = useQuery<T, V>(query, {
    variables,
    skip: !enabled,
    fetchPolicy,
    pollInterval,
    onCompleted,
  });

  const debouncedRefetch = useCallback(
    debounce(async (variables?: Partial<V>) => {
      return await retryQuery(() => refetch(variables), retry, retryDelayMs);
    }, debounceMs),
    [refetch, debounceMs, retry, retryDelayMs]
  );

  const handleRefetch = async () => {
    if (enabled) {
      await debouncedRefetch(); // Ensure the async debounced fetch is awaited
    }
  };

  return {
    data,
    error,
    loading,
    refetch: handleRefetch,
    isLoading: loading,
    isError: !!error,
    isSuccess: !!data,
  };
};
