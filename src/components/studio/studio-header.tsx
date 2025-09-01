import {Redo2, RotateCcw, Undo2, Vote} from "lucide-react";

import ExportMenu from "@/components/studio/export-menu";
import {Button} from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {download} from "@/lib/studio-untils";

type StudioHeaderProps = {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onRevert: () => void;
  onSave: () => void;
  builtUrl: string;
  srcUrl: string;
  savePending?: boolean;
};

const buttonStyles =
  "rounded-full h-9 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";

const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

export function StudioHeader({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onRevert,
  onSave,
  builtUrl,
  srcUrl,
  savePending = false,
}: StudioHeaderProps) {
  return (
    <div className="mx-auto max-md:space-y-6 md:flex max-w-[1400px] items-center gap-2 pb-3 max-md:space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={buttonStyles}
              style={gradientBg}
              onClick={onUndo}
              disabled={!canUndo}
            >
              <Undo2 className="size-4" />
              Undo
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo last change</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={buttonStyles}
              style={gradientBg}
              onClick={onRedo}
              disabled={!canRedo}
            >
              <Redo2 className="size-4" />
              Redo
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={buttonStyles}
              style={gradientBg}
              onClick={onRevert}
            >
              <RotateCcw className="size-4" />
              Revert
            </Button>
          </TooltipTrigger>
          <TooltipContent>Revert to original</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="secondary"
          className={
            "h-9 rounded-full cursor-pointer disabled:cursor-not-allowed bg-gradient-to-bl from-pink-400 to-pink-800 px-5 text-white"
          }
          onClick={onSave}
          disabled={savePending}
        >
          <Vote className="size-4" />
          {savePending ? "Saving" : "Save"}
        </Button>

        <ExportMenu
          onCopyBuilt={() => navigator.clipboard.writeText(builtUrl)}
          onCopyOriginal={() => navigator.clipboard.writeText(srcUrl)}
          onDownloadBuilt={() => download(builtUrl, "image-transformed")}
          onDownloadOriginal={() => download(srcUrl, "image-original")}
        />
      </div>
    </div>
  );
}
