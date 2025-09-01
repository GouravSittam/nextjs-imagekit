"use client";

import {useEffect, useState} from "react";

import {MoonIcon, SunIcon} from "lucide-react";
import {useTheme} from "next-themes";

import {Button} from "@/components/ui/button";

export function ThemeSwitch() {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="group/toggle extend-touch-target cursor-pointer rounded-full"
        onClick={toggleTheme}
        title="Toggle theme"
      >
        <div className="size-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="group/toggle extend-touch-target cursor-pointer rounded-full"
      onClick={toggleTheme}
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <SunIcon className="size-5 stroke-[1.5]" />
      ) : (
        <MoonIcon className="size-5 stroke-[1.5]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
