'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { exercises } from '@/data/exercises';
import { Search, ChevronDown, ChevronUp, Play } from 'lucide-react';

export default function ExerciseLibrary() {
  const { language } = useApp();
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return exercises.filter(ex => {
      return ex.name[language].toLowerCase().includes(search.toLowerCase()) ||
        ex.name.en.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, language]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
        <input
          type="text"
          placeholder={t('exercises.search', language)}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full ps-12 pe-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm"
        />
      </div>
      <div className="grid gap-3">
        {filtered.map(ex => (
          <div key={ex.id} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <button onClick={() => setExpandedId(expandedId === ex.id ? null : ex.id)} className="w-full flex items-center justify-between p-4">
              <span className="font-medium">{ex.name[language]}</span>
              {expandedId === ex.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {expandedId === ex.id && (
              <div className="px-4 pb-4 space-y-3">
                <p className="text-sm text-zinc-500">{ex.description[language]}</p>
                <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 aspect-video flex items-center justify-center">
                  <Play className="w-10 h-10 text-orange-500" />
                </div>
                <ol className="space-y-1">
                  {ex.instructions[language].map((step, i) => (
                    <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400">{i+1}. {step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}