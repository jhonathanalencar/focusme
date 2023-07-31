import * as Dialog from '@radix-ui/react-dialog';

import { X } from '@/lib/phosphor';

export default function TimerOptionsDialog() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 flex justify-center bg-theme-black/60 p-4">
        <Dialog.Content className="h-fit w-full max-w-[400px] rounded bg-theme-gray-800 p-4 drop-shadow-md">
          <div className="flex items-center justify-between border-b border-b-theme-gray-600 pb-2">
            <Dialog.Title className="text-lg font-semibold text-theme-gray-100">
              Timer Options
            </Dialog.Title>

            <Dialog.Close
              aria-label="Close Dialog"
              className="group rounded focus-visible:bg-theme-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-gray-800"
            >
              <X
                className="h-6 w-6 text-theme-gray-100 transition-colors hover:text-theme-red-400 group-focus-visible:text-theme-red-400"
                weight="bold"
              />
            </Dialog.Close>
          </div>

          <h2 className="mt-2 text-base font-medium text-theme-gray-200">
            Time (minutes)
          </h2>

          <div className="mt-1 flex items-center gap-3">
            <label className="flex flex-col items-start">
              <span className="text-base font-bold text-theme-gray-300">
                Duration
              </span>
              <input
                type="number"
                className="h-8 w-20 rounded bg-theme-gray-900 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-gray-800"
                min={1}
                defaultValue={90}
              />
            </label>

            <label className="flex flex-col items-start">
              <span className="text-base font-bold text-theme-gray-300">
                Break
              </span>
              <input
                type="number"
                className="h-8 w-20 rounded bg-theme-gray-900 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-gray-800"
                min={1}
                defaultValue={20}
              />
            </label>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
