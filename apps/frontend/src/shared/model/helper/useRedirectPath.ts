import { useLocation } from 'react-router';

export const useRedirectPath = () => {
  const { pathname, search } = useLocation();

  return encodeURIComponent(pathname + search);
};
