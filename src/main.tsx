import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { SWRConfig } from "swr";

import "./index.css";

import "./i18n";
import "@fontsource-variable/inter";
import "@fontsource-variable/martian-mono";
import { MainLayout } from "@/components/layouts/main";
import { RootLayout } from "@/components/layouts/root";
import { ListPage } from "@/components/pages/list";

const cacheProvider = () => {
  const map = new Map<string, never>(
    Object.entries(JSON.parse(localStorage.getItem("emu-cache") || "{}"))
  );

  return map;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<MainLayout />}>
        <Route index element={<ListPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <SWRConfig value={{ provider: cacheProvider }}>
      <RouterProvider router={router} />
    </SWRConfig>
  </StrictMode>
);
