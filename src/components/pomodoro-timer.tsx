import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { MyBtn } from './button';
import { Timer } from './timer';

interface Props {
  pomodoroTimer: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTimer);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);
  return (
    <div className="pomodoro">
      <h2>You Are Working:</h2>
      <Timer mainTimer={mainTime} />
      <div className="controls">
        <MyBtn onClick={() => console.log(1)} text="Test"></MyBtn>
        <MyBtn onClick={() => console.log(1)} text="Test"></MyBtn>
        <MyBtn onClick={() => console.log(1)} text="Test"></MyBtn>
      </div>
      <div className="details">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam
          aspernatur tenetur adipisci. Aliquid, porro quasi. Sed aspernatur
          quaerat aut aperiam voluptatibus amet, a sapiente ut nulla, dolorum
          illum eaque hic?
        </p>
      </div>
    </div>
  );
}
