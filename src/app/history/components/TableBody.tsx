'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

import { useCyclesStore } from '@/stores/cycles';

export default function TableBody() {
  const { cycles } = useCyclesStore().state;

  const content = cycles.map((cycle) => {
    return (
      <tr
        key={cycle.id}
        className="group border-t-2 border-theme-gray-900 odd:bg-theme-neutral-800"
      >
        <td className=" py-2 pl-2 text-theme-gray-200 group-last:rounded-bl">
          {cycle.task || 'No task assigned to this cycle'}
        </td>
        <td className="py-2 pl-2 text-theme-gray-200">
          {cycle.duration} {cycle.duration > 1 ? 'minutes' : 'minute'}
        </td>
        <td className="py-2 pl-2 text-theme-gray-200">
          {dayjs(new Date(cycle.startDate)).fromNow()}
        </td>
        <td className="flex items-center gap-1 py-2 pl-2 text-theme-gray-200 group-last:rounded-br">
          <div className="h-2 w-2 rounded-full bg-theme-yellow-400" />
          In progress
        </td>
      </tr>
    );
  });
  return content;
}
