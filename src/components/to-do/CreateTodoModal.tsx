import { useState } from "react";
import { createTodoAsynс, updateTodoAsync } from "@/store/slices/TodosSlice";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { AppDispatch, RootState } from "@/store";

export interface CreateTodoModalProps {
  listId?: string | number;
  isOpen: boolean;
  onClose: () => void;
  todo?: { id: number; title: string; description: string };
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

    const listState = state.list;

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

  const handleClose = () => {
    setTitle(todo ? todo.title : "");
    setDescription(todo ? todo.description : "");
    onClose();
  };

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
          handleClose();
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
        setTitle("");
        setDescription("");
        onClose();
      });
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleSaveTodo();
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-1">
          <Input
            type="text"
            placeholder="Создать задачу"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Описание задачи"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-32 resize-none"
          />
          <Button size="md" type="submit" className="w-full">
            Сохранить
          </Button>
        </form>
      </Modal>
    </div>
  );
};
