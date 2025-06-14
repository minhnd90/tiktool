import { NativeModules } from 'react-native';

const { OverlayPermission } = NativeModules;

export const checkOverlayPermission = async (): Promise<boolean> => {
  try {
    return await OverlayPermission.check();
  } catch (e) {
    return false;
  }
};

export const requestOverlayPermission = async (): Promise<boolean> => {
  try {
    return await OverlayPermission.request();
  } catch (e) {
    return false;
  }
};
