import './App.css';
import { useState } from "react";
import Todo from "./Todo.jsx";
import Form from "./Form.jsx";

export default function App() {
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);


    const addTodo = (todoText) => {
        setTodos(prev => [...prev, todoText]);
    };

    const deleteTodo = (index) => {
        setTodos(prev => prev.filter((_, i) => i !== index));
    };

    const editTodo = (index, newText) => {
        const newTodos = [...todos];
        newTodos[index] = newText;
        setTodos(newTodos);
        setEditIndex(-1);
    };


    return (
        <div className="App">
            <h2>TodoList</h2>

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
