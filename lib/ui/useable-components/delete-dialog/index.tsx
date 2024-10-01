// Prime React
import { Dialog } from 'primereact/dialog';

// Components
import CustomButton from '../button';

// Interface and Types
import { IDeleteDialogProps } from '@/lib/utils/interfaces/dialog.interface';

const DeleteDialog = ({
  visible,
  onHide,
  onConfirm,
  message,
  loading,
}: IDeleteDialogProps) => {
  const footer = (
    <div className="space-x-2">
      <CustomButton
        label="No"
        icon="pi pi-times"
        onClick={onHide}
        className="h-9 rounded border border-gray-300 px-5 text-black"
      />
      <CustomButton
        loading={loading}
        label="Confirm"
        className="h-9 rounded border-gray-300 bg-red-500 px-4 text-white"
        icon="pi pi-check"
        onClick={onConfirm}
      />
    </div>
  );

  return (
    <Dialog
      visible={visible}
      style={{ width: '32rem' }}
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      header="Confirm Deletion"
      modal
      footer={footer}
      onHide={onHide}
    >
      <div className="confirmation-content">
        <span>{message || 'Are you sure you want to delete this item?'}</span>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
