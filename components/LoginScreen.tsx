import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

/**
 * Màn hình đăng nhập TikTool.
 * @param onLogin Hàm callback khi đăng nhập thành công
 */
function LoginScreen({ onLogin }: { onLogin: (username: string, password: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    if (!username || !password) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu.');
      return;
    }
    setError(null);
    onLogin(username, password);
  };

  return (
    <View>
      <TextInput
        style={styles.loginInput}
        autoComplete="username"
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        maxLength={20}
      />
      <TextInput
        style={styles.loginInput}
        autoComplete="password"
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCorrect={false}
        autoCapitalize="none"
        maxLength={20}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Đăng nhập" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  loginInput: {
    width: 320,
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 16,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
  },
});

export default LoginScreen;
