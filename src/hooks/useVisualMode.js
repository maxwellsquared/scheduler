import React, { useState } from "react";

// Heavily reliant on @cwarcup's work in a number of areas.

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode) {
    setMode(newMode);
    // DID NOT WORK BECAUSE I was setting it to [...history, mode] instead of [...history, newMode]
    // why did I need to add newMode to history?
    // did it not grab the new mode in time? <--------
    setHistory([...history, newMode]);
  };

  const back = function () {
    if (history.length <= 1) {
      setMode(initial);
      setHistory([initial]);
    } else {
      let newHistory = [...history]; // copies history to new "dead" array
      newHistory.pop(); // removes most recent entry in copied history
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
