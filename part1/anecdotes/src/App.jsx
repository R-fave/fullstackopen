import { useState } from "react";

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(0);
  const [newAnecdotes, setNewAncecdotes] = useState(
    anecdotes.map((data) => {
      return {
        anecdotes: data,
        vote: 0,
      };
    })
  );

  const handleSelect = () => {
    let num = anecdotes.length;
    const randomNum = Math.floor(Math.random() * (num - 1));
    setSelected(randomNum);
  };

  const handleVote = (selectedAne) => {
    const copyAne = [...newAnecdotes];
    copyAne[selectedAne].vote++;
    setNewAncecdotes(copyAne);
  };

  const handleMaxV = () => {
    const arr = [...newAnecdotes];
    arr.sort((a, b) => b.vote - a.vote);
    const max = arr[0];
    return (
      <div>
        <p>{max.anecdotes}</p>
        <p>has {max.vote} votes</p>
      </div>
    );
  };

  console.log(handleMaxV());

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>{newAnecdotes[selected]?.anecdotes}</p>
      <p>has {newAnecdotes[selected]?.vote} votes</p>
      <button
        onClick={() => {
          handleVote(selected);
        }}
      >
        vote
      </button>
      <button onClick={handleSelect}>next anecdotes</button>
      <h1>Anecdotes with the most vote</h1>
      {handleMaxV()}
    </div>
  );
}

export default App;
