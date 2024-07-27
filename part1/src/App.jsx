import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const Hello = () => {
  return (
    <div>
      <p>Hello World</p>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log(now, a + b);

  return (
    <div>
      <h1>Greetings</h1>
      <Hello />
    </div>
  );
}

export default App;
