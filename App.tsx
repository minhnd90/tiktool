import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './components/LoginScreen';
import TikTokButton from './components/TikTokButton';
import useAccessibilityService from './hooks/useAccessibilityService';
import useOverlayPermission from './hooks/useOverlayPermission';

function App(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isOverlayGranted, requestOverlayPermission, overlayError } = useOverlayPermission();
  const { isServiceEnabled, openAccessibilitySettings, accessibilityError } = useAccessibilityService();

  useEffect(() => {
    // Ẩn status bar khi app khởi động
    StatusBar.setHidden(true, 'slide');
  }, []);

  const handleLogin = (_username: string, _password: string) => {
    // TODO: Xác thực tài khoản ở đây (hiện tại chỉ demo, luôn thành công)
    setIsLoggedIn(true);
  };

  // Hiển thị màn hình đăng nhập chỉ khi đã có đủ cả 2 quyền
  const shouldShowLogin = isOverlayGranted && isServiceEnabled && !isLoggedIn;

  return (
    <View style={styles.container}>
      {!isOverlayGranted && (
        <View>
          <TikTokButton id="request-overlay" text="Cấp quyền hiển thị trên ứng dụng khác"
            style={styles.buttonMargin} action={requestOverlayPermission} />
          {overlayError && <Text style={styles.errorText}>{overlayError}</Text>}
        </View>
      )}
      {isOverlayGranted && !isServiceEnabled && (
        <View>
          <TikTokButton id="open-accessibility" text="Mở cài đặt Hỗ trợ tiếp cận"
            style={styles.buttonMargin} action={openAccessibilitySettings} />
          {accessibilityError && <Text style={styles.errorText}>{accessibilityError}</Text>}
        </View>
      )}
      {shouldShowLogin ? <LoginScreen onLogin={handleLogin} /> : <View><Text>Chào mừng đến với TikTool!</Text></View>}
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
  buttonMargin: {
    marginBottom: 20,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
  },
});

export default App;
