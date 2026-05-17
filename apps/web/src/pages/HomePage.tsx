import { useStore } from "@nanostores/react";
import { DateTime } from "luxon";
import { motion } from "motion/react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { $members } from "@members/shared";

export const HomePage = () => {
  const members = useStore($members);
  const { t } = useTranslation();

  return (
    <motion.main
      className="min-h-80 rounded-lg border border-border bg-panel p-7 dark:border-borderDark dark:bg-panelDark"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="mb-5 flex items-start justify-between gap-4 max-[720px]:flex-col">
        <div>
          <h2 className="mb-1.5 text-2xl font-bold">{t("nav.home")}</h2>
          <p className="text-muted dark:text-mutedDark">
            {t("home.memberCount", { count: members.length })}
          </p>
        </div>
        <Link
          className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-accent px-4 py-3 font-bold text-white no-underline dark:bg-accentDark"
          to="/profile"
        >
          {t("home.cta")}
        </Link>
      </div>

      {members.length > 0 ? (
        <div className="grid gap-2.5">
          {members.map((member) => (
            <article
              className="flex items-center justify-between gap-4 rounded-lg border border-border bg-panelRaised p-4 dark:border-borderDark dark:bg-panelRaisedDark max-[720px]:flex-col max-[720px]:items-start"
              key={member.id}
            >
              <div className="grid gap-1.5">
                <strong>{member.fullName}</strong>
                <span className="text-muted dark:text-mutedDark">
                  {t(`profile.role.${member.role.toLowerCase()}`)}
                </span>
                <Link
                  className="inline-flex min-h-11 w-fit cursor-pointer items-center justify-center rounded-lg bg-surface px-4 py-3 font-bold text-ink no-underline dark:bg-surfaceDark dark:text-inkDark"
                  to={`/profile/${encodeURIComponent(member.id)}`}
                >
                  {t("member.edit")}
                </Link>
              </div>
              <div className="grid gap-1.5 text-end max-[720px]:text-start">
                <span className="text-muted dark:text-mutedDark">
                  {member.dateOfBirthday
                    ? t("member.dateOfBirthday", {
                        date: DateTime.fromISO(
                          member.dateOfBirthday
                        ).toLocaleString(DateTime.DATE_MED),
                      })
                    : t("member.noBirthday")}
                </span>
                <small className="text-muted dark:text-mutedDark">
                  {t("profile.updatedAt", {
                    time: DateTime.fromMillis(member.createdAt).toLocaleString(
                      DateTime.DATETIME_MED
                    ),
                  })}
                </small>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p>{t("home.empty")}</p>
      )}
    </motion.main>
  );
};
