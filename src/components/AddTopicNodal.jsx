import React, { useState } from "react";
import Modal from "./Modal";
import { useProgress } from "../hooks/useProgress";

const AddTopicModal = ({ show, onClose, category }) => {
  const { addTopic } = useProgress();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [frameLink, setFrameLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTopic({
      category,
      title,
      description,
      difficulty,
      frameLink
    });

    // Reset form
    setTitle("");
    setDescription("");
    setDifficulty("Easy");
    setFrameLink("");

    // Close modal
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Add Topic - {category}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Topic Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <input
          type="url"
          placeholder="YouTube Embed Link (optional)"
          value={frameLink}
          onChange={(e) => setFrameLink(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Topic
        </button>
      </form>
    </Modal>
  );
};

export default AddTopicModal;
