import { NativeModules } from 'react-native';

const { AppInstalledUtils, OpenAppUtils } = NativeModules;

/**
 * Kiểm tra xem app với package name đã được cài trên máy chưa.
 * (React Native không hỗ trợ trực tiếp, cần native module, nhưng có thể thử Linking.canOpenURL)
 */
export async function isAppInstalled(pkg: string): Promise<boolean> {
  try {
    return await AppInstalledUtils.isAppInstalled(pkg);
  } catch {
    return false;
  }
}

/**
 * Mở app TikTok theo package name.
 */
export async function openAppByPackage(pkg: string): Promise<boolean> {
  try {
    return await OpenAppUtils.openAppByPackage(pkg);
  } catch {
    return false;
  }
}
