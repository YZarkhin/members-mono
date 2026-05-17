import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  type MemberFormValues,
  userRoles,
  useMemberForm,
  getMember,
  initialMemberValues,
} from "@members/shared";

type MemberFormProps = {
  isEditing: boolean;
  memberId?: string;
  onSubmit: (values: MemberFormValues) => void;
  onDelete: () => void;
};

export const MemberForm = ({
  isEditing,
  memberId,
  onSubmit,
  onDelete,
}: MemberFormProps) => {
  const { t } = useTranslation();
  const member = getMember(memberId);
  const defaultValues = isEditing && member ? member : initialMemberValues;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useMemberForm({
    defaults: defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues.dateOfBirthday, defaultValues.fullName, defaultValues.role, reset]);

  return (
    <form className="grid max-w-xl gap-4" onSubmit={handleSubmit(onSubmit)}>
      <label className="grid gap-2">
        <span>{t("profile.fullName")}</span>
        <input
          {...register("fullName")}
          className="w-full rounded-lg border border-border bg-panelRaised px-3.5 py-3 text-ink dark:border-borderDark dark:bg-panelRaisedDark dark:text-inkDark"
          autoComplete="name"
          required
        />
        {errors.fullName ? (
          <small className="text-danger dark:text-dangerDark">
            {t(errors.fullName.message ?? "")}
          </small>
        ) : null}
      </label>

      <label className="grid gap-2">
        <span>{t("profile.role")}</span>
        <select
          {...register("role")}
          className="w-full rounded-lg border border-border bg-panelRaised px-3.5 py-3 text-ink dark:border-borderDark dark:bg-panelRaisedDark dark:text-inkDark"
          required
        >
          {userRoles.map((role) => (
            <option key={role} value={role}>
              {t(`profile.role.${role.toLowerCase()}`)}
            </option>
          ))}
        </select>
        {errors.role ? (
          <small className="text-danger dark:text-dangerDark">
            {t(errors.role.message ?? "")}
          </small>
        ) : null}
      </label>

      <label className="grid gap-2">
        <span>{t("profile.dateOfBirthday")}</span>
        <input
          {...register("dateOfBirthday")}
          className="w-full rounded-lg border border-border bg-panelRaised px-3.5 py-3 text-ink dark:border-borderDark dark:bg-panelRaisedDark dark:text-inkDark"
          type="date"
        />
        {errors.dateOfBirthday ? (
          <small className="text-danger dark:text-dangerDark">
            {t(errors.dateOfBirthday.message ?? "")}
          </small>
        ) : null}
      </label>

      <button
        className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg border-0 bg-accent px-4 py-3 font-bold text-white disabled:cursor-default disabled:opacity-70 dark:bg-accentDark"
        type="submit"
      >
        {t(isEditing ? "profile.update" : "profile.save")}
      </button>
      {isEditing ? (
        <button
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg border-0 bg-danger px-4 py-3 font-bold text-white disabled:cursor-default disabled:opacity-70 dark:bg-dangerDark"
          type="button"
          onClick={onDelete}
        >
          {t("profile.delete")}
        </button>
      ) : null}
    </form>
  );
};
