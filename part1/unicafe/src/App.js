import { useState } from "react";

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>;
const Stat = ({ text, score }) => (
  <p>
    {text} {score} {text === "positive" && "%"}
  </p>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const setScore = (state) => {
    let updatedAll = 0,
      updatedGood = 0,
      updatedBad = 0;
    if (state === "good")
      return () => {
        updatedGood = good + 1;
        setGood(updatedGood);
        updatedAll = all + 1;
        setAll(updatedAll);
        setAverage((updatedGood - bad) / updatedAll);
        setPositive((updatedGood / updatedAll) * 100);
      };
    if (state === "neutral")
      return () => {
        setNeutral(neutral + 1);
        setAll(all + 1);
      };
    if (state === "bad")
      return () => {
        updatedBad = bad + 1;
        setBad(updatedBad);
        updatedAll = all + 1;
        setAll(updatedAll);
        setAverage((good - updatedBad) / updatedAll);
        setPositive((good / updatedAll) * 100);
      };
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={setScore("good")} text='good' />
      <Button handler={setScore("neutral")} text='neutral' />
      <Button handler={setScore("bad")} text='bad' />
      <h1>statistics</h1>
      <Stat text='good' score={good} />
      <Stat text='neutral' score={neutral} />
      <Stat text='bad' score={bad} />
      <Stat text='all' score={all} />
      <Stat text='average' score={average} />
      <Stat text='positive' score={positive} />
    </div>
  );
};

export default App;
