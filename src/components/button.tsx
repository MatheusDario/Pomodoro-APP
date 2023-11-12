interface Props {
  text: string;
  className?: string;
  onClick?: () => void;
}

export function MyBtn(props: Props) {
  return (
    <button onClick={props.onClick} className={props.className}>
      {' '}
      {props.text}{' '}
    </button>
  );
}
