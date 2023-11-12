import { SecondsTimer } from '../utils/seconds-to-timer';

interface Props {
  mainTimer: number;
}

export function Timer(props: Props) {
  return <div className="timer"> {SecondsTimer(props.mainTimer)} </div>;
}
