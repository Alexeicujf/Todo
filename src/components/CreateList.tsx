import { Button } from "../ui/Button";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addList } from "../store/slices/ListsSlice";

export const CreateList = () => {
    const dispatch = useDispatch();
    const [create, setCreate] = useState("");
    const crateApp = () => {
        if (create.trim()) {
            dispatch(addList({title: create}));
            setCreate("");
        }
    }
    return (
        <>
        <input 
        type="text" 
        className="p-1 border border-[#ccc] rounded-[2px] w-full mr-[7px] outline-none"
        value={create}
        onChange={(event) => {
            setCreate(event.target.value)
        }}
        />
        <Button cursor="pointer" size="sm" variant="primary"  onClick={(crateApp)}>Создать лист</Button>
        </>
    )
}
