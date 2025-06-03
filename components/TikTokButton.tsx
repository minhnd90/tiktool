import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking, Alert } from 'react-native';

const TikTokButton = () => {
  const openTikTok = async () => {
    const tiktokAppUrl = 'tiktok://';
    const tiktokWebUrl = 'https://www.tiktok.com';

    try {
      const canOpen = await Linking.canOpenURL(tiktokAppUrl);

      if (canOpen) {
        await Linking.openURL(tiktokAppUrl);
      } else {
        await Linking.openURL(tiktokWebUrl);
      }
    } catch (error) {
      console.error('Error opening TikTok:', error);
      Alert.alert('Error', 'Unable to open TikTok');
    }
  };

  return (
    <TouchableOpacity style={styles.tiktokButton} onPress={openTikTok}>
      <Text style={styles.tiktokText}>Bắt đầu</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tiktokButton: {
    backgroundColor: '#FF0050',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#FF0050',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tiktokText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default TikTokButton;
