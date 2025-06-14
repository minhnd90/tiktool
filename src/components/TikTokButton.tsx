import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

const TikTokButton = ({
  id,
  text,
  style,
  action,
}: {
  id?: string;
  text: string;
  style?: object;
  action: () => void;
}) => {

  return (
    <TouchableRipple id={id} style={[styles.tiktokButton, style]} onPress={action}>
      <Text style={styles.tiktokText}>{text}</Text>
    </TouchableRipple>
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
    marginBottom: 20,
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
