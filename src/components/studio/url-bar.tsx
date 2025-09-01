"use client";

import {Copy, ExternalLink} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";

const buttonStyles =
  "rounded-full h-9 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";

const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

export function UrlBar({url}: {url: string}) {
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {}
  };

  return (
    <div className="flex items-center gap-2.5 my-2">
      <Input
        readOnly
        value={url}
        className={
          "font-mono text-xs shadow-none dark:bg-transparent backdrop-blur-sm focus-visible:outline-none focus-visible:ring-0 border-pink-300/30 dark:border-pink-200/15 h-9"
        }
        aria-label="Built URL"
      />
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={copyUrl}
              aria-label="Copy URL"
              className={cn(buttonStyles, "rounded-sm")}
              style={gradientBg}
            >
              <Copy className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Copy URL</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open URL in new tab"
            >
              <Button
                variant="outline"
                size="icon"
                className={cn(buttonStyles, "rounded-sm")}
                style={gradientBg}
              >
                <ExternalLink className="size-4" />
              </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent side="top">Open</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
