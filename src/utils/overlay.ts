import { NativeModules } from 'react-native';

export interface OverlayModuleType {
  checkOverlayPermission(): Promise<boolean>;
  requestOverlayPermission(): Promise<boolean>;
  showOverlay(): void;
  hideOverlay(): void;
}

const { OverlayModule } = NativeModules as { OverlayModule: OverlayModuleType };

export const checkOverlayPermission = async (): Promise<boolean> => {
  try {
    return await OverlayModule.checkOverlayPermission();
  } catch (e) {
    return false;
  }
};

export const requestOverlayPermission = async (): Promise<boolean> => {
  try {
    return await OverlayModule.requestOverlayPermission();
  } catch (e) {
    return false;
  }
};

export const showOverlay = () => {
  OverlayModule.showOverlay();
};

export const hideOverlay = () => {
  OverlayModule.hideOverlay();
};
