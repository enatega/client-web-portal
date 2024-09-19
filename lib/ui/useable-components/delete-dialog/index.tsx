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
        className="border text-black px-5 h-9 border-gray-300 rounded"
      />
      <CustomButton
        loading={loading}
        label="Confirm"
        className="bg-red-500 px-4 h-9 text-white border-gray-300 rounded"
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
