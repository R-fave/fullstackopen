import { useState } from "react";

const StatisticLine = ({ stat, text }) => (
  <tbody>
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  </tbody>
);

const Statistics = ({ good, bad, netural, feedBack }) => {
  const average = (good * 1 + netural * 0 + bad * -1) / (good + netural + bad);
  const positive = 100 - (netural / good) * 100 + "%";
  const all = good + bad + netural;
  if (feedBack) {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <StatisticLine stat={good} text="Good" />
          <StatisticLine stat={netural} text="Netural" />
          <StatisticLine stat={bad} text="Bad" />
          <StatisticLine stat={all} text="All" />
          <StatisticLine stat={average} text="Average" />
          <StatisticLine stat={positive} text="Positive" />
        </table>
      </div>
    );
  }
  {
    return <p>No Feedback Given</p>;
  }
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

function App() {
  const [feedBack, setFeedBack] = useState(false);
  const [good, setGood] = useState(0);
  const [netural, setNetural] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <Button
          onClick={() => {
            const feed = true;
            setGood(good + 1);
            !feedBack && setFeedBack(feed);
          }}
          text="Good"
        />

        <Button
          onClick={() => {
            const feed = true;
            setNetural(netural + 1);
            !feedBack && setFeedBack(feed);
          }}
          text="Netural"
        />

        <Button
          onClick={() => {
            const feed = true;
            setBad(bad + 1);
            !feedBack && setFeedBack(feed);
          }}
          text="Bad"
        />
      </div>
      <Statistics good={good} netural={netural} bad={bad} feedBack={feedBack} />
    </div>
  );
}

export default App;
