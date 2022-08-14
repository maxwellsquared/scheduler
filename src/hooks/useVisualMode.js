import React, { useState } from "react";

// Heavily reliant on @cwarcup's work in a number of areas.

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    if (replace) {
      setMode(newMode);
      let replacementHistory = [...history];
      replacementHistory.pop();
      replacementHistory.push(newMode);
      setHistory(replacementHistory);
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  };

  const back = function () {
    if (history.length <= 1) {
      setMode(initial);
      setHistory([initial]);
    } else {
      let newHistory = [...history]; // copies history to new "dead" array
      newHistory.pop(); // removes most recent entry in copied history
      // Need to pull history state into a variable so I can mess with it!
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return { mode, transition, back };
}

// WHY DIDN'T THIS WORK?!!?

// const back = function () {
//   if (history.length <= 1) {
//     setMode(initial);
//   } else {
//     let lastMode = history[history.length - 1];
//     console.log("lastMode is", lastMode);
//     setMode(lastMode);
//     console.log("Mode is now", mode);
//   }
// };
