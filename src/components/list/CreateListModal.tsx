import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  List,
  createListAsync,
  updateListAsync,
} from "@/store/slices/ListsSlice";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { AppDispatch } from "@/store";

export interface CreateListModalProps {
  list?: List;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateListModal = ({
  list,
  isOpen,
  onClose,
}: CreateListModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState(list ? list.title : "");
  const [description, setDescription] = useState(list ? list.description : "");
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setTitle(list ? list.title : "");
      setDescription(list ? list.description : "");
    }
  }

  const handleSaveList = () => {
    if (!title.trim()) return;

    if (list) {
      dispatch(
        updateListAsync({
          id: list.id,
          title: title.trim(),
          description: description.trim(),
        })
      )
        .unwrap()
        .then(() => {
          onClose();
        });
    } else {
      dispatch(
        createListAsync({
          title: title.trim(),
          description: description.trim(),
        })
      )
        .unwrap()
        .then(() => {
          onClose();
        });
    }
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleSaveList();
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-1">
          <Input
            type="text"
            placeholder="Название списка"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Описание списка"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-32 resize-none"
          />
          <Button type="submit" size="md" className="w-full">
            Сохранить
          </Button>
        </form>
      </Modal>
    </div>
  );
};
