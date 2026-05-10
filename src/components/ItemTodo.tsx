// interface
import { useDispatch } from 'react-redux'
import { checkTodo, removeTodo, updateTodo} from '../store/slices/TodosSlice'
import type { Todo } from '@/store/slices/TodosSlice'; 
import { Delete } from './Delete';
import { useState } from 'react';
import { Modal } from '@/ui/Modal';

interface ItemTodoProps {
  todo: Todo,
}

export function ItemTodo({ todo }: ItemTodoProps) {
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ title: todo.title, description: todo.description });

  const handleCloseModal = () => setIsOpenModal(false);

  const handleOpenEdit = () => {
    setIsEditMode(true);
    setIsOpenModal(true);
  };

  const handleSaveAll = () => {
    dispatch(updateTodo({
      id: todo.id,
      title: formData.title,
      description: formData.description,
    }));
    handleCloseModal();
  };

  const handleClickTitle = () => {
    setIsEditMode(false);
    setIsOpenModal(true);
  };

  
  return (
    <>
      <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-gray-700">
        <Delete id={todo.id} onDelete={(id) => dispatch(removeTodo(id))} />
        <button onClick={handleOpenEdit}>📝</button>
        
        <input type="checkbox" checked={todo.check} onChange={() => dispatch(checkTodo(todo.id))} className="w-4 h-4" />
        
        <p onClick={handleClickTitle} className="m-0 cursor-pointer dark:text-white peer-checked:line-through">
          {todo.title}
        </p>
      </div>

      <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
        {isEditMode ? (
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold">Название задачи:</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
              className="w-full border p-2 rounded"
            />
            <label className="text-sm font-bold">Описание:</label>
            <textarea 
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
              className="w-full border p-2 h-32 rounded"
            />
            <button onClick={handleSaveAll} className="bg-blue-500 text-white p-2 rounded">Сохранить всё</button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <h3>{todo.title}</h3>
            <p className="text-gray-600">{todo.description || "Описания нет"}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
// редактирование описания и тайтле в отдельном компоненте 
// сделать компонент для инпута и текст ария в ui 
// выделить модал для здач в отдельный компонеонт но в папку components 