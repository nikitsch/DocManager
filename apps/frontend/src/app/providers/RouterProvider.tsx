import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import ArchivePage from '~pages/ArchivePage';
import LoginPage from '~pages/LoginPage';
import RequestPage from '~pages/RequestPage';
import { RoutesPaths } from '~shared/enum/Routes';
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
            <Suspense fallback={<div>Loading...</div>}>
              <AuthLayout />
            </Suspense>
          }
        >
          <Route
            path={RoutesPaths.LOGIN}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path={RoutesPaths.REGISTER}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <RegisterPage />
              </Suspense>
            }
          />
        </Route>

        <Route
          path={RoutesPaths.ARCHIVE}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <WindowLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ArchivePage />
              </Suspense>
            }
          />
          <Route
            path=":id" //TODO: RoutesPaths
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <RequestPage />
              </Suspense>
            }
          />
          <Route
            path={RoutesPaths.CREATE}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <CreateRequestPage />
              </Suspense>
            }
          />
        </Route>

        <Route
          path={RoutesPaths.ALL}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
