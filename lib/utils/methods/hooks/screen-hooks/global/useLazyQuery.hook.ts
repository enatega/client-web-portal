import {
  DocumentNode,
  LazyQueryHookOptions,
  LazyQueryResultTuple,
  OperationVariables,
  useLazyQuery,
} from '@apollo/client';

export const useLazyQueryGlobal = <
  TData,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode,
  lazyQueryHookOptions: LazyQueryHookOptions<TData, TVariables>
) => {
  const [executeLazyQuery, { data, loading }]: LazyQueryResultTuple<
    TData,
    TVariables
  > = useLazyQuery<TData, TVariables>(query, lazyQueryHookOptions);

  return {
    executeLazyQuery,
    data,
    loading,
  };
};
