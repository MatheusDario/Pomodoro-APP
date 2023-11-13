import { SecondsToMinutes } from '../utils/seconds-to-minutes';

interface Props {
  mainTimer: number;
}

export function Timer(props: Props) {
  return <div className="timer"> {SecondsToMinutes(props.mainTimer)} </div>;
}
