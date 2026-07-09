import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setModalOpen } from "@/store/slices/TodosSlice";
import { CreateTodoModal } from "@/components/to-do/CreateTodoModal";
import { RootState } from "@/store";

interface CreateTodoProps {
  listId?: string;
}

interface TodoSliceState {
  isCreateModalOpen?: boolean;
}

export function CreateTodo({ listId: propListId }: CreateTodoProps) {
  const dispatch = useDispatch();
  const { listId: urlListId } = useParams();

  const finalListId = urlListId || propListId;

  const isOpen = useSelector((state: RootState) => {
    const todoState = (state as unknown as { todos: TodoSliceState }).todos;
    return !!todoState?.isCreateModalOpen;
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
        readOnly
        onClick={handleOpenModal}
        type="text"
        placeholder="Создать задачу"
        className="w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors outline-none hover:border-gray-300 dark:border-gray-800 dark:bg-[#242424] dark:text-white dark:placeholder-gray-500 dark:hover:border-gray-700"
      />
      <CreateTodoModal
        listId={finalListId}
        isOpen={isOpen}
        onClose={handleCloseModal}
        key={isOpen ? "open" : "close"}
      />
    </>
  );
}
