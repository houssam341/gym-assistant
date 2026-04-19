import { UserProfile, GoalType } from '@/types';

export function calculateBMR(profile: UserProfile): number {
  if (profile.gender === 'male') {
    return 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  }
  return 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
}

export function calculateTDEE(profile: UserProfile): number {
  const bmr = calculateBMR(profile);
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };
  return Math.round(bmr * multipliers[profile.activityLevel]);
}

export function calculateBMI(profile: UserProfile): number {
  const heightM = profile.height / 100;
  return Math.round((profile.weight / (heightM * heightM)) * 10) / 10;
}

export function calculateDailyProtein(profile: UserProfile): number {
  const multipliers: Record<GoalType, number> = {
    weightLoss: 2.0,
    muscleBuilding: 2.2,
    weightGain: 1.8,
    maintenance: 1.6,
    endurance: 1.4,
    strength: 2.4,
  };
  return Math.round(profile.weight * (multipliers[profile.goal] || 1.6));
}

export function getGoalCalories(profile: UserProfile, goal: GoalType): number {
  const tdee = calculateTDEE(profile);
  const adjustments: Record<GoalType, number> = {
    weightLoss: -500,
    muscleBuilding: 300,
    weightGain: 500,
    maintenance: 0,
    endurance: 200,
    strength: 400,
  };
  return tdee + (adjustments[goal] || 0);
}

export function getGoalMacros(profile: UserProfile, goal: GoalType) {
  const calories = getGoalCalories(profile, goal);
  const protein = calculateDailyProtein(profile);
  const proteinCals = protein * 4;

  let fatRatio = 0.25;
  if (goal === 'weightLoss') fatRatio = 0.20;
  if (goal === 'weightGain') fatRatio = 0.30;

  const fatCals = calories * fatRatio;
  const fat = Math.round(fatCals / 9);
  const carbCals = calories - proteinCals - fatCals;
  const carbs = Math.round(carbCals / 4);

  return { calories, protein, carbs, fat };
}

export function getBMICategory(bmi: number): { en: string; ar: string; color: string } {
  if (bmi < 18.5) return { en: 'Underweight', ar: 'نقص الوزن', color: 'text-blue-400' };
  if (bmi < 25) return { en: 'Normal', ar: 'طبيعي', color: 'text-green-400' };
  if (bmi < 30) return { en: 'Overweight', ar: 'زيادة الوزن', color: 'text-yellow-400' };
  return { en: 'Obese', ar: 'سمنة', color: 'text-red-400' };
}