import { useState } from "react";

const Section = ({ title, children }) => (
  <div>
    <h1>{title}</h1>
    {children}
  </div>
);

const Button = ({ text, handler }) => <button onClick={handler}>{text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const handleNextClick = () => {
    const index = randomInteger(0, anecdotes.length);
    setSelected(index);
  };

  const handleVoteClick = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  return (
    <div>
      <Section title='Anecdote of the day'>
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
        <Button handler={handleVoteClick} text='vote' />
        <Button handler={handleNextClick} text='next anecdote' />
      </Section>
      <Section title='Anecdote with most votes'>
        <p>{anecdotes[points.indexOf(Math.max(...points))]}</p>
        <p>has {Math.max(...points)} votes</p>
      </Section>
    </div>
  );
};

export default App;
