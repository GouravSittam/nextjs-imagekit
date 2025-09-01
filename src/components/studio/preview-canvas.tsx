import {useState} from "react";

import {ImageIcon, VideoIcon} from "lucide-react";

import {Spinner} from "@/components/spinner";
import {Slider} from "@/components/ui/slider";

type PreviewCanvasProps = {
  builtUrl: string;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  mediaType?: "IMAGE" | "VIDEO";
};

export function PreviewCanvas({
  builtUrl,
  zoom,
  onZoomChange,
  mediaType = "IMAGE",
}: PreviewCanvasProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const MediaIcon = mediaType === "VIDEO" ? VideoIcon : ImageIcon;

  return (
    <div className="rounded-xl border border-pink-300/30 dark:border-pink-200/15 bg-transparent backdrop:blur-2xl flex-1 flex flex-col h-full max-h-screen">
      <div className="flex items-center justify-between px-6 pt-6 flex-shrink-0">
        <div className="flex items-center gap-2 text-xs text-foreground/60">
          <MediaIcon className="size-4" />
          Live preview
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-foreground/60">{zoom}%</span>
          <Slider
            className="w-40 cursor-pointer"
            value={[zoom]}
            min={25}
            max={200}
            step={5}
            onValueChange={v => onZoomChange(v[0] ?? 100)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-hidden p-6 flex items-center justify-center min-h-0">
        <div
          className="relative transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${zoom / 100})`,
          }}
        >
          {mediaType === "IMAGE" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={builtUrl}
              src={builtUrl}
              alt="Transformed preview"
              className="h-[30dvh] md:h-[50dvh] w-auto object-contain select-none shadow-none"
              style={{transform: `scale(${zoom / 100})`}}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setHasError(true);
                setIsLoading(false);
              }}
            />
          ) : (
            <video
              key={builtUrl}
              src={builtUrl}
              controls
              className="h-[30dvh] md:h-[50dvh] w-auto object-contain select-none shadow-none"
              onError={() => {
                setHasError(true);
                setIsLoading(false);
              }}
            />
          )}
          {mediaType === "IMAGE" && isLoading && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
              <Spinner className="text-pink-800" />
            </div>
          )}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
              <div className="text-center text-gray-500">
                <MediaIcon className="mx-auto mb-2 size-8" />
                <p className="text-sm">Failed to load preview</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
