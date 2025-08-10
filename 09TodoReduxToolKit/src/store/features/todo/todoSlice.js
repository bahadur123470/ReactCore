import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{id:1, text: "TodoApp"}]
}

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), 
                text: action.payload
            }
            state.todos.push(todo)
        },
        updateTodo: (state, action) => {
            const {id, newText} = action.payload;
            const todo = state.todos.find(todo => todo.id === id)
            if (todo){
                todo.text = newText
            }
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        }
    }
})

export const {addTodo, updateTodo, deleteTodo} = todoSlice.actions

export default todoSlice.reducer