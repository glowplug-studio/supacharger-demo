export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateImageFile = (file: File): FileValidationResult => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/avif', 'image/webp'];
  const maxSize = 3 * 1024 * 1024; // 3MB in bytes

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'File must be JPG, PNG, AVIF, or WebP format'
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size must be less than 3MB'
    };
  }

  return { isValid: true };
};

export const getFileValidationRequirements = (): string => {
  return 'JPG, PNG, AVIF, WebP < 3MB';
};