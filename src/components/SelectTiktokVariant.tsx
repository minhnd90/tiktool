import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { text, tiktokVariants } from '@constants/index';
import { isAppInstalled, openTiktokByPackage } from '@utils/tiktokApps';
import TikTokButton from './TikTokButton';

interface TikTokApp {
  name: string;
  package: string;
  installed: boolean;
}

/**
 * View chọn phiên bản TikTok và bắt đầu nhiệm vụ.
 */
const SelectTiktokVersionView: React.FC = () => {
  const [installedApps, setInstalledApps] = useState<TikTokApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkInstalledApps = useCallback(async () => {
    try {
      const results = await Promise.all(
        tiktokVariants.map(async app => ({
          ...app,
          installed: await isAppInstalled(app.package),
        }))
      );
      setInstalledApps(results.filter(app => app.installed));
      setError(null);
    } catch (err) {
      setError(text.CheckAppError);
      setInstalledApps([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkInstalledApps();
  }, [checkInstalledApps]);

  return (
    <View>
      <Text style={styles.text} accessibilityRole="header">{text.SelectVersion}</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {installedApps.length === 0 && !error ?
        loading ? (
          <ActivityIndicator size="large" color="#FF0050" accessibilityLabel={text.CheckAppIndicator} />
        ) : (
          <Text style={styles.errorText}>{text.NoTikTokInstalled}</Text>
        ) : (
          installedApps.map(app => (
            <TikTokButton
              key={app.package}
              id={`start-task-${app.package}`}
              text={`${text.StartTask} ${app.name}`}
              action={() => openTiktokByPackage(app.package)}
              style={styles.buttonMargin}
            />
          ))
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonMargin: {
    marginBottom: 16,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
    marginBottom: 12,
  },
});

export default SelectTiktokVersionView;
