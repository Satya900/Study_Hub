import React from "react";
import { useParams, Link } from "react-router-dom";
import { seedTopics } from "../utils/seedData";

const CategoryPage = () => {
  const { categoryName } = useParams();

  // Filter topics for the selected category
  const filteredTopics = seedTopics.filter(
    topic => topic.category === categoryName
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {filteredTopics.map(topicList => (
        <Link
          key={topicList.id}
          to={`/category/${categoryName}/topic/${topicList.id}`}
          className="border p-6 rounded-lg shadow hover:shadow-lg hover:scale-[1.02] transition bg-white"
        >
          <h2 className="text-xl font-semibold mb-2">{topicList.title}</h2>
          <p className="text-gray-600">{topicList.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
