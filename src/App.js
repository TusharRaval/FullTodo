import React, { useState, useEffect } from "react";
import { FaTrash, FaCheck, FaPlus, FaEdit } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { db, tasksCollection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "./firebase";

import "./App.css";

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [editing, setEditing] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    // Fetch tasks
    const fetchTasks = async () => {
        try {
            const snapshot = await getDocs(tasksCollection);
            setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Add task
    const addTask = async () => {
        if (!title.trim()) return alert("Title cannot be empty!");
        try {
            const newTask = await addDoc(tasksCollection, { title, completed: false });
            setTasks([...tasks, { id: newTask.id, title, completed: false }]);
            setTitle("");
        } catch (error) {
            console.error("Error adding task", error);
        }
    };

    // Update task (toggle completion)
    const updateTask = async (id, completed) => {
        try {
            await updateDoc(doc(db, "tasks", id), { completed: !completed });
            fetchTasks();
        } catch (error) {
            console.error("Error updating task", error);
        }
    };

    // Edit task
    const editTask = (id, title) => {
        setEditing(id);
        setEditTitle(title);
    };

    // Save edited task
    const saveTask = async () => {
        if (!editTitle.trim()) return alert("Title cannot be empty!");
        try {
            await updateDoc(doc(db, "tasks", editing), { title: editTitle });
            fetchTasks();
            setEditing(null);
            setEditTitle("");
        } catch (error) {
            console.error("Error saving task", error);
        }
    };

    // Delete task
    const deleteTask = async (id) => {
        try {
            await deleteDoc(doc(db, "tasks", id));
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">To-Do List</h2>

            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder={editing ? "Edit task..." : "Add a new task..."}
                    value={editing ? editTitle : title}
                    onChange={(e) => editing ? setEditTitle(e.target.value) : setTitle(e.target.value)}
                />
                <button className="btn btn-primary" onClick={editing ? saveTask : addTask}>
                    <FaPlus /> {editing ? "Save" : "Add"}
                </button>
            </div>

            <ul className="list-group">
                {tasks.map((task) => (
                    <li key={task.id} className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? "completed-task" : ""}`}>
                        <span className={task.completed ? "completed-text" : ""}>{task.title}</span>

                        <div className="btn-group">
                            <button className="btn btn-success m-1" onClick={() => updateTask(task.id, task.completed)}>
                                <FaCheck />
                            </button>
                            <button className="btn btn-warning m-1" onClick={() => editTask(task.id, task.title)}>
                                <FaEdit />
                            </button>
                            <button className="btn btn-danger m-1" onClick={() => deleteTask(task.id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
