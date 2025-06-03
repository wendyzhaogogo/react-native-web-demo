import { NativeModules, Platform } from 'react-native';

const { NativeAlert } = NativeModules;

interface NativeAlertInterface {
  showAlert(title: string, message: string): Promise<void>;
}

export default NativeAlert as NativeAlertInterface; 