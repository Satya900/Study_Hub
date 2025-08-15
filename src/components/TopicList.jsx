import React from "react";
import { useProgress } from "../hooks/useProgress";

const TopicList = ({ category }) => {
  const { topics } = useProgress();
  const filteredTopics = topics.filter(t => t.category === category);

  return (
    <div className="space-y-4">
      {filteredTopics.map(topic => (
        <div key={topic.id} className="border p-4 rounded shadow-sm">
          <h3 className="font-bold">{topic.title}</h3>
          <p>{topic.description}</p>
          <p className="text-sm text-gray-600">Difficulty: {topic.difficulty}</p>
          <p className="text-sm">Status: {topic.status}</p>
        </div>
      ))}
      {filteredTopics.length === 0 && <p>No topics yet.</p>}
    </div>
  );
};

export default TopicList;
