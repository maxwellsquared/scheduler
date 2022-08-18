import { useState } from "react";

// Thanks to @cwarcup for extensive help and suggestions!

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    setHistory((prev) => {
      let newHistory = [...prev];

      if (replace) {
        newHistory.pop();
      }
      newHistory.push(newMode);
      return newHistory;
    })

  };

  const back = function () {
    if (history.length <= 1) {
      return;
    }

    let newHistory = [...history]; // copies history to new "dead" array
    newHistory.pop(); // removes most recent entry in copied history
    setHistory(newHistory);
  };

  const mode = history[history.length - 1];
  return { mode, transition, back };
}