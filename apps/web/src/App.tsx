import { useEffect } from "react";
import { createHashRouter, RouterProvider } from "react-router";

import { routes, useSettings } from "@members/shared";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { RootLayout } from "./layout/RootLayout";

const router = createHashRouter([
  {
    path: routes.web.home,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: routes.web.profile.path, element: <ProfilePage /> },
      { path: routes.web.profile.memberPath, element: <ProfilePage /> },
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
