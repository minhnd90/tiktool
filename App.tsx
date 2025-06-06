import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TikTokButton from './components/TikTokButton';
import useOverlayPermission from './hooks/useOverlayPermission';

function App(): React.JSX.Element {
  const { isGranted, requestPermission, error } = useOverlayPermission();

  return (
    <SafeAreaView style={styles.container}>
      {!isGranted && (
        <View>
          <TikTokButton id="request-overlay" text="Request Overlay Permission"
            style={styles.buttonMargin} action={requestPermission} />
          {error && <Text style={styles.errorText}>{error}</Text>}
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
