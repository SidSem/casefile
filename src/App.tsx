import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useGameStore } from './store/useGameStore';
import { Header } from './components/layout/Header';
import { NoiseOverlay } from './components/layout/NoiseOverlay';
import { SettingsModal } from './pages/SettingsModal';

import { IntroPage } from './pages/IntroPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { HeadquartersPage } from './pages/HeadquartersPage';
import { ArchivePage } from './pages/ArchivePage';
import { CaseBriefingPage } from './pages/CaseBriefingPage';
import { InvestigationPage } from './pages/InvestigationPage';
import { ResultsPage } from './pages/ResultsPage';
import { ProfilePage } from './pages/ProfilePage';

// Route Guard component
const RootRedirect: React.FC = () => {
  const { settings, profile } = useGameStore();

  if (!settings.introCompleted) {
    return <Navigate to="/intro" replace />;
  }
  if (!profile) {
    return <Navigate to="/onboarding" replace />;
  }
  return <Navigate to="/hq" replace />;
};

// Layout wrapper for pages that show Header
const MainLayout: React.FC<{ children: React.ReactNode; onOpenSettings: () => void }> = ({
  children,
  onOpenSettings,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal-950 text-charcoal-100">
      <Header onOpenSettings={onOpenSettings} />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
};

export function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { updateSettings } = useGameStore();

  const handleReplayIntro = () => {
    updateSettings({ introCompleted: false });
    window.location.href = '/intro';
  };

  return (
    <BrowserRouter>
      <NoiseOverlay />
      
      <Routes>
        {/* Cinematic Intro & Onboarding (Fullscreen) */}
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Authenticated Workspace Pages */}
        <Route
          path="/hq"
          element={
            <MainLayout onOpenSettings={() => setIsSettingsOpen(true)}>
              <HeadquartersPage />
            </MainLayout>
          }
        />
        <Route
          path="/archive"
          element={
            <MainLayout onOpenSettings={() => setIsSettingsOpen(true)}>
              <ArchivePage />
            </MainLayout>
          }
        />
        <Route
          path="/briefing/:caseId"
          element={
            <MainLayout onOpenSettings={() => setIsSettingsOpen(true)}>
              <CaseBriefingPage />
            </MainLayout>
          }
        />
        <Route
          path="/investigation/:caseId"
          element={
            <MainLayout onOpenSettings={() => setIsSettingsOpen(true)}>
              <InvestigationPage />
            </MainLayout>
          }
        />
        <Route
          path="/results/:caseId"
          element={
            <MainLayout onOpenSettings={() => setIsSettingsOpen(true)}>
              <ResultsPage />
            </MainLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLayout onOpenSettings={() => setIsSettingsOpen(true)}>
              <ProfilePage />
            </MainLayout>
          }
        />

        {/* Root Redirect */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<RootRedirect />} />
      </Routes>

      {/* Global Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onReplayIntro={handleReplayIntro}
      />
    </BrowserRouter>
  );
}

export default App;
