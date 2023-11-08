import { useState } from "react";
import "./App.css";
import Block from "./Components/Block";

function App() {
  interface Popup {
    message: string;
    button: string;
  }
  const [state, setState] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [popup, setPopup] = useState<null | Popup>(null);
  const checkWinner = (state: any[]) => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c])
        return true;
    }
    return false;
  };
  const handleBlockClick = (i: number) => {
    const stateCopy = state;
    if (stateCopy[i] !== null || popup !== null) return;
    setTurn(turn === "X" ? "O" : "X");
    stateCopy[i] = turn;
    const winner = checkWinner(stateCopy);
    setState(stateCopy);
    if (winner) {
      setPopup({ message: "Congrats:You won the Game!", button: "Play Again" });
    } else if (
      !winner &&
      state.filter((value: any[]) => value !== null).length === 9
    ) {
      setPopup({ message: "Sorry:You lost the Game!", button: "Try Again" });
    }
  };
  interface Tryagainprops extends Popup {}
  const Tryagain: React.FC<Tryagainprops> = (props) => {
    return (
      <div className="popupmain">
        <div>{props.message}</div>
        <button
          className="btn"
          onClick={() => {
            setState(Array(9).fill(null));
            setPopup(null);
          }}
        >
          {props.button}
        </button>
      </div>
    );
  };

  return (
    <div className="main">
      <div className="board">
        <div className="row">
          <Block onClick={() => handleBlockClick(0)} value={state[0]} />
          <Block onClick={() => handleBlockClick(1)} value={state[1]} />
          <Block onClick={() => handleBlockClick(2)} value={state[2]} />
        </div>
        <div className="row">
          <Block onClick={() => handleBlockClick(3)} value={state[3]} />
          <Block onClick={() => handleBlockClick(4)} value={state[4]} />
          <Block onClick={() => handleBlockClick(5)} value={state[5]} />
        </div>
        <div className="row">
          <Block onClick={() => handleBlockClick(6)} value={state[6]} />
          <Block onClick={() => handleBlockClick(7)} value={state[7]} />
          <Block onClick={() => handleBlockClick(8)} value={state[8]} />
        </div>
      </div>
      {popup !== null && (
        <Tryagain message={popup.message} button={popup.button} />
      )}
    </div>
  );
}

export default App;
