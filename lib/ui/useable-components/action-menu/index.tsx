// Core
import { useRef, useState } from 'react';

// Prime React
import { Menu } from 'primereact/menu';
import { MenuItemCommandEvent } from 'primereact/menuitem';

// Font Awesome
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Interface and Types
import {
  IActionMenuItem,
  IActionMenuProps,
} from '@/lib/utils/interfaces/action-menu.interface';

// Components
import DeleteDialog from '../delete-dialog';

const ActionMenu = ({ items, itemId }: IActionMenuProps) => {
  //Hooks
  const [deleteProductDialogVisible, setDeleteProductDialogVisible] =
    useState(false);
  const [itemToDelete, setItemToDelete] = useState<IActionMenuItem | null>(
    null
  );
  const menu = useRef<Menu>(null);

  const handleItemClick = (
    event: MenuItemCommandEvent,
    item: IActionMenuItem
  ) => {
    if (item.label === 'Delete') {
      setItemToDelete(item);
      setDeleteProductDialogVisible(true);
    } else {
      item.command?.(event);
    }
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      console.log('Deleting item with ID:', itemId); // Print the ID
      itemToDelete.command?.({} as MenuItemCommandEvent);
      setDeleteProductDialogVisible(false);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteProductDialogVisible(false);
    setItemToDelete(null);
  };

  return (
    <div>
      <Menu
        model={items.map((item) => ({
          label: item.label,
          command: (event: MenuItemCommandEvent) =>
            handleItemClick(event, item),
        }))}
        popup
        ref={menu}
        id="popup_menu"
      />
      <button
        aria-controls="popup_menu"
        aria-haspopup="true"
        onClick={(event) => {
          event.stopPropagation();
          menu.current?.toggle(event);
        }}
        className="w-full h-full"
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </button>

      {/* Use the generic DeleteDialog component */}
      <DeleteDialog
        visible={deleteProductDialogVisible}
        onHide={cancelDelete}
        onConfirm={confirmDelete}
        // message="Are you sure you want to delete this item?"
      />
    </div>
  );
};

export default ActionMenu;
