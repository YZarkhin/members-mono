import { $members, type Member } from "./member";
import {
  $settings,
  type SettingsState,
  supportedLocales,
  supportedThemes,
} from "./settings";

export type StoreStorage = {
  getItem: (key: string) => Promise<string | null> | string | null;
  setItem: (key: string, value: string) => Promise<void> | void;
};

type PersistenceOptions = {
  fallbackSettings?: Partial<SettingsState>;
};

const membersKey = "members:members";
const settingsKey = "members:settings";

let unsubscribeMembers: (() => void) | undefined;
let unsubscribeSettings: (() => void) | undefined;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const isMember = (value: unknown): value is Member => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.createdAt === "number" &&
    typeof value.fullName === "string" &&
    (value.role === "staff" || value.role === "member")
  );
};

const parseMembers = (value: string | null): Member[] | undefined => {
  if (!value) {
    return undefined;
  }

  try {
    const parsed: unknown = JSON.parse(value);

    return Array.isArray(parsed) && parsed.every(isMember) ? parsed : undefined;
  } catch {
    return undefined;
  }
};

const parseSettings = (value: string | null): SettingsState | undefined => {
  if (!value) {
    return undefined;
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (!isRecord(parsed)) {
      return undefined;
    }

    const locale = parsed.locale;
    const theme = parsed.theme;

    return typeof locale === "string" &&
      typeof theme === "string" &&
      supportedLocales.includes(locale as SettingsState["locale"]) &&
      supportedThemes.includes(theme as SettingsState["theme"])
      ? {
          locale: locale as SettingsState["locale"],
          theme: theme as SettingsState["theme"],
        }
      : undefined;
  } catch {
    return undefined;
  }
};

export const initializeStorePersistence = async (
  storage: StoreStorage,
  options: PersistenceOptions = {},
) => {
  const [storedMembers, storedSettings] = await Promise.all([
    storage.getItem(membersKey),
    storage.getItem(settingsKey),
  ]);
  const members = parseMembers(storedMembers);
  const settings = parseSettings(storedSettings);

  if (members) {
    $members.set(members);
  }

  $settings.set({
    ...$settings.get(),
    ...options.fallbackSettings,
    ...settings,
  });

  unsubscribeMembers?.();
  unsubscribeSettings?.();

  unsubscribeMembers = $members.listen((value) => {
    void storage.setItem(membersKey, JSON.stringify(value));
  });
  unsubscribeSettings = $settings.listen((value) => {
    void storage.setItem(settingsKey, JSON.stringify(value));
  });

  return {
    membersRestored: Boolean(members),
    settingsRestored: Boolean(settings),
  };
};
