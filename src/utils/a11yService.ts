import { NativeModules } from 'react-native';

const { AccessibilityServiceUtils } = NativeModules;

export const checkA11yService = async (): Promise<boolean> => {
  try {
    return await AccessibilityServiceUtils.isServiceEnabled();
  } catch (e) {
    return false;
  }
};

export const openA11ySettings = async (): Promise<boolean> => {
  try {
    return await AccessibilityServiceUtils.openAccessibilitySettings();
  } catch (e) {
    return false;
  }
};
