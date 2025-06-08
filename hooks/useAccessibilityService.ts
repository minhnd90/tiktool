import {useCallback, useEffect, useState} from 'react';
import {AppState, AppStateStatus, NativeModules} from 'react-native';

/**
 * Hook kiểm tra và mở cài đặt Accessibility Service cho TikTool (Android).
 */
const {AccessibilityServiceUtils} = NativeModules;

export default function useAccessibilityService() {
  const [isServiceEnabled, setIsServiceEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkService = useCallback(async () => {
    if (!AccessibilityServiceUtils) {
      setIsServiceEnabled(false);
      return;
    }
    try {
      setError(null);
      setIsServiceEnabled(await AccessibilityServiceUtils.isServiceEnabled());
    } catch (e) {
      setError('Không kiểm tra được trạng thái dịch vụ hỗ trợ tiếp cận.');
      setIsServiceEnabled(false);
    }
  }, []);

  const openSettings = useCallback(async () => {
    if (AccessibilityServiceUtils) {
      try {
        await AccessibilityServiceUtils.openAccessibilitySettings();
      } catch (e) {
        setError('Không mở được cài đặt hỗ trợ tiếp cận.');
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

  return {isServiceEnabled, checkService, openSettings, error};
}
