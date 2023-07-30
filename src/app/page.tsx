'use client';

import Header from '@/components/Header';
import useCountdown from '@/hooks/useCountdown';

navigator.serviceWorker
  .register('service-worker.js')
  .then(async (serviceWorker) => {
    let subscription = await serviceWorker.pushManager.getSubscription();

    if (!subscription) {
      const publicKeyResponse = await fetch(
        'http://localhost:3333/push/public_key'
      );
      const publicKeyData = await publicKeyResponse.json();

      subscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKeyData.publicKey,
      });
    }

    await fetch('http://localhost:3333/push/register', {
      method: 'POST',
      body: JSON.stringify({
        subscription,
      }),
    });

    await fetch('http://localhost:3333/push/send', {
      method: 'POST',
      body: JSON.stringify({
        subscription,
      }),
    });
  });

const digitStyles =
  'h-32 w-24 md:rounded-md text-8xl leading-[128px] text-theme-gray-100 md:h-48 md:w-32 md:text-9xl md:leading-[192px]';
export default function HomePage() {
  const { minutes, seconds, startCountdown } = useCountdown(0.1);

  return (
    <section className="flex h-full items-center justify-center">
      <div className="flex w-full max-w-8xl justify-center p-4">
        <div className="rounded bg-theme-neutral-900 px-4 py-6 drop-shadow-md">
          <Header />

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

          <button
            type="button"
            onClick={startCountdown}
            className="mt-4 h-12 w-full rounded bg-theme-pink-600 text-xl font-bold uppercase text-theme-gray-100 transition-colors hover:bg-theme-pink-700"
          >
            Start
          </button>

          <div className="mt-6">
            <h2 className="text-base font-bold text-theme-gray-50 md:text-xl">
              Task
            </h2>
            <input
              type="text"
              placeholder="What are you working on?"
              className="mt-2 w-full border-b-2 border-theme-beige-300 bg-transparent text-base text-theme-gray-200 outline-none placeholder:text-theme-gray-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
