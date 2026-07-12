import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "@/store/slices/ListsSlice";
import { CreateListModal } from "@/components/list/CreateListModal";
import { RootState } from "@/store";
import { Input } from "@/components/ui/Input";

export const CreateListTrigger = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector(
    (state: RootState) => !!state.list?.isCreateModalOpen
  );

  const handleOpenModal = () => {
    dispatch(setModalOpen(true));
  };

  const handleCloseModal = () => {
    dispatch(setModalOpen(false));
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Создать лист"
        className="cursor-pointer"
        readOnly
        onClick={handleOpenModal}
      />
      <CreateListModal isOpen={isOpen} onClose={handleCloseModal} />
    </>
  );
};
