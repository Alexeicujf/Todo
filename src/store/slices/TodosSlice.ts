import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks/useAppSelector";

export interface Todo {
    id: number,
    title: string,
    check: boolean,
    list?: string 
    description: string,
} 
interface TotoSlise {
    todos: Todo[]
}
const data = localStorage.getItem("todo_data");
const initialState: TotoSlise = data ? JSON.parse(data): {todos: []} ;
export const TodosSlice = createSlice({
    name: "todo" ,
    initialState,
    reducers: {
        createTodo:(state, activity) => { 
             state.todos.push({id: Date.now(),title: activity.payload.title, description: activity.payload.description,list: activity.payload.list ,check: false}) 
        },
        checkTodo:(state, activity) => {
            const todo = state.todos.find(todo => todo.id === activity.payload) 
            if (todo) {
                todo.check = !todo.check 
            }
        }, removeTodo:(state, activity) => {
           state.todos = state.todos.filter(todo => todo.id !== activity.payload)
        },
        updateTodo: (state, activity) => {
            const item = state.todos.find(item => item.id === activity.payload.id)
            if (item) {
                item.title = activity.payload.title
                item.description = activity.payload.description
            }
        }
    }
})


export const {createTodo,checkTodo, updateTodo,removeTodo} =TodosSlice.actions;
export default TodosSlice.reducer

 export const useTodos = () => useAppSelector(state => state.todos.todos) 

 // Сделать для списков !!!  todoAppUI Посмотреть! ПО id попробовать 