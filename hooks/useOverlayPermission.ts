import { isOverlayPermissionGranted, requestOverlayPermission } from '@vokhuyet/react-native-draw-overlay';
import { useCallback, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export default function useOverlayPermission() {
  const [isOverlayGranted, setIsOverlayGranted] = useState(false);
  const [overlayError, setOverlayError] = useState<string | null>(null);

  const requestPermission = useCallback(async () => {
    try {
      setOverlayError(null);
      !isOverlayGranted && (await requestOverlayPermission());
      setIsOverlayGranted(await isOverlayPermissionGranted());
    } catch (e) {
      setOverlayError('Failed to request overlay permission.');
    }
  }, [isOverlayGranted]);

  useEffect(() => {
    requestPermission();
    const subscription = AppState.addEventListener('change', async (nextAppState: AppStateStatus) => {
      nextAppState === 'active' && (await requestPermission());
    });
    return () => subscription.remove();
  }, [requestPermission]);

  return {isOverlayGranted, requestOverlayPermission, overlayError};
}
