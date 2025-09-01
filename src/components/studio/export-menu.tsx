import {Copy, Download, ExternalLink} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const buttonStyles =
  "rounded-full h-9 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";

const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

export default function ExportMenu({
  onCopyBuilt,
  onCopyOriginal,
  onDownloadBuilt,
  onDownloadOriginal,
}: {
  onCopyBuilt: () => void;
  onCopyOriginal: () => void;
  onDownloadBuilt: () => void;
  onDownloadOriginal: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={buttonStyles} style={gradientBg}>
          <ExternalLink className="size-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-fit mt-4 z-50 flex flex-col gap-2 backdrop-blur-2xl p-4 bg-white/80 rounded-lg border-1 dark:border-gray-50/10 dark:bg-black/20"
      >
        <DropdownMenuItem onClick={onCopyBuilt}>
          <Copy className="size-4" />
          Copy transformed URL
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCopyOriginal}>
          <Copy className="size-4" />
          Copy original URL
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onDownloadBuilt}>
          <Download className="size-4" />
          Download transformed
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDownloadOriginal}>
          <Download className="size-4" />
          Download original
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
