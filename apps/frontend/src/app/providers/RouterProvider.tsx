import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import ArchivePage from '~pages/ArchivePage';
import LoginPage from '~pages/login';
import SkeletonRegisterPage from '~pages/register/ui/SkeletonRegisterPage';
import RequestPage from '~pages/RequestPage';
import { RoutesPaths } from '~shared/enum/Routes';
import PageLoader from '~shared/ui/page-loader';
import AuthLayout from '~widgets/auth-layout/ui';
import WindowLayout from '~widgets/window-layout/ui';

const RegisterPage = lazy(() => import('~pages/register'));
const CreateRequestPage = lazy(() => import('~pages/CreateRequestPage'));
const NotFound = lazy(() => import('~pages/NotFound'));

export default function RouterProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={RoutesPaths.LOGIN} element={<LoginPage />} />
          <Route
            path={RoutesPaths.REGISTER}
            element={
              <Suspense fallback={<SkeletonRegisterPage />}>
                <RegisterPage />
              </Suspense>
            }
          />
        </Route>

        <Route
          path={RoutesPaths.DEFAULT_PATH}
          element={<Navigate to={RoutesPaths.ARCHIVE} replace />}
        />

        <Route path={RoutesPaths.ARCHIVE} element={<WindowLayout />}>
          <Route index element={<ArchivePage />} />
          <Route
            path={RoutesPaths.ID}
            element={
              <Suspense fallback={<PageLoader />}>
                <RequestPage />
              </Suspense>
            }
          />
          <Route
            path={RoutesPaths.CREATE}
            element={
              <Suspense fallback={<PageLoader />}>
                <CreateRequestPage />
              </Suspense>
            }
          />
        </Route>

        <Route
          path={RoutesPaths.ALL}
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
