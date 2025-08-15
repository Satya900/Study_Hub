/* eslint-disable react-refresh/only-export-components */
import React, { useState, createContext, useEffect } from "react";
import { seedTopics } from "../utils/seedData";

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  // --- Load from localStorage or seed ---
  const getInitialTopics = () => {
    const saved = localStorage.getItem("topics");
    return saved ? JSON.parse(saved) : seedTopics;
  };
  const getInitialCategories = () => {
    const saved = localStorage.getItem("categories");
    if (saved) return JSON.parse(saved);
    return [
      ...new Set(seedTopics.map(t => t.category))
    ].map((name, idx) => ({ id: String(idx + 1), name }));
  };

  const [topics, setTopics] = useState(getInitialTopics());
  const [categories, setCategories] = useState(getInitialCategories());

  // --- Persist to localStorage ---
  useEffect(() => {
    localStorage.setItem("topics", JSON.stringify(topics));
  }, [topics]);
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // --- Category functions ---
  const addCategory = (name) => {
    if (!categories.some(c => c.name === name)) {
      setCategories(prev => [
        ...prev,
        { id: Date.now().toString(), name }
      ]);
    }
  };

  const editCategory = (id, newName) => {
    setCategories(prev =>
      prev.map(c => c.id === id ? { ...c, name: newName } : c)
    );
    setTopics(prev =>
      prev.map(t => t.category === categories.find(c => c.id === id)?.name
        ? { ...t, category: newName }
        : t
      )
    );
  };

  const deleteCategory = (id) => {
    const catName = categories.find(c => c.id === id)?.name;
    setCategories(prev => prev.filter(c => c.id !== id));
    setTopics(prev => prev.filter(t => t.category !== catName));
  };

  // --- Topic functions ---
  const addTopic = (topic) => {
    setTopics(prevTopics => [
      ...prevTopics,
      { ...topic, id: Date.now().toString(), status: "Not Started", createdAt: Date.now() }
    ]);
  };

  const editTopic = (id, updatedTopic) => {
    setTopics(prevTopics =>
      prevTopics.map(topic =>
        topic.id === id ? { ...topic, ...updatedTopic } : topic
      )
    );
  };

  const deleteTopic = (id) => {
    setTopics(prevTopics => prevTopics.filter(topic => topic.id !== id));
  };

  const toggleStatus = (id, newStatus) => {
    setTopics(prevTopics =>
      prevTopics.map(topic =>
        topic.id === id ? { ...topic, status: newStatus } : topic
      )
    );
  };

  const totalTopics = topics.length;
  const completedTopics = topics.filter(topic => topic.status === "Completed").length;
  const progressPercent =
    totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

  return (
    <ProgressContext.Provider
      value={{
        categories,
        addCategory,
        editCategory,
        deleteCategory,
        topics,
        addTopic,
        editTopic,
        deleteTopic,
        toggleStatus,
        totalTopics,
        completedTopics,
        progressPercent
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
