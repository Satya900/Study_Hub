import React from "react"
import { useParams } from "react-router-dom";
import { seedTopics } from "../utils/seedData";

const TopicPage = () => {
  const {topicId} = useParams();

// Find the topic in seedTopics by matching the topicId from the URL.
// Once found, extract its frameLink (YouTube embed URL) and render it in an iframe.



  const topic = seedTopics.find(t =>t.id === topicId)
  console.log(topic)

  const videoSrc = topic.frameLink;
  console.log(videoSrc)

 return (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>
    <p className="text-gray-600 mb-4">{topic.description}</p>

   <iframe
  width="100%"
  height="500"
  src={topic.frameLink}
  title={topic.title}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>



    <div className="mt-4">
      <p><strong>Difficulty:</strong> {topic.difficulty}</p>
      <p><strong>Status:</strong> {topic.status}</p>
    </div>
  </div>
);

};

export default TopicPage;
