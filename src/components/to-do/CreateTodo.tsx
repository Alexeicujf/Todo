import { useDispatch } from 'react-redux';
import { setModalOpen, useOpenModal } from "@/store/slices/TodosSlice";
import { CreateTodoModal } from "@/components/to-do/CreateTodoModal";

interface CreateTodoProps {
  listId?: string;
}

export function CreateTodo ({listId}: CreateTodoProps) {
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    dispatch(setModalOpen(true))
  }
  const handleCloseModal = () => {
    dispatch(setModalOpen(false))
  }
  const isOpen = useOpenModal();
  return (
    <>
            <input readOnly onClick={handleOpenModal} type="text" placeholder="Создать задачу" className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-800 rounded-lg cursor-pointer outline-none hover:border-gray-300 dark:hover:border-gray-700 transition-colors placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white" />
            <CreateTodoModal listId={listId} isOpen={isOpen} onClose={handleCloseModal} />
    </>
  )    
} 

