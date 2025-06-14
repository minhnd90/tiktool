module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components/_index',
          '@assets': './src/assets/_index',
          '@screens': './src/screens/_index',
          '@utils': './src/utils/_index',
          '@hooks': './src/hooks/_index',
          '@navigation': './src/navigation/_index',
          '@constants': './src/constants/_index',
          '@services': './src/services/_index',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
  ],
};
