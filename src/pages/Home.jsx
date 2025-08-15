import React, { useState } from "react";
import { useProgress } from "../context/useProgress";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

const Home = () => {
  const { categories, addCategory, editCategory, deleteCategory, topics } = useProgress();
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editCatId, setEditCatId] = useState(null);
  const [editCatName, setEditCatName] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const categoryName = formData.get("category").trim();
    if (categoryName) {
      addCategory(categoryName);
      setShowAddCategoryModal(false);
    }
  };

  const handleEditCategory = (e) => {
    e.preventDefault();
    if (editCatName.trim()) {
      editCategory(editCatId, editCatName.trim());
      setEditCatId(null);
      setEditCatName("");
    }
  };

  // Helper: count topics per category
  const getTopicCount = (catName) =>
    topics.filter((t) => t.category === catName).length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Choose a Category</h1>

      <button
        className="text-white bg-red-500 hover:bg-red-700 cursor-pointer p-2 rounded-2xl font-bold mb-4"
        onClick={() => setShowAddCategoryModal(true)}
      >
        Add a Category
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="border p-6 rounded-lg shadow bg-white flex flex-col gap-2">
            <Link
              to={`/category/${cat.name}`}
              className="hover:scale-[1.02] transition"
            >
              <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>
              <p className="text-gray-600">{getTopicCount(cat.name)} topics</p>
            </Link>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-yellow-400 text-white px-2 py-1 rounded"
                onClick={() => {
                  setEditCatId(cat.id);
                  setEditCatName(cat.name);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => deleteCategory(cat.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddCategoryModal && (
        <Modal show={showAddCategoryModal} onClose={() => setShowAddCategoryModal(false)}>
          <h2 className="text-lg font-bold mb-4">Add New Category</h2>
          <form onSubmit={handleAddCategory}>
            <input
              type="text"
              name="category"
              placeholder="Enter category name"
              className="border p-2 rounded w-full mb-3"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              Save
            </button>
          </form>
        </Modal>
      )}

      {editCatId && (
        <Modal show={!!editCatId} onClose={() => setEditCatId(null)}>
          <h2 className="text-lg font-bold mb-4">Edit Category</h2>
          <form onSubmit={handleEditCategory}>
            <input
              type="text"
              value={editCatName}
              onChange={e => setEditCatName(e.target.value)}
              className="border p-2 rounded w-full mb-3"
              required
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
    </div>
  );
};

export default Home;
