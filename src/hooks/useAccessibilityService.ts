import { useCallback, useEffect, useState } from 'react';
import { AppState, AppStateStatus, NativeModules } from 'react-native';

/**
 * Hook kiểm tra và mở cài đặt Accessibility Service cho TikTool (Android).
 */
const {AccessibilityServiceUtils} = NativeModules;

export default function useAccessibilityService() {
  const [isServiceEnabled, setIsServiceEnabled] = useState(false);
  const [accessibilityError, setAccessibilityError] = useState<string | null>(null);

  const checkService = useCallback(async () => {
    if (!AccessibilityServiceUtils) {
      setIsServiceEnabled(false);
      return;
    }
    try {
      setAccessibilityError(null);
      setIsServiceEnabled(await AccessibilityServiceUtils.isServiceEnabled());
    } catch (e) {
      setAccessibilityError('Không kiểm tra được trạng thái dịch vụ hỗ trợ tiếp cận.');
      setIsServiceEnabled(false);
    }
  }, []);

  const openAccessibilitySettings = useCallback(async () => {
    if (AccessibilityServiceUtils) {
      try {
        await AccessibilityServiceUtils.openAccessibilitySettings();
      } catch (e) {
        setAccessibilityError('Không mở được cài đặt hỗ trợ tiếp cận.');
      }
    }
  }, []);

  useEffect(() => {
    checkService();
    const subscription = AppState.addEventListener('change', async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        await checkService();
      }
    });
    return () => subscription.remove();
  }, [checkService]);

  return {isServiceEnabled, openAccessibilitySettings, accessibilityError};
}
