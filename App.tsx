import { LoginScreen, SelectTiktokVariant, TikTokButton } from '@components';
import { text } from '@constants';
import { useA11yService, useOverlayPermission } from '@hooks';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

function App(): React.JSX.Element {
  /* State quản lý trạng thái đăng nhập
   * Mặc định là đã đăng nhập để hiển thị màn hình chính
   */
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { isOverlayGranted, requestOverlayPermission, overlayError } = useOverlayPermission();
  const { isA11yEnabled, openA11ySettings, a11yError } = useA11yService();

  const handleLogin = (_username: string, _password: string) => {
    // TODO: Xác thực tài khoản ở đây (hiện tại chỉ demo, luôn thành công)
    setIsLoggedIn(true);
  };

  // Hiển thị màn hình đăng nhập chỉ khi đã có đủ cả 2 quyền
  const shouldShowLogin = isOverlayGranted && isA11yEnabled && !isLoggedIn;

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      {/* Nút yêu cầu quyền hiển thị trên ứng dụng khác */}
      {!isOverlayGranted &&
        <TikTokButton id="request-overlay" text={text.RequestOverlay} action={requestOverlayPermission} />
      }

      {/* Nút mở cài đặt Hỗ trợ tiếp cận */}
      {!isA11yEnabled &&
        <TikTokButton id="open-a11y" text={text.OpenA11y} action={openA11ySettings} />}

      {/* Hiển thị lỗi nếu có */}
      {overlayError &&
        <Text style={styles.errorText}>{overlayError}</Text>
      }
      {a11yError &&
        <Text style={styles.errorText}>{a11yError}</Text>
      }

      {/* Hiển thị màn hình đăng nhập */}
      {shouldShowLogin &&
        <LoginScreen onLogin={handleLogin} />
      }

      {/* Hiển thị danh sách các phiên bản của TikTok, người dùng chỉ được chọn một phiên bản */}
      {isLoggedIn &&
        (<SelectTiktokVariant />)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
  },
});

export default App;
