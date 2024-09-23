import { Skeleton } from 'primereact/skeleton';

const TableSkeleton = () => {
  return (
    <div className="w-full space-y-3">
      <Skeleton width="20%" height="2.75rem" />
      <Skeleton width="100%" height="18.97rem" />
    </div>
  );
};

export default TableSkeleton;
