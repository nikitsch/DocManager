import { useState } from 'react';

export enum FilterBarPosition {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

export function useFilterBarPosition() {
  const [filterBarPosition, setfilterBarPosition] = useState(
    FilterBarPosition.OPEN
  );

  return {
    filterBarPosition,
    isFBPOpen: filterBarPosition === FilterBarPosition.OPEN,
    setfilterBarPosition,
  };
}
