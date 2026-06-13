import { useDispatch } from "react-redux";
import { setModalOpen, useOpenModal } from "@/store/slices/ListsSlice";
import { CreateListModal } from "@/components/list/CreateListModal";


export const CreateListTrigger = () => {
    const dispatch = useDispatch()
    const handleOdenModal = () => {
        dispatch((setModalOpen(true)))
    }
    const handleCloseModal = () => {
        dispatch(setModalOpen(false))
    }
    const isOpen = useOpenModal();
    return (
        <>
        <input type="text" placeholder="Создать лист" className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-800 rounded-lg cursor-pointer outline-none hover:border-gray-300 dark:hover:border-gray-700 transition-colors placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white" readOnly onClick={handleOdenModal}/>
        <CreateListModal isOpen={isOpen}  onClose={handleCloseModal} />
        </>
    )
}