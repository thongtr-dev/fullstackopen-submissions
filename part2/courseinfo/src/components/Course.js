const Header = ({ course }) => <h2>{course}</h2>;
const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => (
  <strong>
    Number of exercises{" "}
    {parts.map((part) => part.exercises).reduce((total, curr) => total + curr)}
  </strong>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
