import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { generateKeyPair, hashMessage, signMessage } from '../utils/crypto';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Sign: undefined;
  Verify: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Sign'>;

export const SignScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [message, setMessage] = useState('');
  const [hash, setHash] = useState('');
  const [signature, setSignature] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');

  const handleGenerateKeys = async () => {
    const keys = await generateKeyPair();
    setPrivateKey(keys.privateKey);
    setPublicKey(keys.publicKey);
  };

  const handleSign = async () => {
    if (!message || !privateKey) return;
    
    const messageHash = hashMessage(message);
    setHash(messageHash);
    
    const sig = await signMessage(message, privateKey);
    setSignature(sig);
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text variant="headlineMedium" className="mb-5 text-center">Sign Message</Text>
      
      <Button mode="contained" onPress={handleGenerateKeys} className="my-2">
        Generate New Keys
      </Button>

      {publicKey && (
        <View className="p-3 my-3 bg-gray-100 rounded-lg">
          <Text variant="bodySmall">Public Key:</Text>
          <Text selectable className="mt-1 font-mono text-xs">{publicKey}</Text>
        </View>
      )}

      <TextInput
        label="Message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
        className="my-3"
      />

      <Button mode="contained" onPress={handleSign} className="my-2">
        Hash + Sign
      </Button>

      {hash && (
        <View className="p-3 mt-4 bg-gray-100 rounded-lg">
          <Text variant="bodySmall">Hash (SHA-256):</Text>
          <Text selectable className="mt-1 font-mono text-xs">{hash}</Text>
        </View>
      )}

      {signature && (
        <View className="p-3 mt-4 bg-gray-100 rounded-lg">
          <Text variant="bodySmall">Signature (Ed25519):</Text>
          <Text selectable className="mt-1 font-mono text-xs">{signature}</Text>
        </View>
      )}

      <Button 
        mode="outlined" 
        onPress={() => navigation.navigate('Verify')}
        className="my-2"
      >
        Go to Verify
      </Button>
    </View>
  );
}; 