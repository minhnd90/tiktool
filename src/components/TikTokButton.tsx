import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

const TikTokButton = ({
  id,
  text,
  style,
  disabled,
  action,
}: {
  id?: string;
  text: string;
  style?: object;
  action: () => void;
  disabled?: boolean;
}) => {

  return (
    <TouchableRipple
      id={id}
      style={[
        styles.tiktokButton,
        style,
        disabled && styles.tiktokButtonDisabled,
      ]}
      onPress={action}
      disabled={disabled}
    >
      <Text style={styles.tiktokText}>{text}</Text>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  tiktokButton: {
    backgroundColor: '#ff0050',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#ff0050',
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  tiktokText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  tiktokButtonDisabled: {
    backgroundColor: '#ff005080',
  },
});

export default TikTokButton;
