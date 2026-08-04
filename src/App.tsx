import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { SignUp } from '@/pages/SignUp';
import { EditProfile } from '@/pages/EditProfile';
import { WorkspacesList } from '@/pages/WorkspacesList';
import { WorkspaceDetail } from '@/pages/WorkspaceDetail';
import { HostWorkspacesList } from '@/pages/host/HostWorkspacesList';
import { HostWorkspaceForm } from '@/pages/host/HostWorkspaceForm';
import { HostWorkspacePhotos } from '@/pages/host/HostWorkspacePhotos';
import { Showcase } from '@/showcase/Showcase';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PublicOnlyRoute } from '@/components/PublicOnlyRoute';
import { HostRoute } from '@/components/HostRoute';

const Landing01 = lazy(() => import('@/showcase/landing-01/Landing01').then((m) => ({ default: m.Landing01 })));
const Landing02 = lazy(() => import('@/showcase/landing-02/Landing02').then((m) => ({ default: m.Landing02 })));
const Landing03 = lazy(() => import('@/showcase/landing-03/Landing03').then((m) => ({ default: m.Landing03 })));
const Landing04 = lazy(() => import('@/showcase/landing-04/Landing04').then((m) => ({ default: m.Landing04 })));
const Landing05 = lazy(() => import('@/showcase/landing-05/Landing05').then((m) => ({ default: m.Landing05 })));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <Home />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <SignUp />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/perfil/completar"
          element={
            <ProtectedRoute>
              <EditProfile mode="onboarding" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil/editar"
          element={
            <ProtectedRoute>
              <EditProfile mode="settings" />
            </ProtectedRoute>
          }
        />
        <Route path="/workspaces" element={<WorkspacesList />} />
        <Route path="/workspaces/:id" element={<WorkspaceDetail />} />

        <Route
          path="/host/workspaces"
          element={
            <HostRoute>
              <HostWorkspacesList />
            </HostRoute>
          }
        />
        <Route
          path="/host/workspaces/novo"
          element={
            <HostRoute>
              <HostWorkspaceForm mode="create" />
            </HostRoute>
          }
        />
        <Route
          path="/host/workspaces/:id/editar"
          element={
            <HostRoute>
              <HostWorkspaceForm mode="edit" />
            </HostRoute>
          }
        />
        <Route
          path="/host/workspaces/:id/fotos"
          element={
            <HostRoute>
              <HostWorkspacePhotos />
            </HostRoute>
          }
        />

        <Route path="/showcase" element={<Showcase />} />
        <Route
          path="/showcase/landing-01"
          element={
            <Suspense fallback={null}>
              <Landing01 />
            </Suspense>
          }
        />
        <Route
          path="/showcase/landing-02"
          element={
            <Suspense fallback={null}>
              <Landing02 />
            </Suspense>
          }
        />
        <Route
          path="/showcase/landing-03"
          element={
            <Suspense fallback={null}>
              <Landing03 />
            </Suspense>
          }
        />
        <Route
          path="/showcase/landing-04"
          element={
            <Suspense fallback={null}>
              <Landing04 />
            </Suspense>
          }
        />
        <Route
          path="/showcase/landing-05"
          element={
            <Suspense fallback={null}>
              <Landing05 />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
