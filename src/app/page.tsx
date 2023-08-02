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
        <div className="flex h-fit w-full max-w-2xl flex-col items-center gap-4">
          <Timer />
        </div>
      </div>
    </section>
  );
}
