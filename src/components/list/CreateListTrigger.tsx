import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "@/store/slices/ListsSlice";
import { CreateListModal } from "@/components/list/CreateListModal";
import { RootState } from "@/store";

interface ListSliceState {
  isCreateModalOpen?: boolean;
}

export const CreateListTrigger = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => {
    const listState = (state as unknown as { list: ListSliceState }).list;
    return !!listState?.isCreateModalOpen;
  });

  const handleOpenModal = () => {
    dispatch(setModalOpen(true));
  };

  const handleCloseModal = () => {
    dispatch(setModalOpen(false));
  };

  return (
    <>
      <input
        type="text"
        placeholder="Создать лист"
        className="w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors outline-none hover:border-gray-300 dark:border-gray-800 dark:bg-[#242424] dark:text-white dark:placeholder-gray-500 dark:hover:border-gray-700"
        readOnly
        onClick={handleOpenModal}
      />
      <CreateListModal isOpen={isOpen} onClose={handleCloseModal} />
    </>
  );
};
