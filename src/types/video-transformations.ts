export type CropMode =
  | "maintain_ratio" // default
  | "pad_resize"
  | "force"
  | "at_max"
  | "at_least"
  | "extract";

export type FocusMode =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top_left"
  | "top_right"
  | "bottom_left"
  | "bottom_right";

export type BasicsTransform = {
  width?: number | string; // w
  height?: number | string; // h
  aspectRatio?: string; // ar e.g. "16-9" or expr
  cropMode?: CropMode; // c / cm
  focus?: FocusMode; // fo
  background?: {
    type: "solid" | "blurred";
    color?: string; // hex, rgba, or color name
    blurIntensity?: number | "auto"; // blurred
    brightness?: number; // -255..255
  };
  border?: {
    width: number | string; // px or expr
    color: string; // hex or name
  };
  radius?: number | "max"; // r
  rotate?: 0 | 90 | 180 | 270 | 360; // rt
};

export type OverlayBase = {
  x?: number | string; // lx
  y?: number | string; // ly
  focus?: FocusMode; // lfo
  startOffset?: number | string; // lso
  endOffset?: number | string; // leo
  duration?: number | string; // ldu
};

export type ImageOverlay = OverlayBase & {
  type: "image";
  src: string; // i / ie
  width?: number | string; // w
  height?: number | string; // h
  aspectRatio?: string; // ar
  cropMode?: CropMode; // c/cm
  border?: string; // b
  bg?: string; // bg
  radius?: number | "max"; // r
  rotation?: number; // rt
};

export type TextOverlay = OverlayBase & {
  type: "text";
  text: string; // i / ie
  fontSize?: number | string; // fs
  fontFamily?: string; // ff
  color?: string; // co
  align?: "left" | "center" | "right"; // ia
  typography?: ("b" | "i" | "strikethrough")[]; // tg
  padding?: number | string; // pa
  bg?: string; // bg
  radius?: number; // r
  rotation?: number; // rt
  lineHeight?: number | string; // lh
};

export type SolidBlock = OverlayBase & {
  type: "solid";
  color: string; // bg
  width?: number | string;
  height?: number | string;
  opacity?: number; // al 1–9
  radius?: number | "max";
};

export type VideoOverlay = OverlayBase & {
  type: "video";
  src: string; // i / ie
  width?: number | string;
  height?: number | string;
};

export type Overlay = ImageOverlay | TextOverlay | SolidBlock | VideoOverlay;

export type Thumbnail = {
  time?: number | string; // so
  width?: number;
  height?: number;
  aspectRatio?: string;
  cropMode?: CropMode;
  focus?: FocusMode;
  border?: {
    width: number;
    color: string;
  };
  bg?: string;
  radius?: number | "max";
};

export type Trimming = {
  startOffset?: number | string; // so
  endOffset?: number | string; // eo
  duration?: number | string; // du
};

export type Enhancements = {
  thumbnail?: Thumbnail;
  trimming?: Trimming;
};

export type Audio = {
  mute?: boolean; // ac-none
  extractAudio?: boolean; // vc-none
};
