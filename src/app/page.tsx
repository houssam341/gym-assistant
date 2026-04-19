'use client';

import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import Header from '@/components/layout/Header';
import Dashboard from '@/components/Dashboard';
import ExerciseLibrary from '@/components/exercises/ExerciseLibrary';
import WorkoutTracker from '@/components/workout/WorkoutTracker';
import NutritionTracker from '@/components/nutrition/NutritionTracker';
import WorkoutTimer from '@/components/timer/WorkoutTimer';
import GoalPlanning from '@/components/goals/GoalPlanning';
import ProfileManager from '@/components/profile/ProfileManager';

const pageTitles: Record<string, string> = {
  dashboard: 'nav.dashboard',
  exercises: 'exercises.title',
  workout: 'workout.title',
  nutrition: 'nutrition.title',
  timer: 'timer.title',
  goals: 'goals.title',
  profile: 'profile.title',
};

export default function Home() {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} />;
      case 'exercises': return <ExerciseLibrary />;
      case 'workout': return <WorkoutTracker />;
      case 'nutrition': return <NutritionTracker />;
      case 'timer': return <WorkoutTimer />;
      case 'goals': return <GoalPlanning />;
      case 'profile': return <ProfileManager />;
      default: return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ms-[72px]' : 'lg:ms-64'} pb-20 lg:pb-0`}>
        <Header
          setMobileOpen={setMobileOpen}
          title={t(pageTitles[activeTab] || 'nav.dashboard', language)}
        />
        <div className="p-4 lg:p-6 max-w-5xl mx-auto">
          {renderContent()}
        </div>
      </main>

      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}