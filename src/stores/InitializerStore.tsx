import { useRef } from 'react';
import { useCyclesStore, type CyclesState } from './cycles';

type InitializerStoreProps = CyclesState;

export default function InitializerStore(state: InitializerStoreProps) {
  const initializer = useRef(false);

  if (!initializer.current) {
    useCyclesStore.setState({ state });
    initializer.current = true;
  }

  return null;
}
