import {text} from '@constants';
import {overlayPermission} from '@utils';
import {useCallback, useEffect, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

// Lấy các hàm kiểm tra và xin quyền overlay từ module utils
const {checkOverlayPermission, requestOverlayPermission} = overlayPermission;

/**
 * Hook kiểm tra và xin quyền hiển thị trên ứng dụng khác (Overlay Permission) cho Android.
 * - Tự động kiểm tra quyền khi mount và khi app active lại.
 * - Nếu chưa có quyền, gọi requestOverlayPermission để xin quyền.
 * - Quản lý trạng thái granted và lỗi (nếu có).
 */
export default function useOverlayPermission(): any {
  const [isOverlayGranted, setIsOverlayGranted] = useState(false);
  const [overlayError, setOverlayError] = useState<string | null>(null);

  /**
   * Hàm xin quyền overlay nếu chưa có, đồng thời cập nhật trạng thái granted và lỗi.
   */
  const requestPermission = useCallback(async () => {
    try {
      setOverlayError(null);
      const granted = await checkOverlayPermission();
      setIsOverlayGranted(granted);
      // Nếu chưa có quyền thì mới xin quyền
      !granted && (await requestOverlayPermission());
    } catch (e) {
      setOverlayError(text.RequestOverlayError);
    }
  }, []);

  // Tự động kiểm tra quyền khi mount và khi app active lại
  useEffect(() => {
    requestPermission();
    const subscription = AppState.addEventListener('change', async (nextAppState: AppStateStatus) => {
      nextAppState === 'active' && (await requestPermission());
    });
    return () => subscription.remove();
  }, [requestPermission]);

  return {isOverlayGranted, requestOverlayPermission, overlayError};
}
