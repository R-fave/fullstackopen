import React from "react";
import PersonCard from "./PersonCard";

const PersonsList = ({ filterData, persons, handleDelete }) => {
  return (
    <div>
      {filterData.length >= 1
        ? filterData.map((person) => (
            <PersonCard person={person} key={person.id} />
          ))
        : persons.map((person) => (
            <PersonCard
              person={person}
              key={person.id}
              handleDelete={handleDelete}
            />
          ))}
    </div>
  );
};

export default PersonsList;
