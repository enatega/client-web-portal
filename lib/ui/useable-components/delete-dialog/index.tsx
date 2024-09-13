// Prime React
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

// Interface and Types
import { IDeleteDialogProps } from '@/lib/utils/interfaces/dialog.interface';

const DeleteDialog = ({
  visible,
  onHide,
  onConfirm,
  message,
}: IDeleteDialogProps) => {
  const footer = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={onHide}
        className="p-button-text"
      />
      <Button label="Yes" icon="pi pi-check" onClick={onConfirm} autoFocus />
    </div>
  );

  return (
    <Dialog
      visible={visible}
      style={{ width: '32rem' }}
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      header="Confirm"
      modal
      footer={footer}
      onHide={onHide}
    >
      <div className="confirmation-content">
        <i
          className="pi pi-exclamation-triangle mr-3"
          style={{ fontSize: '2rem' }}
        />
        <span>{message || 'Are you sure you want to delete this item?'}</span>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;