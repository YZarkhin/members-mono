import { atom } from "nanostores";

import type { MemberFormValues } from "../validations";
import { DateTime } from "luxon";

export type Member = MemberFormValues & {
  id: string;
  createdAt: number;
};
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0;
    var v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const $members = atom<Member[]>([]);

export const getMember = (memberId?: string) =>
  memberId ? $members.get().find(({ id }) => id === memberId) : null;

export const addMember = (member: MemberFormValues) => {
  const id = generateUUID();
  const createdAt = DateTime.now().toUnixInteger();

  $members.set([
    ...$members.get(),
    {
      id,
      createdAt,
      ...member,
    },
  ]);
};

export const updateMember = (id: string, profile: MemberFormValues) =>
  $members.set(
    $members.get().map((member) =>
      member.id === id
        ? {
            ...member,
            ...profile,
          }
        : member,
    ),
  );

export const deleteMember = (id: string) => {
  $members.set($members.get().filter((member) => member.id !== id));
};
