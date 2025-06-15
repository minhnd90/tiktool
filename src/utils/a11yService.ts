import { NativeModules } from 'react-native';

export interface AccessibilityServiceUtilsType {
  isServiceEnabled(): Promise<boolean>;
  openAccessibilitySettings(): Promise<boolean>;
}

const { AccessibilityServiceUtils } = NativeModules as { AccessibilityServiceUtils: AccessibilityServiceUtilsType };

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
