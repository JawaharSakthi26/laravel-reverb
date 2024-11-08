import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const ToDoList = ({ rootUrl }) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const scroll = useRef();
    const webSocketChannel = `todos_channel`;

    const scrollToBottom = () => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    };

    const connectWebSocket = () => {
        window.Echo.private(webSocketChannel)
            .listen('TodoReceived', async (e) => {
                await fetchTodos();
            });
    };

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`${rootUrl}/todos`);
            setTodos(response.data);
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
        fetchTodos(); 
        connectWebSocket();

        return () => {
            window.Echo.leave(webSocketChannel);
        };
    }, []);

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card shadow-lg">
                    <div className="card-header text-center bg-primary text-white">
                        <h3>To-Do List</h3>
                    </div>
                    
                    <div className="card-body p-4">
                        <form onSubmit={handleAddTodo} className="d-flex justify-content-center mb-4">
                            <input
                                type="text"
                                value={newTodo}
                                onChange={handleInputChange}
                                placeholder="Add a new to-do"
                                className="form-control mr-3"
                                style={{
                                    maxWidth: "60%",
                                    fontSize: "1.1rem",
                                    padding: "0.5rem"
                                }}
                            />
                            <button type="submit" className="btn btn-primary mx-2" style={{ fontSize: "1.1rem" }}>
                                Add
                            </button>
                        </form>

                        <div style={{ height: "300px", overflowY: "auto", padding: "0 1rem" }}>
                            <ul className="list-unstyled">
                                {todos?.map((todo) => (
                                    <li
                                        key={todo.id}
                                        style={{
                                            fontSize: "1.2rem",
                                            padding: "0.8rem",
                                            borderBottom: "1px solid #ddd",
                                            marginBottom: "0.5rem",
                                            color: "#555"
                                        }}
                                    >
                                        {todo.content}
                                    </li>
                                ))}
                            </ul>
                            <span ref={scroll}></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;
