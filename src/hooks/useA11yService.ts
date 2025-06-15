import { text } from '@constants';
import { a11yService } from '@utils';
import { useCallback, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

// Lấy các hàm kiểm tra và mở cài đặt A11y Service từ module utils
const { checkA11yService, openA11ySettings } = a11yService;

/**
 * Hook kiểm tra và mở cài đặt A11y Service cho TikTool (Android).
 * - Tự động kiểm tra trạng thái service khi mount và khi app active lại.
 * - Nếu chưa bật service, có thể mở nhanh cài đặt để bật.
 * - Quản lý trạng thái service và lỗi (nếu có).
 */

export default function useA11yService() {
  const [isA11yEnabled, setIsA11yEnabled] = useState(false);
  const [a11yError, setA11yError] = useState<string | null>(null);

  /**
   * Kiểm tra trạng thái service, cập nhật state và lỗi nếu có.
   */
  const checkService = useCallback(async () => {
    try {
      setA11yError(null);
      const enabled = await checkA11yService();
      setIsA11yEnabled(enabled);
      // Nếu chưa có quyền thì mới xin quyền
      !enabled && (await openA11ySettings());
    } catch (e) {
      setA11yError(text.OpenA11yError);
    }
  }, []);

  useEffect(() => {
    checkService();
    const subscription = AppState.addEventListener('change', async (nextAppState: AppStateStatus) => {
      nextAppState === 'active' && (await checkService());
    });
    return () => subscription.remove();
  }, [checkService]);

  return { isA11yEnabled, openA11ySettings, a11yError };
}
