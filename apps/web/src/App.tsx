import { useEffect } from "react";
import { createHashRouter, RouterProvider } from "react-router";

import { useSettings } from "@members/shared";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { RootLayout } from "./layout/RootLayout";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "profile/:memberId", element: <ProfilePage /> },
    ],
  },
]);

export const App = () => {
  const { theme } = useSettings();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return <RouterProvider router={router} />;
};
