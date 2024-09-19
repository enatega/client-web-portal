import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

export default function DeleteDialog({
  onConfirm,
  onHide,
}: {
  visible: boolean;
  onConfirm: () => void;
  onHide: () => void;
}) {
  const accept = () => {};

  const reject = () => {
    onHide();
  };

  confirmDialog({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    defaultFocus: 'accept',
    accept,
    reject,
  });

  return (
    <>
      {/* {visible && <ConfirmDialog />} */}
      <div className="card flex flex-wrap gap-2 justify-content-center">
        <Button
          onClick={onConfirm}
          icon="pi pi-check"
          label="Confirm"
          className="mr-2"
        ></Button>
      </div>
    </>
  );
}
