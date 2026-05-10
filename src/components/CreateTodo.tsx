import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useDispatch } from 'react-redux';
import { createTodo } from '../store/slices/TodosSlice'; 
import { Button } from "../ui/Button";

interface CreateTodoProps {
  listId?: string
}

export function CreateTodo ({listId}: CreateTodoProps) {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const [value, setValue ] = useState("");
  const handleApp = () => {
    if (value.trim()) {
      dispatch(createTodo({list: listId, title: value}));
      setValue("");
    }
  }
    return ( //
        <>
        <input 
        className="p-2 border border-[#ccc] rounded-[4px] w-full mr-[10px] outline-none" 
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      
      <Button cursor="pointer" size="sm" variant="primary"  onClick={(handleApp)}>{t.addBtn}</Button>
      </>
    )
    
} 

