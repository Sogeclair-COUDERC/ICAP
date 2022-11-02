import React, { useEffect, useState } from "react";
import Milestone from "../milestone/Milestone";
import "./style.css";

const Timeline = ({ type, numberOfStep, value, handleChange }) => {
  // Initialisation
  const [timeline, setTimeline] = useState([]); // List of dates. Empty string ("") if undefined

  function handleTimelineChange(val, index) {
    let newTimeline = timeline;
    newTimeline[index] = val;
    setTimeline(newTimeline);
    handleChange(newTimeline);
  }

  useEffect(() => {
    const initial = Array(numberOfStep).fill("");
    if (Array.isArray(value) && value.length > 1)
      for (let i = 0; i < numberOfStep; i++) initial[i] = value[i];
    setTimeline(initial);
  }, [numberOfStep]);

  // Render

  let elems = timeline.map((milestoneDate, index) => {
    let milestoneLabel = type + (index + 1);
    return (
      <Milestone
        key={milestoneLabel}
        label={milestoneLabel}
        type="date"
        value={milestoneDate}
        handleChange={(val) => handleTimelineChange(val, index)}
      />
    );
  });

  return <>{elems}</>;
};

export default Timeline;
