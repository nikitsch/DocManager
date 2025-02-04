import type { FC } from 'react';
import { Outlet } from 'react-router';

const WindowLayout: FC = () => (
  <>
    <div>Header</div>
    <Outlet />
  </>
);

export default WindowLayout;
