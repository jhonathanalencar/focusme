declare module '*.mp3' {
  const src: string;
  export default src;
}

type TimerSettins = {
  duration: number;
  breakTime: number;
  playSound: boolean;
};
