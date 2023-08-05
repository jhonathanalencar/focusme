'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Cycle, useCyclesStore } from '@/stores/cycles';

dayjs.extend(relativeTime);

const cycleStatusColors = {
  inProgress: 'bg-theme-yellow-400',
  completed: 'bg-theme-teal-400',
  interrupted: 'bg-theme-red-400',
};

function sortCyclebyMostRecent(cycles: Cycle[]) {
  return cycles
    .slice()
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
}

export default function TableBody() {
  const { cycles } = useCyclesStore().state;

  const orderedCycles = sortCyclebyMostRecent(cycles);

  const content = orderedCycles.map((cycle) => {
    const status = cycle.finishDate
      ? 'completed'
      : cycle.interruptDate
      ? 'interrupted'
      : 'inProgress';

    return (
      <tr
        key={cycle.id}
        className="group border-t-2 border-theme-gray-900 odd:bg-theme-neutral-800"
      >
        <td className="max-w-2xl px-3 py-2 font-semibold text-theme-gray-200 group-last:rounded-bl">
          <span className="wrap-text">
            {cycle.task || 'No task assigned to this cycle'}
          </span>
        </td>
        <td className="px-3 py-2 font-semibold text-theme-gray-200">
          <span>
            {cycle.duration} {cycle.duration > 1 ? 'minutes' : 'minute'}
          </span>
        </td>
        <td className="px-3 py-2 font-semibold text-theme-gray-200">
          <span>{dayjs(new Date(cycle.startDate)).fromNow()}</span>
        </td>
        <td className="px-3 py-2 font-semibold text-theme-gray-200 group-last:rounded-br">
          <div className="flex items-center gap-1">
            <div
              className={`h-2 w-2 rounded-full ${cycleStatusColors[status]}`}
            />
            <span>{status === 'inProgress' ? 'in progress' : status}</span>
          </div>
        </td>
      </tr>
    );
  });

  return content;
}
