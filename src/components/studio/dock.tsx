"use client";

import * as React from "react";

import {
  Layers,
  SlidersHorizontal,
  Sparkles,
  Volume2,
  Wand2,
} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type SectionKey =
  | "basics"
  | "overlays"
  | "enhancements"
  | "ai"
  | "audio";

export type StudioDockProps = {
  onSelect?: (section: SectionKey) => void;
  activeSection?: SectionKey;
  isVideo?: boolean;
};

export function StudioDock({
  onSelect,
  activeSection = "basics",
  isVideo = false,
}: StudioDockProps) {
  const items: Array<{
    key: SectionKey;
    label: string;
    Icon: React.ComponentType<{className?: string}>;
  }> = [
    {key: "basics", label: "Basics", Icon: SlidersHorizontal},
    {key: "overlays", label: "Overlays", Icon: Layers},
    {key: "enhancements", label: "Enhancements", Icon: Sparkles},
    {key: "ai", label: "AI Magic", Icon: Wand2},
    {key: "audio", label: "Audio", Icon: Volume2},
  ];

  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [mouseX, setMouseX] = React.useState<number>(0);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  function handleSelect(section: SectionKey) {
    onSelect?.(section);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  }

  function scaleFor(index: number): number {
    if (!wrapperRef.current || hoverIndex === null) return 1;
    const el = wrapperRef.current.querySelectorAll<HTMLButtonElement>(
      // eslint-disable-next-line quotes
      '[data-dock-item="true"]'
    )[index];
    if (!el) return 1;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const containerLeft = wrapperRef.current.getBoundingClientRect().left;
    const distance = Math.abs(center - (containerLeft + mouseX));
    const maxScale = 1.1;
    const influence = 120;
    const t = Math.max(0, 1 - distance / influence);
    return 1 + (maxScale - 1) * Math.pow(t, 2);
  }

  return (
    <TooltipProvider delayDuration={100}>
      <div
        role="navigation"
        aria-label="Studio sections"
        className="pointer-events-auto fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
      >
        <div
          ref={wrapperRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIndex(null)}
          className="group flex items-end gap-2.5 rounded-full border border-white/10 dark:bg-background/70 px-3 py-2 shadow-lg backdrop-blur-md ring-1 ring-pink-500/20"
          style={{
            backgroundImage:
              "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
          }}
        >
          {items.map(({key, label, Icon}, i) => {
            const isActive = activeSection === key;
            if (isVideo && key === "ai") {
              return;
            }
            if (!isVideo && key === "audio") {
              return;
            }

            const scale = scaleFor(i);
            return (
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  <Button
                    data-dock-item="true"
                    variant="ghost"
                    size="icon"
                    aria-label={label}
                    onMouseEnter={() => setHoverIndex(i)}
                    onFocus={() => setHoverIndex(i)}
                    onBlur={() => setHoverIndex(null)}
                    onClick={() => handleSelect(key)}
                    className={[
                      "relative size-10 rounded-full transition-all duration-150",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/60",
                      isActive
                        ? "bg-pink-500/15 ring-1 ring-pink-500/30 dark:bg-pink-400/15"
                        : "hover:bg-white/5",
                    ].join(" ")}
                    style={{
                      transform: `scale(${scale}) translateZ(0)`,
                      transformOrigin: "bottom",
                    }}
                  >
                    <Icon
                      className={[
                        "size-5 transition-colors",
                        isActive
                          ? "text-pink-600 dark:text-pink-400"
                          : "text-foreground/80",
                      ].join(" ")}
                    />
                    {isActive && (
                      <span
                        className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-pink-600 dark:bg-pink-400"
                        aria-hidden="true"
                      />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="select-none border-white/10 bg-background/95 px-2 py-1 mb-2 text-xs text-black dark:text-white"
                >
                  {label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
