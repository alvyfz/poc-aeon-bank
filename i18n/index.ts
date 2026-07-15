import { en } from "@/i18n/en";
import { ms } from "@/i18n/ms";
import { usePreferencesStore, type Language } from "@/store/preferences-store";

export type Translation = typeof en;

export const dictionaries: Record<Language, Translation> = {
  en,
  ms,
};

export function getDictionary(language: Language): Translation {
  return dictionaries[language];
}

export function useTranslation() {
  const language = usePreferencesStore((state) => state.language);

  return {
    language,
    t: getDictionary(language),
  };
}
