import type {
  AiMagic,
  BasicsTransform as ImageBasics,
  Enhancements as ImageEnhancements,
  Overlay as ImageOverlay,
} from "./image-transformations";
import type {
  Audio as VideoAudio,
  BasicsTransform as VideoBasics,
  Enhancements as VideoEnhancements,
  Overlay as VideoOverlay,
} from "./video-transformations";

export type ImageTransformationConfig = {
  type: "IMAGE";
  basics?: ImageBasics;
  overlays?: ImageOverlay[];
  enhancements?: ImageEnhancements;
  ai?: AiMagic;
};

export type VideoTransformationConfig = {
  type: "VIDEO";
  basics?: VideoBasics;
  overlays?: VideoOverlay[];
  enhancements?: VideoEnhancements;
  audio?: VideoAudio;
};

export type TransformationConfig =
  | ImageTransformationConfig
  | VideoTransformationConfig;

export type PaginatedSearchParams = {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
};
