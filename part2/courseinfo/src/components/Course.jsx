import React from "react";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Course = ({ course }) => {
  const total = course.parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);

  return (
    <div>
      <Header title={course.name} />
      {course.parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}

      <h3>Total of {total} exercises</h3>
    </div>
  );
};

export default Course;
