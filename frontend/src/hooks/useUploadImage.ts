'use client';

import { useState } from 'react';

export function useUploadImage() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File) => {
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setIsUploading(false);

    if (!res.ok) throw new Error(data.error || 'Upload failed');

    return data.url;
  };

  return { uploadImage, isUploading };
}
