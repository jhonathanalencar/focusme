'use client';

import useCountdown from '@/hooks/useCountdown';

const digitStyles =
  'h-32 w-24 md:rounded-md text-8xl leading-[128px] text-theme-gray-100 md:h-48 md:w-32 md:text-9xl md:leading-[192px]';
export default function HomePage() {
  const { minutes, seconds, startCountdown } = useCountdown(0.1);

  return (
    <section className="flex h-full items-center justify-center">
      <div className="flex w-full max-w-8xl justify-center p-4">
        <div className="rounded bg-theme-neutral-900 px-4 py-6 drop-shadow-md">
          <div className="flex flex-col items-center justify-center bg-theme-neutral-800 text-center md:flex-row">
            <div className="flex items-center overflow-hidden rounded-tl-md rounded-tr-md md:gap-1">
              <div className={digitStyles}>{minutes[0]}</div>
              <div className={digitStyles}>{minutes[1]}</div>
            </div>
            <span className="hidden text-9xl text-theme-pink-600 md:mx-2 md:block md:h-48 md:leading-[192px]">
              :
            </span>
            <div className="flex items-center overflow-hidden rounded-bl-md rounded-br-md md:gap-1">
              <div className={digitStyles}>{seconds[0]}</div>
              <div className={digitStyles}>{seconds[1]}</div>
            </div>
          </div>

          <button onClick={startCountdown}>Start</button>
        </div>
      </div>
    </section>
  );
}
