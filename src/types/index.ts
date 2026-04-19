export interface Exercise {
  id: string;
  name: { en: string; ar: string };
  category: ExerciseCategory;
  muscleGroup: MuscleGroup;
  description: { en: string; ar: string };
  gifUrl: string;
  instructions: { en: string[]; ar: string[] };
}

export type ExerciseCategory = 'compound' | 'isolation' | 'cardio' | 'stretching';
export type MuscleGroup = 'chest' | 'back' | 'shoulders' | 'biceps' | 'triceps' | 'legs' | 'core' | 'fullbody';

export interface WorkoutSet {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
  restTime: number;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: WorkoutSet[];
}

export interface WorkoutLog {
  id: string;
  date: string;
  name: string;
  exercises: WorkoutExercise[];
  duration: number;
  notes: string;
}

export interface BodyMetrics {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  bicepLeft?: number;
  bicepRight?: number;
  thighLeft?: number;
  thighRight?: number;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

export interface DailyNutrition {
  id: string;
  date: string;
  meals: Meal[];
  waterIntake: number;
}

export interface Supplement {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  taken: boolean;
}

export interface UserProfile {
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
  goal: GoalType;
  unit: 'metric' | 'imperial';
}

export type GoalType = 'weightLoss' | 'muscleBuilding' | 'weightGain' | 'maintenance' | 'endurance' | 'strength';

export interface GoalPlan {
  type: GoalType;
  targetWeight?: number;
  targetDate?: string;
  weeklyWorkouts: number;
  calorieTarget: number;
  proteinTarget: number;
  carbTarget: number;
  fatTarget: number;
}

export type Language = 'en' | 'ar';
export type Theme = 'dark' | 'light';