import type { Notice } from '@/assets/assets';

// Add TypeScript types for function parameters
export const isExpired = (expiryDate: string): boolean => {
  if (!expiryDate) return false;
  const today = new Date();
  const expiry = new Date(expiryDate);
  return today > expiry;
};

export const autoArchiveNotices = (noticesArray: Notice[]): Notice[] => {
  return noticesArray.map(notice => ({
    ...notice,
    isArchived: isExpired(notice.expiryDate)
  }));
};

export const getActiveNotices = (noticesArray: Notice[]): Notice[] => {
  return autoArchiveNotices(noticesArray).filter(notice => !notice.isArchived);
};

export const getArchivedNotices = (noticesArray: Notice[]): Notice[] => {
  return autoArchiveNotices(noticesArray).filter(notice => notice.isArchived);
};