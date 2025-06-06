import React, { useEffect, useRef, useState } from 'react';
import { AppState, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { isOverlayPermissionGranted, requestOverlayPermission } from '@vokhuyet/react-native-draw-overlay';
import TikTokButton from './components/TikTokButton';

const checkAndRequestOverlayPermission = async (setIsOverlayGranted: (v: boolean) => void) => {
  const granted = await isOverlayPermissionGranted();
  setIsOverlayGranted(granted);
  if (!granted) {
    await requestOverlayPermission();
    setIsOverlayGranted(await isOverlayPermissionGranted());
  }
};

function App(): React.JSX.Element {
  const [isOverlayGranted, setIsOverlayGranted] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    checkAndRequestOverlayPermission(setIsOverlayGranted);

    const subscription = AppState.addEventListener('change', async nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        setIsOverlayGranted(await isOverlayPermissionGranted());
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>{appStateVisible}</Text>
        {!isOverlayGranted && (
          <TikTokButton
            id="request-overlay"
            text="Request Permissions"
            style={styles.buttonMargin}
            action={() => checkAndRequestOverlayPermission(setIsOverlayGranted)}
          />
        )}
      </View>
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
});

export default App;
