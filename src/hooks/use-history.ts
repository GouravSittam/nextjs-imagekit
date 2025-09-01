"use client";

import {useCallback, useMemo, useRef, useState} from "react";

function isEqual<T>(a: T, b: T): boolean {
  if (a === b) return true;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

export function useHistory<T>(initial: T, limit = 50) {
  const past = useRef<T[]>([]);
  const future = useRef<T[]>([]);
  const [present, setPresent] = useState<T>(initial);

  const set = useCallback(
    (next: T) => {
      setPresent(prev => {
        if (isEqual(prev, next)) return prev;
        past.current.push(prev);
        if (past.current.length > limit) past.current.shift();
        future.current = [];
        return next;
      });
    },
    [limit]
  );

  const undo = useCallback(() => {
    if (past.current.length === 0) return;
    const prev = past.current.pop() as T;
    future.current.unshift(present);
    setPresent(prev);
  }, [present]);

  const redo = useCallback(() => {
    if (future.current.length === 0) return;
    const next = future.current.shift() as T;
    past.current.push(present);
    setPresent(next);
  }, [present]);

  const reset = useCallback((base: T) => {
    past.current = [];
    future.current = [];
    setPresent(base);
  }, []);

  const canUndo = past.current.length > 0;
  const canRedo = future.current.length > 0;

  return useMemo(
    () => ({
      state: present,
      set,
      undo,
      redo,
      canUndo,
      canRedo,
      reset,
    }),
    [present, set, undo, redo, canUndo, canRedo, reset]
  );
}
