import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import ArchivePage from '~pages/archive';
import LoginPage from '~pages/login';
import RecordViewPage from '~pages/view';
import SkeletonRegisterPage from '~pages/register/ui/SkeletonRegisterPage';
import AuthLayout from '~widgets/auth-layout';
import RequireAuth from '~widgets/require-auth';
import WindowLayout from '~widgets/window-layout';
import { RoutesPaths } from '~shared/model/enum';
import PageLoader from '~shared/ui/page-loader';

const RegisterPage = lazy(() => import('~pages/register'));
const CreateRecordPage = lazy(() => import('~pages/create'));
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

        <Route element={<RequireAuth />}>
          <Route path={RoutesPaths.ARCHIVE} element={<WindowLayout />}>
            <Route index element={<ArchivePage />} />
            <Route path={RoutesPaths.ID} element={<RecordViewPage />} />
            <Route
              path={RoutesPaths.CREATE}
              element={
                <Suspense fallback={<PageLoader />}>
                  <CreateRecordPage />
                </Suspense>
              }
            />
          </Route>
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
