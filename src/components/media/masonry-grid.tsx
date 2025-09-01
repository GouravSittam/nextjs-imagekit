"use client";

import {useMemo, useState} from "react";

import {SelectMediaModel} from "@/db/schema/media";

import Logo from "../logo";
import MediaCard from "./media-card";

type MasonryGridProps = {
  media: SelectMediaModel[];
  columns?: 1 | 2 | 3 | 4;
};

const MasonryGrid = ({media, columns = 3}: MasonryGridProps) => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const columnItems = useMemo(() => {
    const cols: SelectMediaModel[][] = Array.from({length: columns}, () => []);
    // Distribute items across columns to balance heights better
    media.forEach((item, index) => {
      const columnIndex = index % columns;
      cols[columnIndex].push(item);
    });
    return cols;
  }, [media, columns]);

  const getGridCols = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };

  const handleVideoMuteToggle = (videoId: string, currentlyMuted: boolean) => {
    if (currentlyMuted) {
      // If currently muted, unmute this video and mute others
      setActiveVideoId(videoId);
    } else {
      // If currently unmuted, mute this video
      setActiveVideoId(null);
    }
  };

  if (media.length === 0) {
    return (
      <div className="py-12 text-center">
        <Logo
          classNames={{
            base: "flex items-center justify-center",
            text: "hidden",
            image: "size-24",
          }}
        />
        <h3 className="mt-4 mb-2 text-lg font-medium dark:text-pink-50">
          No media yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Upload your first image or video to get started
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-x-4 lg:gap-x-6 ${getGridCols()}`}>
      {columnItems.map((columnMedia, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-y-0 lg:gap-y-2">
          {columnMedia.map(mediaItem => (
            <MediaCard
              key={mediaItem.id}
              {...mediaItem}
              activeVideoId={activeVideoId}
              onVideoMuteToggle={handleVideoMuteToggle}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
