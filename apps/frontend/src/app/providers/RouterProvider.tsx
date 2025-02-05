import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import ArchivePage from '~pages/ArchivePage';
import LoginPage from '~pages/LoginPage';
import RequestPage from '~pages/RequestPage';
import { RoutesPaths } from '~shared/enum/Routes';
import PageLoader from '~shared/ui/page-loader/PageLoader';
import AuthLayout from '~widgets/AuthLayout/ui';
import WindowLayout from '~widgets/WindowLayout/ui';

const RegisterPage = lazy(() => import('~pages/RegisterPage'));
const CreateRequestPage = lazy(() => import('~pages/CreateRequestPage'));
const NotFound = lazy(() => import('~pages/NotFound'));

export default function RouterProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Suspense fallback={<PageLoader />}>
              <AuthLayout />
            </Suspense>
          }
        >
          <Route
            path={RoutesPaths.LOGIN}
            element={
              <Suspense fallback={<PageLoader />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path={RoutesPaths.REGISTER}
            element={
              <Suspense fallback={<PageLoader />}>
                <RegisterPage />
              </Suspense>
            }
          />
        </Route>

        <Route
          path={RoutesPaths.DEFAULT_PATH}
          element={<Navigate to={RoutesPaths.ARCHIVE} replace />}
        />

        <Route
          path={RoutesPaths.ARCHIVE}
          element={
            <Suspense fallback={<PageLoader />}>
              <WindowLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                <ArchivePage />
              </Suspense>
            }
          />
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
