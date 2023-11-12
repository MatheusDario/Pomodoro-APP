import { PomodoroTimer } from './components/pomodoro-timer';

function App() {
  return (
    <>
      <div>
        <PomodoroTimer defaultPomodoroTimer={1500} />
      </div>
    </>
  );
}

export default App;
