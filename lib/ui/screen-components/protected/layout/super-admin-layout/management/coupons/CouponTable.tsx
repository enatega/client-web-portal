// import {
//   ICoupon,
//   IGetCouponsData,
// } from '@/lib/utils/interfaces/coupons.interface';
// import { useEffect, useState } from 'react';
// import GenericTable from './GenericDynamicTable';
// export default function CouponTable({ data }: { data: IGetCouponsData }) {
//   const columns = [
//     {
//       header: 'Name',
//       field: 'name',
//     },
//     {
//       header: 'Code',
//       field: 'code',
//     },
//     {
//       header: 'Discount',
//       field: 'discount',
//     },
//     {
//       header: 'Status',
//       field: 'status',
//     },
//   ];
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortedData, setSortedData] = useState<ICoupon[]>([]);
//   const [selectedData, setSelectedData] = useState<ICoupon[]>([]);
//   const [isAllDataSelected, setIsAllDataSelected] = useState<number>(0);

//   function selectAll(): void {
//     setSelectedData(data.coupons);
//     setIsAllDataSelected(1);
//   }
//   useEffect(() => {
//     const filteredData = data?.coupons?.filter(
//       (coupon) =>
//         coupon.__typename.toString().toLowerCase().includes(searchQuery) ||
//         coupon._id.toString().toLowerCase().includes(searchQuery) ||
//         coupon.discount.toString().toLowerCase().includes(searchQuery) ||
//         coupon.enabled.toString().toLowerCase().includes(searchQuery) ||
//         coupon.title.toString().toLowerCase().includes(searchQuery)
//     );
//     setSortedData(filteredData);
//   }, [searchQuery]);

//   const couponColumns = [
//     {
//       field: 'name',
//       header: 'Name',
//     },
//     {
//       field: 'code',
//       header: 'Code',
//     },
//     {
//       field: 'discount',
//       header: 'Discount',
//     },
//     {
//       field: 'status',
//       header: 'Status',
//       body: () => {},
//     },
//     {
//       field: 'action',
//       header: 'Action',
//       body: () => {},
//     },
//   ];
//   return (
//     // <table className="flex flex-col mx-auto w-[95%] gap-1 my-1">
//     //   <InputText
//     //     value={searchQuery}
//     //     onChange={(e) => setSearchQuery(e.target.value)}
//     //     className="w-72 p-3 rounded-md m-2"
//     //     placeholder="Filter tasks..."
//     //   />
//     //   <thead>
//     //     <tr className="flex w-full justify-between items-center text-start bg-gray-100 rounded-md p-3 text-gray-600">
//     //       <td>
//     //         <input
//     //           type="checkbox"
//     //           name="selectAll"
//     //           className="mr-3"
//     //           value={isAllDataSelected}
//     //           onClick={selectAll}
//     //         />
//     //         Name
//     //       </td>
//     //       <td>Code</td>
//     //       <td>Discount</td>
//     //       <td>Status</td>
//     //     </tr>
//     //   </thead>
//     //   <tbody>
//     //     {!searchQuery
//     //       ? data?.coupons.map((coupon: ICoupon) => {
//     //           return (
//     //             <CouponStack
//     //               coupon={coupon}
//     //               key={coupon?._id}
//     //               setSelectedData={setSelectedData}
//     //               selectedData={selectedData}
//     //             />
//     //           );
//     //         })
//     //       : sortedData.map((coupon: ICoupon) => {
//     //           return (
//     //             <CouponStack
//     //               coupon={coupon}
//     //               key={coupon?._id}
//     //               setSelectedData={setSelectedData}
//     //               selectedData={selectedData}
//     //             />
//     //           );
//     //         })}
//     //   </tbody>
//     // </table>
//     <GenericTable
//       columns={couponColumns}
//       data={data.coupons}
//       onSelectionChange={(e) => setSelectedData(e.values)}
//       selection={selectedData}
//     />
//   );
// }
import { ITableColumn } from '@/lib/utils/interfaces';
import {
  ICoupon,
  IGetCouponsData,
} from '@/lib/utils/interfaces/coupons.interface';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import GenericTable from './GenericDynamicTable';

export default function CouponTable({
  data,
  loading,
}: {
  data: IGetCouponsData | undefined;
  loading: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedData, setSortedData] = useState<ICoupon[]>([]);
  const [selectedData, setSelectedData] = useState<ICoupon[]>([]);

  const columns: ITableColumn<ICoupon>[] = [
    {
      header: 'Name',
      field: '__typename',
    },
    {
      header: 'Code',
      field: 'title',
    },
    {
      header: 'Discount',
      field: 'discount',
    },
    {
      header: 'Status',
      field: 'enabled',
      body: (rowData: ICoupon) => (
        <span>{rowData.enabled ? 'Active' : 'Inactive'}</span>
      ),
    },
    {
      header: 'Action',
      field: 'action',
      body: (rowData: ICoupon) => (
        <button onClick={() => console.log(rowData)}>Action</button>
      ),
    },
  ];

  useEffect(() => {
    const filteredData = data?.coupons?.filter((coupon) =>
      Object.values(coupon).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setSortedData(filteredData || []);
  }, [searchQuery, data]);
  return (
    <div className="flex flex-col gap-2 p-3 w-full">
      <InputText
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-72 p-3 rounded-md m-2 outline active:outline-green-700 self-start"
        placeholder="Filter tasks..."
      />
      <GenericTable
        columns={columns}
        data={sortedData}
        onSelectionChange={(e) => setSelectedData(e as ICoupon[])}
        selection={selectedData}
        loading={loading}
      />
    </div>
  );
}
