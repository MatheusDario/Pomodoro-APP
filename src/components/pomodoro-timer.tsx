/* eslint-disable @typescript-eslint/no-var-requires */
import { useEffect, useState, useCallback } from 'react';
import { useInterval } from '../hooks/use-interval';
import { MyBtn } from './button';
import { Timer } from './timer';
import { SecondsToTime } from '../utils/seconds-to-time';

const audioStartWorking = new Audio('/sounds/bell-start.mp3');
const audioStopWorking = new Audio('/sounds/bell-finish.mp3');

interface Props {
  pomodoroTimer: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTimer);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQndManager, setSyclesQndManager] = useState(
    new Array(props.cycles - 1).fill(true),
  );
  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoro, setNumberOfPomodoro] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWorking = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTimer);
    audioStartWorking.play();
  }, [
    setTimeCounting,
    setWorking,
    setResting,
    setMainTime,
    props.pomodoroTimer,
  ]);

  const configureResting = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }

      audioStopWorking.play();
    },
    [
      setTimeCounting,
      setWorking,
      setResting,
      setMainTime,
      props.longRestTime,
      props.shortRestTime,
    ],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
    if (mainTime > 0) return;
    if (working && cyclesQndManager.length > 0) {
      configureResting(false);
      cyclesQndManager.pop();
    } else if (working && cyclesQndManager.length <= 0) {
      configureResting(true);
      setSyclesQndManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }
    if (working) setNumberOfPomodoro(numberOfPomodoro + 1);
    if (resting) configureWorking();
  }, [
    working,
    resting,
    mainTime,
    cyclesQndManager,
    numberOfPomodoro,
    completedCycles,
    configureResting,
    configureWorking,
    props.cycles,
  ]);

  return (
    <div className="pomodoro">
      <h2> {working ? 'You Are Working:' : 'You are Resting:'} </h2>
      <Timer mainTimer={mainTime} />
      <div className="controls">
        <MyBtn onClick={() => configureWorking()} text="Working"></MyBtn>
        <MyBtn onClick={() => configureResting(false)} text="Resting"></MyBtn>
        <MyBtn
          className={!working && !resting ? 'hidden' : ''}
          onClick={() => setTimeCounting(!timeCounting)}
          text={timeCounting ? 'Pause' : 'Play'}
        ></MyBtn>
      </div>
      <div className="details">
        <p>O numero total realizado de Pomodoros: {numberOfPomodoro} </p>
        <p>O numero total de ciclos realizado: {completedCycles} </p>
        <p>O tempo total trabalhado: {SecondsToTime(fullWorkingTime)} </p>
      </div>
    </div>
  );
}
