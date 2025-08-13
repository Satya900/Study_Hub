import React from "react";
import { seedTopics } from "../utils/seedData";
import { Link } from "react-router-dom";

const Home = () => {
  // Step 1: Group topics by category
  const topicCategory = {};
  for (const topic of seedTopics) {
    if (!topicCategory[topic.category]) {
      topicCategory[topic.category] = 0;
    }
    topicCategory[topic.category] += 1;
  }

  // Step 2: Render categories
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Choose a Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(topicCategory).map(([category, count]) => (
          <Link
            key={category}
            to={`/category/${category}`}
            className="border p-6 rounded-lg shadow hover:shadow-lg hover:scale-[1.02] transition bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">{category}</h2>
            <p className="text-gray-600">{count} topics</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
