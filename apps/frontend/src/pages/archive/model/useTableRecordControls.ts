import {
  GridPaginationModel,
  GridSortItem,
  GridSortModel,
} from '@mui/x-data-grid';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

const TABLE_CONTROLS = {
  SEARCH: 'search',
  FILTERS: 'filters',
  SORT: 'sort',
  ORDER: 'order',
  PAGE: 'page',
  PAGE_SIZE: 'pageSize',
};

const DEFAULT_PAGE = '0';
const DEFAULT_PAGE_SIZE = '10';

export function useTableRecordControls() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(
    (search: string) => {
      setSearchParams(
        (prev) => {
          if (search) {
            prev.set(TABLE_CONTROLS.SEARCH, search);
          } else {
            prev.delete(TABLE_CONTROLS.SEARCH);
          }

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
          if (sort) {
            prev.set(TABLE_CONTROLS.SORT, sort?.field || '');
            prev.set(TABLE_CONTROLS.ORDER, sort?.sort || '');
          } else {
            prev.delete(TABLE_CONTROLS.SORT);
            prev.delete(TABLE_CONTROLS.ORDER);
          }

          return prev;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const handleFilters = useCallback(
    (filter: Record<string, string> | undefined) => {
      setSearchParams(
        (prev) => {
          if (filter) {
            prev.set(TABLE_CONTROLS.FILTERS, JSON.stringify(filter));
          } else {
            prev.delete(TABLE_CONTROLS.FILTERS);
          }

          return prev;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const sort = searchParams.get(TABLE_CONTROLS.SORT);
  const order = searchParams.get(TABLE_CONTROLS.ORDER);
  const page = parseInt(searchParams.get(TABLE_CONTROLS.PAGE) || DEFAULT_PAGE);
  const pageSize = parseInt(
    searchParams.get(TABLE_CONTROLS.PAGE_SIZE) || DEFAULT_PAGE_SIZE
  );
  const filters = searchParams.get(TABLE_CONTROLS.FILTERS) || '';
  const search = searchParams.get(TABLE_CONTROLS.SEARCH) || '';

  return {
    handlePagination,
    handleSearch,
    handleSort,
    handleFilters,
    paginationModel: {
      page,
      pageSize,
    } as GridPaginationModel,
    sortModel: [
      {
        field: sort,
        sort: order,
      } as GridSortItem,
    ],
    tableSearchParams: {
      filters,
      search,
    },
  };
}
