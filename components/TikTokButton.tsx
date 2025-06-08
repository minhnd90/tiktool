import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

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
    <TouchableOpacity id={id} style={[styles.tiktokButton, style]} onPress={action}>
      <Text style={styles.tiktokText}>{text}</Text>
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
