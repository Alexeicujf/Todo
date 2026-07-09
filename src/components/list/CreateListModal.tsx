import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  List,
  createListAsync,
  updateListAsync,
} from "@/store/slices/ListsSlice";
import { Modal } from "@/ui/Modal";
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
          <input
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 transition-colors outline-none focus:border-blue-500 dark:border-gray-800 dark:bg-[#242424] dark:text-white dark:focus:border-blue-500"
            type="text"
            placeholder="Название списка"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="h-32 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 transition-colors outline-none focus:border-blue-500 dark:border-gray-800 dark:bg-[#242424] dark:text-white dark:focus:border-blue-500"
            placeholder="Описание списка"
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
