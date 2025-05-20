'use client';

import { usePathname } from 'next/navigation';

import { tabs } from '@/app/(supacharger)/(authenticated)/account/account-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/ui-alert-dialogue';
import { useUnsavedChanges } from '@/hooks/use-unsaved-changes';

export function UnsavedChangesModal() {
  const { pendingPath, confirmNavigation, cancelNavigation } = useUnsavedChanges();
  const currentPathname = usePathname();
  
  // Find the current and target tab names
  const currentTab = tabs.find(tab => tab.path === currentPathname);
  const targetTab = tabs.find(tab => tab.path === pendingPath);

  return (
    <AlertDialog open={!!pendingPath} onOpenChange={(open) => !open && cancelNavigation()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes in the <strong>{currentTab?.label || 'current'}</strong> tab. 
            What would you like to do before switching to the <strong>{targetTab?.label || 'new'}</strong> tab?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmNavigation}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Discard Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}