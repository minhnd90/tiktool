import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TikTokButton from './components/TikTokButton';
import useAccessibilityService from './hooks/useAccessibilityService';
import useOverlayPermission from './hooks/useOverlayPermission';

function App(): React.JSX.Element {
  const { isOverlayGranted, requestOverlayPermission, overlayError } = useOverlayPermission();
  const { isServiceEnabled, openAccessibilitySettings, accessibilityError } = useAccessibilityService();

  return (
    <SafeAreaView style={styles.container}>
      {!isOverlayGranted && (
        <View>
          <TikTokButton id="request-overlay" text="Cấp quyền hiển thị trên ứng dụng khác"
            style={styles.buttonMargin} action={requestOverlayPermission} />
          {overlayError && <Text style={styles.errorText}>{overlayError}</Text>}
        </View>
      )}
      {!isServiceEnabled && (
        <View>
          <TikTokButton id="open-accessibility" text="Mở cài đặt Hỗ trợ tiếp cận"
            style={styles.buttonMargin} action={openAccessibilitySettings} />
          {accessibilityError && <Text style={styles.errorText}>{accessibilityError}</Text>}
        </View>
      )}
    </SafeAreaView>
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
