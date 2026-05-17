import { Member } from "../stores";

const webProfilePath = "profile";
const webMemberIdParam = "memberId";

export const initialMemberValues = {
  fullName: "",
  role: "member",
  dateOfBirthday: "",
} as Member;

export const routes = {
  params: {
    memberId: webMemberIdParam,
  },
  mobile: {
    welcome: "Welcome",
    profile: "Profile",
  },
  web: {
    home: "/",
    profile: {
      path: webProfilePath,
      to: `/${webProfilePath}`,
      memberPath: `${webProfilePath}/:${webMemberIdParam}`,
      toMember: (id: string) => `/${webProfilePath}/${encodeURIComponent(id)}`,
    },
  },
} as const;
