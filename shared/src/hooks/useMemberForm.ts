import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type MemberFormValues, profileSchema } from "@members/shared";

type MemberFormProps = {
  defaults: MemberFormValues;
};

export const useMemberForm = ({ defaults }: MemberFormProps) => {
  return useForm<MemberFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: defaults,
  });
};
