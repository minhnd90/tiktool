import { text } from '@constants';
import { overlayPermission } from '@utils';
import { useCallback, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

const {checkOverlayPermission, requestOverlayPermission} = overlayPermission;

export default function useOverlayPermission() {
  const [isOverlayGranted, setIsOverlayGranted] = useState(false);
  const [overlayError, setOverlayError] = useState<string | null>(null);

  const requestPermission = useCallback(async () => {
    try {
      setOverlayError(null);
      !isOverlayGranted && (await requestOverlayPermission());
      setIsOverlayGranted(await checkOverlayPermission());
    } catch (e) {
      setOverlayError(text.RequestOverlayError);
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
