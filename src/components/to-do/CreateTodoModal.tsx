import { useEffect, useState } from "react"
import { Todo, createTodo, updateTodo } from "@/store/slices/TodosSlice"
import { useDispatch } from "react-redux"
import { Modal } from "@/ui/Modal"
import { List } from "@/store/slices/ListsSlice"

export interface CreateTodoModalProps {
    todo?: Todo,
    listId? : string,
    isOpen: boolean,
    onClose: () => void,
    list?: List
}

export const CreateTodoModal = ({todo, listId, isOpen, onClose}: CreateTodoModalProps) => {
    const dispatch = useDispatch();
    const [defaultData, setDefaultData] = useState({ 
        id: todo ? todo.id : "", 
        title: todo ? todo.title : "", 
        description: todo ? todo.description : "" 
    });

    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDefaultData(
                {id: todo ? todo.id : "", title: todo ? todo.title : "", description: todo? todo.description : "" }
            )
        }
    }, [isOpen, todo])
  
    const handleSaveTodo = () => {
        if (todo) {
            dispatch(updateTodo({
                id: defaultData.id,
                title: defaultData.title,
                description: defaultData.description
            }))
        } else {
            dispatch(createTodo({
                id: defaultData.id,
                title: defaultData.title,
                description: defaultData.description,
                list: listId 
            }))
        }
        onClose()
    }

    const handleFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        handleSaveTodo(); // ИСПРАВЛЕНО: добавлены круглые скобки () для вызова функции
    }

    return (
        <div> 
            <Modal isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-1">
                    <input className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-800 rounded-lg outline-none focus:border-blue-500 dark:focus:border-blue-500 text-gray-900 dark:text-white transition-colors"  type="text" placeholder="Создать задачу" value={defaultData.title} onChange={(e) => setDefaultData({...defaultData, title: e.target.value})}/>
                    <textarea  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-800 rounded-lg outline-none focus:border-blue-500 dark:focus:border-blue-500 text-gray-900 dark:text-white h-32 resize-none transition-colors" placeholder="Описание задачи" value={defaultData.description} onChange={(e) => setDefaultData({...defaultData, description: e.target.value})}></textarea>
                    
                    {/* ИСПРАВЛЕНО: Убран onClick, добавлен type="submit" */}
                    <button type="submit" className="w-full py-2 px-4 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors cursor-pointer">
                        Сохранить
                    </button>
                </form>
            </Modal>
        </div>
    )
}