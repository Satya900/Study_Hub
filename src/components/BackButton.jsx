import React from "react"
import { useNavigate, useParams } from "react-router-dom";

const BackButton = () => {

    const navigate = useNavigate();
    const {categoryName, topicId} = useParams();

// Implement navigation logic based on the current URL parameters.
// - If on a topic page (category/${categoryName}/topic/${topicId}), clicking "Back" should navigate to the category page (category/${categoryName}).
// - If already on a category page, clicking "Back" should navigate to the home page.

const handleClick = ()=>{
    if(topicId){
        navigate(`/category/${categoryName}`);
    }else if(categoryName){
        navigate("/");
    }
    else{
        navigate("/");
    }
}

  return (
    <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        BACK
    </button>
  )
};

export default BackButton;
