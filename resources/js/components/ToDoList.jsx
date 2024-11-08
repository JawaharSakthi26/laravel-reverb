import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const ToDoList = ({ rootUrl }) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const scroll = useRef();

    const scrollToBottom = () => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    };

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`${rootUrl}/todos`); // Fetch all todos
            setTodos(response.data); // Update state with the fetched todos
            setTimeout(scrollToBottom, 0);
        } catch (err) {
            console.log(err.message);
        }
    };

    const addTodo = async () => {
        try {
            const response = await axios.post(`${rootUrl}/todo`, {
                content: newTodo
            });

            if (response.data.success) {
                setTodos((prevTodos) => [...prevTodos, response.data.todo]);
                setNewTodo("");
                setTimeout(scrollToBottom, 0);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    };

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (newTodo.trim() !== "") {
            addTodo();
        }
    };

    useEffect(() => {
        fetchTodos(); // Fetch todos on component mount
    }, []);

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">To-Do List</div>
                    <div className="card-body" style={{height: "500px", overflowY: "auto"}}>
                        <ul>
                            {todos?.map((todo) => (
                                <li key={todo.id}>{todo.content}</li>
                            ))}
                        </ul>
                        <span ref={scroll}></span>
                    </div>
                    <div className="card-footer">
                        <form onSubmit={handleAddTodo}>
                            <input
                                type="text"
                                value={newTodo}
                                onChange={handleInputChange}
                                placeholder="Add a new to-do"
                                className="form-control"
                            />
                            <button type="submit" className="btn btn-primary mt-2">Add To-Do</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;
