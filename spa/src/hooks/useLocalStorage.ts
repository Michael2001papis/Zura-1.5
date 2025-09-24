import { useState, useEffect, useCallback } from 'react';
import type { StorageItem } from '../types/index.js';

const STORAGE_VERSION = '1.0.0';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  expirationMinutes?: number
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      const parsedItem: StorageItem<T> = JSON.parse(item);
      
      // Check version compatibility
      if (parsedItem.version !== STORAGE_VERSION) {
        console.warn(`Storage version mismatch for key ${key}. Clearing data.`);
        return initialValue;
      }

      // Check expiration
      if (parsedItem.expiresAt && new Date(parsedItem.expiresAt) < new Date()) {
        console.warn(`Storage item ${key} has expired. Clearing data.`);
        window.localStorage.removeItem(key);
        return initialValue;
      }

      return parsedItem.data;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      const storageItem: StorageItem<T> = {
        data: valueToStore,
        version: STORAGE_VERSION,
        ...(expirationMinutes && {
          expiresAt: new Date(Date.now() + expirationMinutes * 60 * 1000)
        })
      };

      window.localStorage.setItem(key, JSON.stringify(storageItem));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue, expirationMinutes]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  const clearExpired = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return;

      const parsedItem: StorageItem<T> = JSON.parse(item);
      if (parsedItem.expiresAt && new Date(parsedItem.expiresAt) < new Date()) {
        window.localStorage.removeItem(key);
        setStoredValue(initialValue);
      }
    } catch (error) {
      console.error(`Error clearing expired localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Clear expired items on mount
  useEffect(() => {
    clearExpired();
  }, [clearExpired]);

  return [storedValue, setValue, removeValue] as const;
}
