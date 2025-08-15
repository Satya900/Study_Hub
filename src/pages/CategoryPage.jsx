import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProgress } from "../context/useProgress";
import Modal from "../components/Modal";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { topics, addTopic, editTopic, deleteTopic, toggleStatus } = useProgress();

  const filteredTopics = topics.filter(
    topic => topic.category === categoryName
  );

  // Progress calculation for this category
  const total = filteredTopics.length;
  const completed = filteredTopics.filter(t => t.status === "Completed").length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Add topic modal state
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [newTopic, setNewTopic] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    frameLink: ""
  });

  // Edit topic modal state
  const [editTopicId, setEditTopicId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    frameLink: ""
  });

  const openEditModal = (topic) => {
    setEditTopicId(topic.id);
    setEditData({
      title: topic.title,
      description: topic.description,
      difficulty: topic.difficulty,
      frameLink: topic.frameLink || ""
    });
  };

  const handleEditTopic = (e) => {
    e.preventDefault();
    editTopic(editTopicId, { ...editData });
    setEditTopicId(null);
    setEditData({
      title: "",
      description: "",
      difficulty: "Easy",
      frameLink: ""
    });
  };

  // Status change handler
  const handleStatusChange = (id, newStatus) => {
    toggleStatus(id, newStatus);
  };

  // Add topic handler
  const handleAddTopic = (e) => {
    e.preventDefault();
    addTopic({
      ...newTopic,
      category: categoryName
    });
    setShowAddTopicModal(false);
    setNewTopic({
      title: "",
      description: "",
      difficulty: "Easy",
      frameLink: ""
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Progress</h2>
        <div className="w-full bg-gray-200 rounded h-6 mb-2">
          <div
            className="bg-green-500 h-6 rounded"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <p>{completed} of {total} topics completed ({percent}%)</p>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        onClick={() => setShowAddTopicModal(true)}
      >
        Add Topic
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredTopics.map(topicList => (
          <div key={topicList.id} className="border p-6 rounded-lg shadow bg-white flex flex-col gap-2">
            <Link
              to={`/category/${categoryName}/topic/${topicList.id}`}
              className="hover:scale-[1.02] transition"
            >
              <h2 className="text-xl font-semibold mb-2">{topicList.title}</h2>
              <p className="text-gray-600">{topicList.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Status: {topicList.status}
              </p>
            </Link>
            <div className="flex gap-2 mt-2">
              <select
                value={topicList.status}
                onChange={e => handleStatusChange(topicList.id, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                className="bg-yellow-400 text-white px-2 py-1 rounded"
                onClick={() => openEditModal(topicList)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => deleteTopic(topicList.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {editTopicId && (
          <Modal show={!!editTopicId} onClose={() => setEditTopicId(null)}>
            <h2 className="text-lg font-bold mb-4">Edit Topic</h2>
            <form onSubmit={handleEditTopic} className="space-y-4">
              <input
                type="text"
                value={editData.title}
                onChange={e => setEditData({ ...editData, title: e.target.value })}
                placeholder="Topic Title"
                className="border rounded p-2 w-full"
                required
              />
              <textarea
                value={editData.description}
                onChange={e => setEditData({ ...editData, description: e.target.value })}
                placeholder="Description"
                className="border rounded p-2 w-full"
                required
              />
              <select
                value={editData.difficulty}
                onChange={e => setEditData({ ...editData, difficulty: e.target.value })}
                className="border rounded p-2 w-full"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <input
                type="url"
                value={editData.frameLink}
                onChange={e => setEditData({ ...editData, frameLink: e.target.value })}
                placeholder="YouTube Embed Link (optional)"
                className="border rounded p-2 w-full"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded w-full"
              >
                Update
              </button>
            </form>
          </Modal>
        )}

        {showAddTopicModal && (
          <Modal show={showAddTopicModal} onClose={() => setShowAddTopicModal(false)}>
            <h2 className="text-lg font-bold mb-4">Add Topic</h2>
            <form onSubmit={handleAddTopic} className="space-y-4">
              <input
                type="text"
                value={newTopic.title}
                onChange={e => setNewTopic({ ...newTopic, title: e.target.value })}
                placeholder="Topic Title"
                className="border rounded p-2 w-full"
                required
              />
              <textarea
                value={newTopic.description}
                onChange={e => setNewTopic({ ...newTopic, description: e.target.value })}
                placeholder="Description"
                className="border rounded p-2 w-full"
                required
              />
              <select
                value={newTopic.difficulty}
                onChange={e => setNewTopic({ ...newTopic, difficulty: e.target.value })}
                className="border rounded p-2 w-full"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <input
                type="url"
                value={newTopic.frameLink}
                onChange={e => setNewTopic({ ...newTopic, frameLink: e.target.value })}
                placeholder="YouTube Embed Link (optional)"
                className="border rounded p-2 w-full"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded w-full"
              >
                Add Topic
              </button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
