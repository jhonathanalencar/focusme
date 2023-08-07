import { ClientOnly } from '../components/ClientOnly';
import Timer from './components/Timer';

export default function HomePage() {
  return (
    <section className="flex h-full justify-center">
      <div className="flex w-full max-w-8xl justify-center p-4">
        <div className="h-fit w-full max-w-2xl">
          <ClientOnly>
            <Timer />
          </ClientOnly>
        </div>
      </div>
    </section>
  );
}
