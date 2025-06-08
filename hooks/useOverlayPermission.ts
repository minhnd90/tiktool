import {isOverlayPermissionGranted, requestOverlayPermission} from '@vokhuyet/react-native-draw-overlay';
import {useEffect, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

export default function useOverlayPermission() {
  const [isOverlayGranted, setIsOverlayGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        setIsOverlayGranted(await isOverlayPermissionGranted());
      } catch (e) {
        setError('Failed to request overlay permission.');
      }
    })();
    const subscription = AppState.addEventListener('change', async (nextAppState: AppStateStatus) => {
      !isOverlayGranted && nextAppState === 'active' && (await requestOverlayPermission());
    });
    return () => subscription.remove();
  }, [isOverlayGranted]);

  return {isOverlayGranted, requestOverlayPermission, error};
}
