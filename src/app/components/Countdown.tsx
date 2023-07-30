const digitStyles =
  'h-32 w-24 md:rounded-md text-8xl leading-[128px] text-theme-gray-100 md:h-48 md:w-32 md:text-9xl md:leading-[192px]';

interface CountdownProps {
  minutes: string;
  seconds: string;
}

export default function Countdown({ minutes, seconds }: CountdownProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-theme-neutral-800 text-center sm:flex-row">
      <div className="flex items-center overflow-hidden rounded-tl-md rounded-tr-md sm:gap-1">
        <div className={digitStyles}>{minutes[0]}</div>
        <div className={digitStyles}>{minutes[1]}</div>
      </div>
      <span className="hidden text-9xl text-theme-pink-600 sm:mx-2 sm:block sm:h-48 sm:leading-[192px]">
        :
      </span>
      <div className="flex items-center overflow-hidden rounded-bl-md rounded-br-md sm:gap-1">
        <div className={digitStyles}>{seconds[0]}</div>
        <div className={digitStyles}>{seconds[1]}</div>
      </div>
    </div>
  );
}
