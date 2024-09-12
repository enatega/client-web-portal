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
  try {
    const [executeLazyQuery, { data, loading }]: LazyQueryResultTuple<
      TData,
      TVariables
    > = useLazyQuery<TData, TVariables>(query, lazyQueryHookOptions);
    console.log({ executeLazyQuery, data, loading });
    return {
      executeLazyQuery,
      data,
      loading,
    };
  } catch (error) {
    console.log(error);
    return {
      executeLazyQuery: () => {},
      data: undefined,
      loading: false,
    };
  }
};
