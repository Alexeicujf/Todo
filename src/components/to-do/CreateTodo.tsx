import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setModalOpen } from "@/store/slices/TodosSlice";
import { CreateTodoModal } from "@/components/to-do/CreateTodoModal";
import { RootState } from "@/store";
import { Input } from "@/components/ui/Input";

interface CreateTodoProps {
  listId?: string;
}

export function CreateTodo({ listId: propListId }: CreateTodoProps) {
  const dispatch = useDispatch();
  const { listId: urlListId } = useParams();

  const finalListId = urlListId || propListId;

  const isOpen = useSelector(
    (state: RootState) => !!state.todos?.isCreateModalOpen
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
        readOnly
        onClick={handleOpenModal}
        type="text"
        placeholder="Создать задачу"
        className="cursor-pointer"
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
