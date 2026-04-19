'use client';

import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { Plus, Trash2, Check, Play, Square, X, Clock, Dumbbell } from 'lucide-react';
import { exercises } from '@/data/exercises';
import { WorkoutExercise, WorkoutSet, WorkoutLog, BodyMetrics } from '@/types';

export default function WorkoutTracker() {
  const { language, addWorkoutLog, workoutLogs, addBodyMetrics, bodyMetrics } = useApp();
  const [isActive, setIsActive] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  const [notes, setNotes] = useState('');
  const [startTime, setStartTime] = useState<number>(0);
  const [showExPicker, setShowExPicker] = useState(false);
  const [tab, setTab] = useState<'workout' | 'history' | 'metrics'>('workout');

  const startWorkout = () => {
    setIsActive(true);
    setStartTime(Date.now());
    setWorkoutName(language === 'ar' ? 'تمرين جديد' : 'New Workout');
  };

  const addExercise = (exId: string) => {
    setWorkoutExercises(prev => [...prev, {
      exerciseId: exId,
      sets: [{ id: Date.now().toString(), weight: 0, reps: 0, completed: false, restTime: 90 }],
    }]);
    setShowExPicker(false);
  };

  const finishWorkout = () => {
    const duration = Math.round((Date.now() - startTime) / 60000);
    addWorkoutLog({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      name: workoutName,
      exercises: workoutExercises,
      duration,
      notes,
    });
    setIsActive(false);
    setWorkoutExercises([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl p-1">
        {['workout', 'history', 'metrics'].map(tId => (
          <button key={tId} onClick={() => setTab(tId as any)} className={`flex-1 py-2 rounded-xl text-sm font-medium ${tab === tId ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'text-zinc-500'}`}>
            {tId}
          </button>
        ))}
      </div>

      {tab === 'workout' && (
        isActive ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 text-white">
               <input value={workoutName} onChange={e => setWorkoutName(e.target.value)} className="bg-white/20 rounded-xl px-3 py-2 text-sm w-full" />
            </div>
            {workoutExercises.map((wex, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200">
                <h4 className="font-bold mb-3">{exercises.find(e => e.id === wex.exerciseId)?.name[language]}</h4>
                <button onClick={() => addExercise(wex.exerciseId)} className="text-xs text-orange-500">+ Set</button>
              </div>
            ))}
            <button onClick={() => setShowExPicker(true)} className="w-full py-3 border-2 border-dashed rounded-2xl">+ Add Exercise</button>
            <button onClick={finishWorkout} className="w-full py-4 bg-green-500 text-white rounded-2xl font-bold">Finish</button>
          </div>
        ) : (
          <button onClick={startWorkout} className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold">Start New Workout</button>
        )
      )}

      {showExPicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-sm p-4">
            <div className="flex justify-between mb-4"><h3 className="font-bold">Select Exercise</h3><button onClick={() => setShowExPicker(false)}><X/></button></div>
            {exercises.map(ex => (
              <button key={ex.id} onClick={() => addExercise(ex.id)} className="w-full text-start p-2 hover:bg-zinc-100 rounded-lg">{ex.name[language]}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}