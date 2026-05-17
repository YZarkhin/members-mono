import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";

import {
  addMember,
  deleteMember,
  type MemberFormValues,
  updateMember,
  getMember,
} from "@members/shared";
import { MemberForm } from "../components/MemberForm";

export const ProfilePage = () => {
  const { memberId } = useParams();
  const member = getMember(memberId);
  const isEditing = Boolean(member);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const showSuccessAndNavigateHome = () => {
    setIsSuccessVisible(true);
    successTimeoutRef.current = setTimeout(() => {
      navigate("/");
    }, 900);
  };

  const onSubmit = (values: MemberFormValues) => {
    if (member) {
      updateMember(member.id, values);
    } else {
      addMember(values);
    }

    showSuccessAndNavigateHome();
  };

  const onDelete = () => {
    if (!member) {
      return;
    }

    const didConfirm = window.confirm(
      `${t("profile.deleteConfirmTitle")}\n\n${t(
        "profile.deleteConfirmMessage",
        {
          name: member.fullName,
        },
      )}`,
    );

    if (!didConfirm) {
      return;
    }

    deleteMember(member.id);
    navigate("/");
  };

  return (
    <motion.main
      className="relative min-h-80 rounded-lg border border-border bg-panel p-7 dark:border-borderDark dark:bg-panelDark"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {t(isEditing ? "profile.editTitle" : "profile.title")}
      </h2>
      <MemberForm
        memberId={memberId}
        isEditing={isEditing}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
      {isSuccessVisible ? (
        <motion.div
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/25 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.16 }}
        >
          <motion.div
            className="grid max-w-80 justify-items-center gap-2.5 rounded-lg border border-border bg-panelRaised p-7 text-center text-ink shadow-[0_16px_36px_rgba(23,32,26,0.08)] dark:border-borderDark dark:bg-panelRaisedDark dark:text-inkDark dark:shadow-[0_16px_36px_rgba(0,0,0,0.28)]"
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-3xl font-extrabold text-white dark:bg-accentDark">
              ✓
            </div>
            <strong>
              {t(isEditing ? "profile.updateSuccess" : "profile.addSuccess")}
            </strong>
            <span className="text-muted dark:text-mutedDark">
              {t("profile.successDetail")}
            </span>
          </motion.div>
        </motion.div>
      ) : null}
    </motion.main>
  );
};
