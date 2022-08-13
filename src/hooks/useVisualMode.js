import { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode) {
    console.log("TRANSITION========");
    console.log("Current mode is", mode + ". newMode is", newMode);
    console.log("History is", history);
    console.log("Switching to", newMode);
    let newHistory = [...history, mode];
    console.log("Attempting to set history to", newHistory);
    setHistory(newHistory);
    console.log("History is now", history);
    setMode(newMode);
    console.log("Current mode is", mode);
  };

  const back = () => {
    console.log("CALLING BACK");
    console.log("History is", history);
    console.log("Going back from", mode, "to", history[history.length - 1]);
    let lastMode = history[history.length - 1];
    setMode(lastMode);
    console.log("Mode is now", mode);
  };

  return { mode, transition, back };
}
