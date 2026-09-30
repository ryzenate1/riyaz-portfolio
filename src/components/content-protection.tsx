'use client';

import { useEffect, useCallback } from 'react';

/**
 * ContentProtection Component
 * 
 * Prevents users from:
 * - Right-click context menu
 * - Copying text (Ctrl+C, Cmd+C)
 * - Downloading images (drag and drop disabled)
 * - Selecting text
 * - Taking screenshots via keyboard shortcuts
 * - Printing the page
 * - Viewing source code easily
 * - Developer tools shortcuts
 */
export function ContentProtection({ children }: { children: React.ReactNode }) {
  const isEditableTarget = useCallback((e: Event) => {
    const t = e.target as HTMLElement | null;
    // Never interfere with form fields: users must be able to copy/paste/select.
    return !!t?.closest?.('input, textarea, select, [contenteditable="true"]');
  }, []);

  const handleContextMenu = useCallback((e: MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    e.preventDefault();
    return false;
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Never block editing shortcuts inside form fields.
    const target = e.target as HTMLElement | null;
    if (target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
    // Prevent common copy/save shortcuts
    const key = e.key.toLowerCase();
    const ctrlOrCmd = e.ctrlKey || e.metaKey;
    
    // Prevent: Ctrl/Cmd + C (Copy), S (Save), U (View Source), P (Print)
    // Prevent: Ctrl/Cmd + Shift + I/J/C (Dev Tools)
    // Prevent: F12 (Dev Tools)
    if (
      (ctrlOrCmd && ['c', 's', 'u', 'p', 'a'].includes(key)) ||
      (ctrlOrCmd && e.shiftKey && ['i', 'j', 'c'].includes(key)) ||
      e.key === 'F12' ||
      (ctrlOrCmd && e.shiftKey && key === 'c') ||
      // Prevent PrintScreen on Windows
      e.key === 'PrintScreen'
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, []);

  const handleDragStart = useCallback((e: DragEvent) => {
    e.preventDefault();
    return false;
  }, []);

  const handleCopy = useCallback((e: ClipboardEvent) => {
    if (isEditableTarget(e)) return;
    e.preventDefault();
    return false;
  }, [isEditableTarget]);

  const handleCut = useCallback((e: ClipboardEvent) => {
    if (isEditableTarget(e)) return;
    e.preventDefault();
    return false;
  }, [isEditableTarget]);

  const handlePaste = useCallback((e: ClipboardEvent) => {
    if (isEditableTarget(e)) return;
    e.preventDefault();
    return false;
  }, [isEditableTarget]);

  const handleSelectStart = useCallback((e: Event) => {
    if (isEditableTarget(e)) return;
    e.preventDefault();
    return false;
  }, [isEditableTarget]);

  const handleBeforePrint = useCallback(() => {
    // Hide content before printing
    document.body.style.visibility = 'hidden';
  }, []);

  const handleAfterPrint = useCallback(() => {
    // Show content after print dialog closes
    document.body.style.visibility = 'visible';
  }, []);

  useEffect(() => {
    // Add all event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('selectstart', handleSelectStart);
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    // Disable right-click on all images
    const images = document.querySelectorAll('img');
    const imageContextHandler = (e: Event) => {
      e.preventDefault();
      return false;
    };
    const imageDragHandler = (e: Event) => {
      e.preventDefault();
      return false;
    };
    
    images.forEach((img) => {
      img.addEventListener('contextmenu', imageContextHandler);
      img.addEventListener('dragstart', imageDragHandler);
    });

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('selectstart', handleSelectStart);
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);

      images.forEach((img) => {
        img.removeEventListener('contextmenu', imageContextHandler);
        img.removeEventListener('dragstart', imageDragHandler);
      });
    };
  }, [
    handleContextMenu,
    handleKeyDown,
    handleDragStart,
    handleCopy,
    handleCut,
    handlePaste,
    handleSelectStart,
    handleBeforePrint,
    handleAfterPrint,
    isEditableTarget,
  ]);

  return <>{children}</>;
}

/**
 * CSS styles to be added to globals.css for additional protection
 * These styles prevent text selection and image dragging
 */
export const contentProtectionStyles = `
/* Content Protection Styles */
body {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}

/* Allow text selection only in form inputs */
input,
textarea,
[contenteditable="true"] {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}

/* Prevent image dragging and saving */
img,
video,
picture,
source,
svg,
canvas {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  pointer-events: none;
}

/* Allow pointer events on clickable elements */
a img,
button img,
[role="button"] img {
  pointer-events: auto;
}

/* Disable print styles */
@media print {
  body {
    display: none !important;
    visibility: hidden !important;
  }
}
`;
