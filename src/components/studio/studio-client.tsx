"use client";

import {useRouter} from "next/navigation";
import {useMemo, useState, useTransition} from "react";

import {toast} from "sonner";

import {updateMedia} from "@/actions";
import {type SectionKey, StudioDock} from "@/components/studio/dock";
import {PreviewCanvas} from "@/components/studio/preview-canvas";
import {StudioHeader} from "@/components/studio/studio-header";
import {TransformPanel} from "@/components/studio/transform-panel";
import {UrlBar} from "@/components/studio/url-bar";
import {SelectMediaModel} from "@/db/schema/media";
import {useHistory} from "@/hooks/use-history";
import {buildImageKitUrl} from "@/lib/transformation-utils";
import {TransformationConfig} from "@/types";

type StudioClientProps = {
  media: SelectMediaModel;
};

export default function StudioClient({media}: StudioClientProps) {
  const [isPending, startTransition] = useTransition();
  const [zoom, setZoom] = useState(100);
  const [activeSection, setActiveSection] = useState<SectionKey>("basics");

  const router = useRouter();

  const initial: TransformationConfig =
    media.transformationConfig ??
    (media.mediaType === "VIDEO" ? {type: "VIDEO"} : {type: "IMAGE"});

  const history = useHistory<TransformationConfig>(initial);

  const srcUrl = media.originalUrl;
  const builtUrl = useMemo(
    () => buildImageKitUrl(srcUrl, history.state),
    [srcUrl, history.state]
  );

  const onSave = async () => {
    startTransition(async () => {
      try {
        const res = await updateMedia({
          id: media.id,
          transformedUrl: builtUrl,
          transformationConfig: history.state,
        });

        if (res.success) toast.success("Update saved successfully!");
        else toast.error("Failed to save media");
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Unexpected error saving media");
        }
      } finally {
        router.refresh();
      }
    });
  };

  const onRevert = () =>
    history.reset(
      media.mediaType === "VIDEO" ? {type: "VIDEO"} : {type: "IMAGE"}
    );

  return (
    <section>
      <StudioHeader
        canUndo={history.canUndo}
        canRedo={history.canRedo}
        onUndo={history.undo}
        onRedo={history.redo}
        onRevert={onRevert}
        onSave={onSave}
        builtUrl={builtUrl}
        srcUrl={srcUrl}
        savePending={isPending}
      />

      <UrlBar url={builtUrl} />

      <section className="flex gap-6 max-md:flex-col mt-6 md:h-132 overflow-hidden">
        <PreviewCanvas
          key={builtUrl}
          builtUrl={builtUrl}
          zoom={zoom}
          onZoomChange={setZoom}
          mediaType={media.mediaType!}
        />

        <TransformPanel
          activeSection={activeSection}
          transforms={history.state}
          onTransformChange={newTransforms => {
            history.set(newTransforms);
          }}
        />
      </section>

      <StudioDock
        activeSection={activeSection}
        onSelect={setActiveSection}
        isVideo={media.mediaType === "VIDEO"}
      />
    </section>
  );
}
