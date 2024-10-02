// src/components/UI/InputItem.tsx
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import PlusIcon from "@/images/icons/ic_plus.svg";
import DeleteButton from "./DeleteButton";
import { uploadImage } from "@/api/uploadImage";

interface ImageUploadProps {
  title: string;
}

const ImageUpload = ({ title }: ImageUploadProps) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imageStatus, setImageStatus] = useState<
    "idle" | "loading" | "loaded" | "error"
  >("idle");

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // 파일 크기 제한 확인 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("이미지 파일은 최대 5MB까지 업로드할 수 있습니다.");
        return;
      }

      setImageStatus("loading");

      try {
        // 이미지 업로드 및 URL 획득
        const uploadedImageUrl = await uploadImage(file);

        // 이미지 URL을 미리보기로 설정
        setImagePreviewUrl(uploadedImageUrl);
        setImageStatus("loaded");
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
        setImageStatus("error");
        alert("이미지 업로드 중 오류가 발생했습니다.");
      }
    }
  };

  const handleDelete = () => {
    setImagePreviewUrl("");
    setImageStatus("idle");
  };

  return (
    <div>
      <label className="block text-sm font-bold mb-3 sm:text-lg">{title}</label>
      <div className="flex gap-2 sm:gap-4 lg:gap-6">
        {/* 이미지 업로드 버튼 */}
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center gap-3 cursor-pointer bg-gray-100 hover:bg-gray-50 text-gray-400 text-base w-1/2 max-w-[200px] aspect-square rounded-xl sm:w-[162px] lg:w-[282px]"
        >
          <PlusIcon />
          이미지 등록
        </label>

        <input
          id="image-upload"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          alt={title}
        />

        {/* 로딩 중일 때 */}
        {imageStatus === "loading" && (
          <div className="flex items-center justify-center w-1/2 max-w-[200px] aspect-square rounded-xl sm:w-[162px] lg:w-[282px] bg-gray-100">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {/* 이미지 미리보기 */}
        {imageStatus === "loaded" && imagePreviewUrl && (
          <div className="relative w-1/2 max-w-[200px] aspect-square rounded-xl sm:w-[162px] lg:w-[282px] overflow-hidden">
            <Image
              src={imagePreviewUrl}
              alt="업로드된 이미지"
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="absolute top-3 right-3">
              <DeleteButton onClick={handleDelete} label="이미지 파일" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
