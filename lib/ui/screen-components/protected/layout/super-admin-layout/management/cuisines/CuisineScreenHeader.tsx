import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { ICuisineScreenHeaderProps } from '@/lib/utils/interfaces/cuisine.interface';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { Sidebar } from 'primereact/sidebar';
import CuisineForm from './CuisineForm';

export default function CuisineScreenHeader({
  setVisible,
  setCuisines,
  cuisines,
  handleAddCuisineLocally,
  visible,
  setIsEditing,
  isEditing,
  handleButtonClick,
}: ICuisineScreenHeaderProps) {
  return (
    <div>
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
      >
        <CuisineForm
          setVisible={setVisible}
          setCuisines={setCuisines}
          addCuisineLocally={handleAddCuisineLocally}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          cuisines={cuisines}
        />
      </Sidebar>
      <div className="flex justify-between items-center p-2 w-full">
        <HeaderText text="Cuisines" />
        <TextIconClickable
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          onClick={handleButtonClick}
          title="Add Cuisine"
          className="sm:w-auto bg-black text-white border-gray-300 rounded"
        />
      </div>
    </div>
  );
}
