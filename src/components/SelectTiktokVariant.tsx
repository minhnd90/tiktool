import { text, tiktokVariants } from '@constants';
import { tiktokApps } from '@utils';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

import TikTokButton from './TikTokButton';

const { isAppInstalled, openAppByPackage } = tiktokApps;

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
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

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
          <>
            <RadioButton.Group
              onValueChange={value => setSelectedPackage(value)}
              value={selectedPackage ?? ''}
            >
              {installedApps.map(app => (
                <RadioButton.Item
                  key={app.package}
                  label={app.name}
                  value={app.package}
                />
              ))}
            </RadioButton.Group>
            <TikTokButton
              id="start-task-btn"
              text={text.StartTask}
              action={() => selectedPackage && openAppByPackage(selectedPackage)}
              disabled={!selectedPackage}
              style={styles.buttonMargin}
            />
          </>
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
    marginBlock: 16,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
    marginBottom: 12,
  },
});

export default SelectTiktokVersionView;
