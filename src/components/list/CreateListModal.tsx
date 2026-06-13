import { addList, List, editList} from "@/store/slices/ListsSlice";
import { Modal } from "@/ui/Modal";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

export interface CreateListModalProps {
    list?: List,
    isOpen: boolean,
    onClose: () => void
}

export const CreateListModal = ({list, isOpen, onClose}: CreateListModalProps) => {
    const [defaultData, setDefaultData] = useState({id: list? list.id: "",title: list ? list.title : "", description: list ? list.description : ""})
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDefaultData({
                id: list? list.id: "",
                title: list ? list.title : "", 
                description: list ? list.description : ""
            })
        }
    }, [isOpen, list]) 

    const handleSaveList = () => {
        if (list) {
            dispatch(editList({
                id: defaultData.id,
                title: defaultData.title,
                description: defaultData.description
            }))
        } else {
            dispatch(addList({
                id: defaultData.id,
                title: defaultData.title,
                description: defaultData.description
            }))
        }
        onClose();
    }
   const handleFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        handleSaveList() //  
    }
    return (
        <div className="flex flex-col gap-4 p-1">
            <Modal isOpen={isOpen} onClose={onClose}>
                
                <form 
                    onSubmit={handleFormSubmit} 
                    className="flex flex-col gap-4 p-1"
                >
                    <input className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-800 rounded-lg outline-none focus:border-blue-500 dark:focus:border-blue-500 text-gray-900 dark:text-white transition-colors" type="text" placeholder="Лист" value={defaultData.title} onChange={(e) => setDefaultData({...defaultData, title: e.target.value})}/>
                    <textarea  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-800 rounded-lg outline-none focus:border-blue-500 dark:focus:border-blue-500 text-gray-900 dark:text-white h-32 resize-none transition-colors" placeholder="Описание" value={defaultData.description} onChange={(e) => setDefaultData({...defaultData,description: e.target.value})}></textarea>
                    
                    <button type="submit" className="w-full py-2 px-4 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors cursor-pointer">
                        Сохранить
                    </button>
                </form>
            </Modal>
        </div>
    )
}