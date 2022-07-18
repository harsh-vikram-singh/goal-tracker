import React, { useEffect, useState } from "react";
import { themesConfig } from "./const";

export const ColorSchemeSelector = () => {
  const [mounted, setMounted] = useState(false);
  const [isUsingDarkMode, setIsUsingDarkMode] = useState(true);

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    htmlElement?.setAttribute('data-theme', isUsingDarkMode ? themesConfig.dark.themeName : themesConfig.light.themeName)
    setMounted(true);
  }, [isUsingDarkMode]);

  if (!mounted) return null;

  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">{isUsingDarkMode ? themesConfig.dark.placeholder : themesConfig.light.placeholder}</span>
        <input type="checkbox" className="toggle ml-3" checked={isUsingDarkMode} onChange={val => setIsUsingDarkMode(modeBool => !modeBool)} />
      </label>
    </div>
  );
};
