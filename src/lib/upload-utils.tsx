import {
  AlertCircle,
  CheckCircle,
  FileText,
  ImageIcon,
  Video,
} from "lucide-react";

import {UploadFile} from "@/hooks/use-imagekit-upload";

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const getFileIcon = (file: File) => {
  if (file.type.startsWith("image/"))
    return <ImageIcon className="size-4 text-pink-500 dark:text-pink-400" />;
  if (file.type.startsWith("video/"))
    return <Video className="size-4 text-pink-500 dark:text-pink-400" />;

  return <FileText className="size-4 text-pink-500 dark:text-pink-400" />;
};

export const getStatusIcon = (status: UploadFile["status"]) => {
  switch (status) {
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    case "uploading":
      return (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-pink-500 border-t-transparent" />
      );
    default:
      return null;
  }
};
