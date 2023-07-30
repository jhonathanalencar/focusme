import Timer from './components/Timer';

// navigator.serviceWorker
//   .register('service-worker.js')
//   .then(async (serviceWorker) => {
//     let subscription = await serviceWorker.pushManager.getSubscription();

//     if (!subscription) {
//       const publicKeyResponse = await fetch(
//         'http://localhost:3333/push/public_key'
//       );
//       const publicKeyData = await publicKeyResponse.json();

//       subscription = await serviceWorker.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: publicKeyData.publicKey,
//       });
//     }

//     await fetch('http://localhost:3333/push/register', {
//       method: 'POST',
//       body: JSON.stringify({
//         subscription,
//       }),
//     });

//     await fetch('http://localhost:3333/push/send', {
//       method: 'POST',
//       body: JSON.stringify({
//         subscription,
//       }),
//     });
//   });

export default function HomePage() {
  return (
    <section className="flex h-full justify-center">
      <div className="flex w-full max-w-8xl justify-center p-4">
        <div className="h-fit w-full max-w-2xl rounded bg-theme-neutral-900 p-6 drop-shadow-md">
          <Timer />

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
