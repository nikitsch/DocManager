import { useState } from 'react';

export enum FilterBarPosition {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

const LOCAL_STORAGE_FILTER_BAR_POSITION_KEY =
  'LOCAL_STORAGE_FILTER_BAR_POSITION_KEY';

export function useFilterBarPosition() {
  const localStorageValue = localStorage.getItem(
    LOCAL_STORAGE_FILTER_BAR_POSITION_KEY
  ) as FilterBarPosition;

  const [filterBarPosition, setfilterBarPosition] = useState(
    localStorageValue || FilterBarPosition.OPEN
  );

  return {
    isFilterBarOpen: filterBarPosition === FilterBarPosition.OPEN,
    switchFilterBarPositions: () =>
      setfilterBarPosition((prev) => {
        const newValue =
          prev === FilterBarPosition.OPEN
            ? FilterBarPosition.CLOSE
            : FilterBarPosition.OPEN;

        localStorage.setItem(LOCAL_STORAGE_FILTER_BAR_POSITION_KEY, newValue);

        return newValue;
      }),
  };
}
