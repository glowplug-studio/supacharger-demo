import { useCallback,useEffect, useState } from 'react';
import { usePathname,useRouter } from 'next/navigation';

export interface UnsavedChanges {
  hasChanges: boolean;
  pendingPath: string | null;
  setHasChanges: (hasChanges: boolean) => void;
  setPendingPath: (path: string | null) => void;
  confirmNavigation: () => void;
  cancelNavigation: () => void;
}

export function useUnsavedChanges(): UnsavedChanges {
  const [hasChanges, setHasChanges] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Handle tab switching when there are unsaved changes
  const handleBeforeNavigate = useCallback(
    (path: string): boolean => {
      if (hasChanges && path !== pathname) {
        setPendingPath(path);
        return false;
      }
      return true;
    },
    [hasChanges, pathname]
  );

  const confirmNavigation = useCallback(() => {
    if (pendingPath) {
      setHasChanges(false);
      router.push(pendingPath);
      setPendingPath(null);
    }
  }, [pendingPath, router]);

  const cancelNavigation = useCallback(() => {
    setPendingPath(null);
  }, []);

  // Handle beforeunload event to warn users when leaving the page with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  return {
    hasChanges,
    pendingPath,
    setHasChanges,
    setPendingPath,
    confirmNavigation,
    cancelNavigation,
  };
}