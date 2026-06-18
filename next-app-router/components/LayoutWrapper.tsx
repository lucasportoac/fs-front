"use client";

import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      {children}
    </div>
  );
}