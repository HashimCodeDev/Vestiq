'use client';

import { useState } from 'react';

/**
 * Returns a function for uploading an image to the server, along with a boolean indicating whether an upload is in progress.
 *
 * @returns An object with a single function, `uploadImage`, which takes a `File` object, and a boolean, `isUploading`.
 * @returns `uploadImage` function returns a promise that resolves with the URL of the uploaded image, or rejects with an error message.
 * @returns `isUploading` boolean is `true` while an upload is in progress, and `false` otherwise.
 */
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
