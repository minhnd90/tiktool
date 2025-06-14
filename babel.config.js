module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components/index',
          '@assets': './src/assets/index',
          '@screens': './src/screens/index',
          '@utils': './src/utils/index',
          '@hooks': './src/hooks/index',
          '@navigation': './src/navigation/index',
          '@constants': './src/constants/index',
          '@services': './src/services/index',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
  ],
};
