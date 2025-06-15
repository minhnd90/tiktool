import { NativeModules } from 'react-native';

export interface AppInstalledUtilsType {
  isAppInstalled(pkg: string): Promise<boolean>;
}
export interface OpenAppUtilsType {
  openAppByPackage(pkg: string): Promise<boolean>;
}

const { AppInstalledUtils, OpenAppUtils } = NativeModules as {
  AppInstalledUtils: AppInstalledUtilsType;
  OpenAppUtils: OpenAppUtilsType;
};

/**
 * Kiểm tra xem app với package name đã được cài trên máy chưa.
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
