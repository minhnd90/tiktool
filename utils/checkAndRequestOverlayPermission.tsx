import { isOverlayPermissionGranted, requestOverlayPermission } from '@vokhuyet/react-native-draw-overlay';

export const checkAndRequestOverlayPermission = async (setIsOverlayGranted: (v: boolean) => void) => {
  const granted = await isOverlayPermissionGranted();
  setIsOverlayGranted(granted);
  if (!granted) {
    await requestOverlayPermission();
    setIsOverlayGranted(await isOverlayPermissionGranted());
  }
};
