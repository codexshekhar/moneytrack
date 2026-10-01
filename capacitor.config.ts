import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.astrcodex.moneytrack',
  appName: 'MoneyTrack',
  webDir: 'capacitor-build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
