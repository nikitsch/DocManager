import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

const TABLE_CONTROLS = {
  SEARCH: 'search',
  // FILTER_BY: 'filterBy',
  // FILTER_BY_VALUE: 'filterByValue',
  SORT: 'sort',
  ORDER: 'order',
  PAGE: 'page',
  PAGE_SIZE: 'pageSize',
};

const DEFAULT_PAGE = '0';
const DEFAULT_PAGE_SIZE = '10';

export function useTableControls() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(
    (search: string) => {
      setSearchParams(
        (prev) => {
          prev.set(TABLE_CONTROLS.SEARCH, search);

          return prev;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const handlePagination = useCallback(
    ({ page, pageSize }: GridPaginationModel) => {
      setSearchParams(
        (prev) => {
          prev.set(TABLE_CONTROLS.PAGE, page.toString());
          prev.set(TABLE_CONTROLS.PAGE_SIZE, pageSize.toString());

          return prev;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const handleSort = useCallback(
    (sortModel: GridSortModel) => {
      const sort = sortModel[0];

      setSearchParams(
        (prev) => {
          prev.set(TABLE_CONTROLS.SORT, sort?.field || '');
          prev.set(TABLE_CONTROLS.ORDER, sort?.sort || '');

          return prev;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const page = parseInt(searchParams.get(TABLE_CONTROLS.PAGE) || DEFAULT_PAGE);
  const pageSize = parseInt(
    searchParams.get(TABLE_CONTROLS.PAGE_SIZE) || DEFAULT_PAGE_SIZE
  );

  return {
    handlePagination,
    handleSearch,
    handleSort,
    paginationModel: {
      page,
      pageSize,
    },
    // sortModel: [
    //   {
    //     field: sortBy,
    //     sort: sortType,
    //   } as GridSortItem,
    // ],
  };
}
