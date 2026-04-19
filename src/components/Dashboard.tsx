'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { calculateDailyProtein, calculateTDEE, getGoalCalories } from '@/lib/calculations';
import {
  Dumbbell, Flame, Droplets, TrendingUp, Zap,
  UtensilsCrossed, Timer, ArrowRight, Trophy, Activity
} from 'lucide-react';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({ setActiveTab }: DashboardProps) {
  const { language, profile, workoutLogs, dailyNutrition, supplements } = useApp();
  const today = new Date().toISOString().split('T')[0];
  const todayNutrition = dailyNutrition.find(n => n.date === today);
  const totalCalories = todayNutrition?.meals.reduce((sum, m) => sum + m.calories, 0) || 0;
  const totalProtein = todayNutrition?.meals.reduce((sum, m) => sum + m.protein, 0) || 0;
  const waterIntake = todayNutrition?.waterIntake || 0;
  const weekWorkouts = workoutLogs.filter(w => {
    const d = new Date(w.date);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  const calorieTarget = getGoalCalories(profile, profile.goal);
  const proteinTarget = calculateDailyProtein(profile);
  const caloriePercent = Math.min((totalCalories / calorieTarget) * 100, 100);
  const proteinPercent = Math.min((totalProtein / proteinTarget) * 100, 100);

  const supplementsTaken = supplements.filter(s => s.taken).length;

  const quickActions = [
    { icon: Dumbbell, label: 'dashboard.startWorkout', tab: 'workout', gradient: 'from-orange-500 to-red-500' },
    { icon: UtensilsCrossed, label: 'dashboard.logMeal', tab: 'nutrition', gradient: 'from-green-500 to-emerald-500' },
    { icon: Timer, label: 'dashboard.setTimer', tab: 'timer', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Zap, label: 'dashboard.viewExercises', tab: 'exercises', gradient: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 lg:p-8 text-white">
        <div className="relative">
          <p className="text-orange-100 text-sm mb-1">{t('dashboard.welcome', language)}</p>
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">{profile.name || (language === 'ar' ? 'بطل' : 'Champion')} 💪</h2>
          <p className="text-orange-100 text-sm lg:text-base">
            {language === 'ar'
              ? `لقد أكملت ${weekWorkouts} تمارين هذا الأسبوع. استمر!`
              : `You've completed ${weekWorkouts} workouts this week. Keep going!`
            }
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-xs font-medium text-zinc-400">{Math.round(caloriePercent)}%</span>
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white">{totalCalories}</p>
          <p className="text-xs text-zinc-500 mt-0.5">{t('dashboard.caloriesConsumed', language)}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <Activity className="w-5 h-5 text-blue-500" />
            <span className="text-xs font-medium text-zinc-400">{Math.round(proteinPercent)}%</span>
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white">{totalProtein}g</p>
          <p className="text-xs text-zinc-500 mt-0.5">{t('dashboard.proteinIntake', language)}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <Droplets className="w-5 h-5 text-cyan-500" />
            <span className="text-xs font-medium text-zinc-400">{waterIntake}/8</span>
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white">{waterIntake}</p>
          <p className="text-xs text-zinc-500 mt-0.5">{t('dashboard.waterIntake', language)}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-xs font-medium text-zinc-400">{weekWorkouts}/5</span>
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white">{weekWorkouts}</p>
          <p className="text-xs text-zinc-500 mt-0.5">{t('dashboard.workoutsThisWeek', language)}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">{t('dashboard.quickActions', language)}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <button
                key={action.tab}
                onClick={() => setActiveTab(action.tab)}
                className="group relative overflow-hidden bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 hover:border-transparent transition-all hover:shadow-lg"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative flex flex-col items-center gap-2 text-center">
                  <Icon className="w-6 h-6 text-zinc-400 group-hover:text-white" />
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-white">
                    {t(action.label, language)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}