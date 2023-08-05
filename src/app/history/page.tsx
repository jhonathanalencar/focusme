import TableBody from './components/TableBody';
import { ClientOnly } from '@/components/ClientOnly';

export default function HistoryPage() {
  return (
    <section className="flex h-full justify-center">
      <div className="flex w-full max-w-8xl justify-center p-4">
        <div className="w-full overflow-x-auto">
          <h1 className="text-2xl font-bold tracking-wide text-theme-gray-50 md:text-3xl">
            History
          </h1>

          <table className="mt-4 w-full min-w-max border-collapse  rounded bg-theme-neutral-900 p-3 shadow-sm">
            <thead>
              <tr className="text-left">
                <th className="w-1/2 rounded-tl bg-theme-red-400 py-2 pl-2 tracking-wide text-theme-gray-100">
                  Task
                </th>
                <th className="bg-theme-red-400 py-2 pl-2 tracking-wide text-theme-gray-100">
                  Duration
                </th>
                <th className="bg-theme-red-400 py-2 pl-2 tracking-wide text-theme-gray-100">
                  Start
                </th>
                <th className="rounded-tr bg-theme-red-400 py-2 pl-2 tracking-wide text-theme-gray-100">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <ClientOnly>
                <TableBody />
              </ClientOnly>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
