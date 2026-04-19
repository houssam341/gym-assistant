import { Exercise } from '@/types';

export const exercises: Exercise[] = [
  {
    id: 'bench-press',
    name: { en: 'Barbell Bench Press', ar: 'ضغط البنش بالبار' },
    category: 'compound',
    muscleGroup: 'chest',
    description: {
      en: 'The king of chest exercises. Lie on a flat bench and press the barbell upward.',
      ar: 'ملك تمارين الصدر. استلقِ على مقعد مسطح وادفع البار للأعلى.'
    },
    gifUrl: '/api/placeholder/exercise/bench-press',
    instructions: {
      en: ['Lie flat on the bench with feet on the floor', 'Grip the bar slightly wider than shoulder width', 'Lower the bar to mid-chest', 'Press the bar back up to full arm extension', 'Keep your back slightly arched and shoulder blades squeezed'],
      ar: ['استلقِ على المقعد مع وضع القدمين على الأرض', 'أمسك البار بعرض أوسع قليلاً من الأكتاف', 'أنزل البار إلى منتصف الصدر', 'ادفع البار للأعلى حتى تمديد الذراعين بالكامل', 'حافظ على تقوس خفيف في الظهر وضغط لوحي الكتف']
    }
  },
  {
    id: 'deadlift',
    name: { en: 'Deadlift', ar: 'الرفعة الميتة' },
    category: 'compound',
    muscleGroup: 'back',
    description: {
      en: 'The ultimate compound movement targeting the entire posterior chain.',
      ar: 'التمرين المركب الأقوى الذي يستهدف السلسلة الخلفية بالكامل.'
    },
    gifUrl: '/api/placeholder/exercise/deadlift',
    instructions: {
      en: ['Stand with feet hip-width apart, bar over mid-foot', 'Bend at hips and knees to grip the bar', 'Keep chest up and back flat', 'Drive through heels to stand up', 'Lock out hips at the top'],
      ar: ['قف بعرض الوركين، البار فوق منتصف القدم', 'انحنِ من الوركين والركبتين لإمساك البار', 'حافظ على الصدر مرتفعاً والظهر مستقيماً', 'ادفع من الكعبين للوقوف', 'أقفل الوركين في الأعلى']
    }
  },
  {
    id: 'squats',
    name: { en: 'Barbell Squats', ar: 'القرفصاء بالبار' },
    category: 'compound',
    muscleGroup: 'legs',
    description: {
      en: 'The king of all exercises. Builds massive legs and overall strength.',
      ar: 'ملك جميع التمارين. يبني أرجل ضخمة وقوة شاملة.'
    },
    gifUrl: '/api/placeholder/exercise/squats',
    instructions: {
      en: ['Place bar on upper back, feet shoulder-width apart', 'Bend knees and hips to lower down', 'Keep chest up and knees tracking over toes', 'Descend until thighs are parallel to floor', 'Drive up through heels'],
      ar: ['ضع البار على أعلى الظهر، القدمين بعرض الأكتاف', 'اثنِ الركبتين والوركين للنزول', 'حافظ على الصدر مرتفعاً والركبتين فوق أصابع القدمين', 'انزل حتى تصبح الأفخاذ موازية للأرض', 'ادفع من الكعبين للصعود']
    }
  }
];