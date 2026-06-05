import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("devboard_user");
    return saved ? JSON.parse(saved) : null;
  });

  const authHeaders = () => ({
    headers: { Authorization: `Bearer ${user?.token}` },
  });

  const fetchTasks = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data } = await axios.get("/api/tasks", authHeaders());
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, [user]);

  const addTask = async (taskData) => {
    const { data } = await axios.post("/api/tasks", taskData, authHeaders());
    setTasks((prev) => [...prev, data]);
  };

  const updateTask = async (id, updates) => {
    const { data } = await axios.put(`/api/tasks/${id}`, updates, authHeaders());
    setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`, authHeaders());
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const addSnippet = async (taskId, snippet) => {
    const { data } = await axios.post(`/api/tasks/${taskId}/snippets`, snippet, authHeaders());
    setTasks((prev) => prev.map((t) => (t._id === taskId ? data : t)));
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("devboard_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("devboard_user");
    setTasks([]);
  };

  return (
    <BoardContext.Provider value={{ tasks, loading, user, addTask, updateTask, deleteTask, addSnippet, login, logout, fetchTasks }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => useContext(BoardContext);
