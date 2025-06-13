import { NativeModules } from 'react-native';

/**
 * Kiểm tra xem app với package name đã được cài trên máy chưa.
 * (React Native không hỗ trợ trực tiếp, cần native module, nhưng có thể thử Linking.canOpenURL)
 */
export async function isAppInstalled(pkg: string): Promise<boolean> {
  try {
    if (NativeModules.AppInstalledUtils && NativeModules.AppInstalledUtils.isAppInstalled) {
      return await NativeModules.AppInstalledUtils.isAppInstalled(pkg);
    }
    // fallback: luôn trả về false nếu không có native module
    return false;
  } catch {
    return false;
  }
}

/**
 * Mở app TikTok theo package name.
 */
export async function openTiktokByPackage(pkg: string): Promise<boolean> {
  try {
    if (NativeModules.OpenTiktokUtils && NativeModules.OpenTiktokUtils.openTiktokByPackage) {
      return await NativeModules.OpenTiktokUtils.openTiktokByPackage(pkg);
    }
    // fallback: luôn trả về false nếu không có native module
    return false;
  } catch {
    return false;
  }
}
