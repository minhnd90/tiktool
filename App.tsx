import { isOverlayPermissionGranted } from '@vokhuyet/react-native-draw-overlay';
import React, { useEffect, useState } from 'react';
import { AppState, SafeAreaView, StyleSheet, View } from 'react-native';
import TikTokButton from './components/TikTokButton';
import { checkAndRequestOverlayPermission } from './utils/checkAndRequestOverlayPermission';

function App(): React.JSX.Element {
  const [isOverlayGranted, setIsOverlayGranted] = useState(false);

  useEffect(() => {
    checkAndRequestOverlayPermission(setIsOverlayGranted);

    const subscription = AppState.addEventListener('change', async nextAppState => {
      if (nextAppState === 'active') {
        setIsOverlayGranted(await isOverlayPermissionGranted());
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
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
