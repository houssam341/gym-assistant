'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Theme, UserProfile, GoalPlan, WorkoutLog, DailyNutrition, Supplement, BodyMetrics } from '@/types';

interface AppState {
  language: Language;
  theme: Theme;
  profile: UserProfile;
  goalPlan: GoalPlan | null;
  workoutLogs: WorkoutLog[];
  dailyNutrition: DailyNutrition[];
  supplements: Supplement[];
  bodyMetrics: BodyMetrics[];
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setProfile: (profile: UserProfile) => void;
  setGoalPlan: (plan: GoalPlan) => void;
  addWorkoutLog: (log: WorkoutLog) => void;
  updateDailyNutrition: (nutrition: DailyNutrition) => void;
  addSupplement: (supplement: Supplement) => void;
  updateSupplement: (id: string, updates: Partial<Supplement>) => void;
  removeSupplement: (id: string) => void;
  addBodyMetrics: (metrics: BodyMetrics) => void;
}

const defaultProfile: UserProfile = {
  name: '',
  age: 25,
  height: 175,
  weight: 75,
  gender: 'male',
  activityLevel: 'moderate',
  goal: 'muscleBuilding',
  unit: 'metric',
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<Theme>('dark');
  const [profile, setProfileState] = useState<UserProfile>(defaultProfile);
  const [goalPlan, setGoalPlanState] = useState<GoalPlan | null>(null);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition[]>([]);
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [bodyMetrics, setBodyMetrics] = useState<BodyMetrics[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('gym-lang') as Language;
    const savedTheme = localStorage.getItem('gym-theme') as Theme;
    const savedProfile = localStorage.getItem('gym-profile');
    const savedGoal = localStorage.getItem('gym-goal');
    const savedWorkouts = localStorage.getItem('gym-workouts');
    const savedNutrition = localStorage.getItem('gym-nutrition');
    const savedSupplements = localStorage.getItem('gym-supplements');
    const savedMetrics = localStorage.getItem('gym-metrics');

    if (savedLang) setLanguageState(savedLang);
    if (savedTheme) setThemeState(savedTheme);
    if (savedProfile) setProfileState(JSON.parse(savedProfile));
    if (savedGoal) setGoalPlanState(JSON.parse(savedGoal));
    if (savedWorkouts) setWorkoutLogs(JSON.parse(savedWorkouts));
    if (savedNutrition) setDailyNutrition(JSON.parse(savedNutrition));
    if (savedSupplements) setSupplements(JSON.parse(savedSupplements));
    if (savedMetrics) setBodyMetrics(JSON.parse(savedMetrics));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('gym-lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('gym-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme, mounted]);

  useEffect(() => {
    if (mounted) localStorage.setItem('gym-profile', JSON.stringify(profile));
  }, [profile, mounted]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const setTheme = (t: Theme) => setThemeState(t);
  const setProfile = (p: UserProfile) => setProfileState(p);
  const setGoalPlan = (plan: GoalPlan) => setGoalPlanState(plan);

  const addWorkoutLog = (log: WorkoutLog) => {
    setWorkoutLogs(prev => [log, ...prev]);
  };

  const updateDailyNutrition = (nutrition: DailyNutrition) => {
    setDailyNutrition(prev => {
      const idx = prev.findIndex(n => n.date === nutrition.date);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = nutrition;
        return updated;
      }
      return [nutrition, ...prev];
    });
  };

  const addSupplement = (supplement: Supplement) => {
    setSupplements(prev => [...prev, supplement]);
  };

  const updateSupplement = (id: string, updates: Partial<Supplement>) => {
    setSupplements(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const removeSupplement = (id: string) => {
    setSupplements(prev => prev.filter(s => s.id !== id));
  };

  const addBodyMetrics = (metrics: BodyMetrics) => {
    setBodyMetrics(prev => [metrics, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      language, theme, profile, goalPlan, workoutLogs, dailyNutrition, supplements, bodyMetrics,
      setLanguage, setTheme, setProfile, setGoalPlan, addWorkoutLog, updateDailyNutrition,
      addSupplement, updateSupplement, removeSupplement, addBodyMetrics,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}