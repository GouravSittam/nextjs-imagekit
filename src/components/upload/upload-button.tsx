"use client";

import {useState} from "react";

import {Button} from "@/components/ui/button";
import UploadModal from "@/components/upload/upload-modal";

const UploadButton = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const handleUploadClick = () => {
    setUploadModalOpen(true);
  };

  return (
    <>
      <Button
        className="cursor-pointer rounded-full bg-gradient-to-bl from-pink-400 to-pink-800 px-5 text-white"
        onClick={handleUploadClick}
      >
        Upload
      </Button>
      <UploadModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        uploadOptions={{
          folder: "/moments",
        }}
      />
    </>
  );
};

export default UploadButton;
