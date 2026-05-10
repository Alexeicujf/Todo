import { ItemTodo } from "./ItemTodo"
import type { Todo } from '../store/slices/TodosSlice';

interface ListTodosProps {
  todos: Todo[]; 
}

export function ListTodos({todos}: ListTodosProps) {

    
    return(
        <>
        {todos?.map((item) => (
           <ItemTodo key={item.id} todo={item}/>
      ))}
        </>
    )
}

