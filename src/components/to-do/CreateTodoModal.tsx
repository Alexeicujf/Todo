import { useState } from "react";
import { createTodoAsynс, updateTodoAsync } from "@/store/slices/TodosSlice";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@/ui/Modal";
import { AppDispatch, RootState } from "@/store";

export interface CreateTodoModalProps {
  listId?: string | number;
  isOpen: boolean;
  onClose: () => void;
  todo?: { id: number; title: string; description: string };
}

interface ListSliceState {
  activeListId?: string | number;
  lists?: Array<{ id: string | number }>;
}

export const CreateTodoModal = ({
  listId,
  isOpen,
  onClose,
  todo,
}: CreateTodoModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const detectedListId = useSelector((state: RootState) => {
    if (listId && !isNaN(Number(listId)) && Number(listId) !== 0) {
      return Number(listId);
    }

    const listState = (state as unknown as { list: ListSliceState }).list;

    if (listState?.activeListId && !isNaN(Number(listState.activeListId))) {
      return Number(listState.activeListId);
    }

    if (listState?.lists && listState.lists.length > 0) {
      const firstList = listState.lists[0];
      if (firstList && firstList.id) return Number(firstList.id);
    }

    return 0;
  });

  const [title, setTitle] = useState(todo ? todo.title : "");
  const [description, setDescription] = useState(todo ? todo.description : "");

  const handleSaveTodo = () => {
    if (todo) {
      dispatch(
        updateTodoAsync({
          todoId: todo.id,
          title: title.trim(),
          description: description.trim(),
        })
      )
        .unwrap()
        .then(() => {
          onClose();
        });
      return;
    }
    if (!detectedListId) {
      alert("Ошибка: Не удалось определить ID списка для этой задачи.");
      return;
    }

    dispatch(
      createTodoAsynс({
        title: title.trim(),
        description: description.trim(),
        list: detectedListId,
      })
    )
      .unwrap()
      .then(() => {
        onClose();
      });
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleSaveTodo();
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-1">
          <input
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 transition-colors outline-none focus:border-blue-500 dark:border-gray-800 dark:bg-[#242424] dark:text-white dark:focus:border-blue-500"
            type="text"
            placeholder="Создать задачу"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="h-32 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 transition-colors outline-none focus:border-blue-500 dark:border-gray-800 dark:bg-[#242424] dark:text-white dark:focus:border-blue-500"
            placeholder="Описание задачи"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            Сохранить
          </button>
        </form>
      </Modal>
    </div>
  );
};
