import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = function (input) {
    if (input > 1) return `${input} spots remaining`;
    if (input === 1) return `1 spot remaining`;
    if (input === 0) return `no spots remaining`;
  };

  const spotText = formatSpots(props.spots);

  console.log(dayClass);
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotText}</h3>
    </li>
  );
}
