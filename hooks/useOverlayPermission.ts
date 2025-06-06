import {
  isOverlayPermissionGranted,
  requestOverlayPermission,
} from '@vokhuyet/react-native-draw-overlay';
import {useCallback, useEffect, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

export default function useOverlayPermission() {
  const [isGranted, setIsGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = useCallback(async () => {
    try {
      setError(null);
      !isGranted && (await requestOverlayPermission());
      setIsGranted(await isOverlayPermissionGranted());
    } catch (e) {
      setError('Failed to request overlay permission.');
    }
  }, [isGranted]);

  useEffect(() => {
    requestPermission();
    const subscription = AppState.addEventListener(
      'change',
      async (nextAppState: AppStateStatus) => {
        nextAppState === 'active' && (await requestPermission());
      },
    );
    return () => subscription.remove();
  }, [requestPermission]);

  return {isGranted, requestPermission, error};
}
