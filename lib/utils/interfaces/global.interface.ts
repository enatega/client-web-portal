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
