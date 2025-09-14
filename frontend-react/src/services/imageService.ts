export const optimizeImage = (
  url: string | undefined,
  width: number,
  height: number,
): string => {
  if (!url) {
    return getDefaultImage(width, height);
  }
  if (url.includes('unsplash.com')) {
    return optimizeUnsplashImage(url, width, height);
  }
  if (url.includes('example.com')) {
    return getDefaultImage(width, height);
  }
  return url;
};

const getDefaultImage = (width: number, height: number): string => {
  return `https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=${width}&h=${height}&fit=crop&auto=format&q=80`;
};

const optimizeUnsplashImage = (
  url: string,
  width: number,
  height: number,
): string => {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('w', width.toString());
    urlObj.searchParams.set('h', height.toString());
    urlObj.searchParams.set('fit', 'crop');
    urlObj.searchParams.set('auto', 'format');
    urlObj.searchParams.set('q', '80');
    return urlObj.toString();
  } catch {
    return getDefaultImage(width, height);
  }
};
