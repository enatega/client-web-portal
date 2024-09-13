export interface IGlobalProps {
  children?: React.ReactNode;
}

export interface IGlobalComponentProps extends IGlobalProps {
  className?: string;
}

export interface IDropdownSelectItem {
  label: string;
  code: string;
}

export interface IQueryResult<T, V> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  fetch: (variables?: V) => void; // for useLazyQuery
  isError: boolean;
  isSuccess: boolean;
}
