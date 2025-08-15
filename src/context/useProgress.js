import { useContext } from "react";
import { ProgressContext } from "../context/ProgressContext.jsx";

export const useProgress = () => {
  return useContext(ProgressContext);
};
