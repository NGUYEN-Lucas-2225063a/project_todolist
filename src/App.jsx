import './App.css';
import { useState, useEffect } from "react";
import Todo from "./Todo.jsx";
import Form from "./Form.jsx";

export default function App() {
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, []);

    const addTodo = (todoText) => {
        const newTodos = [...todos, todoText];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const editTodo = (index, newText) => {
        const newTodos = [...todos];
        newTodos[index] = newText;
        setTodos(newTodos);
        setEditIndex(-1);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    return (
        <div className="App">
            <h1>TodoList</h1>

            <Form addTodo={addTodo}/>

            <div className="todo-list">
                {todos.map((todo, index) => (
                    <Todo
                        key={index}
                        todo={todo}
                        onDelete={() => deleteTodo(index)}
                        onEdit={() => setEditIndex(index)}
                        isEditing={editIndex === index}
                        onEditSave={(newText) => editTodo(index, newText)}
                    />
                ))}
            </div>
        </div>
    );
}
