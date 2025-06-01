import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { verifySignature } from '../utils/crypto';

export const VerifyScreen = () => {
  const [message, setMessage] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [signature, setSignature] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleVerify = async () => {
    if (!message || !publicKey || !signature) return;
    
    const valid = await verifySignature(message, signature, publicKey);
    setIsValid(valid);
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text variant="headlineMedium" className="mb-5 text-center">Verify Signature</Text>

      <TextInput
        label="Message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
        className="my-2"
      />

      <TextInput
        label="Public Key (base64)"
        value={publicKey}
        onChangeText={setPublicKey}
        className="my-2"
      />

      <TextInput
        label="Signature (base64)"
        value={signature}
        onChangeText={setSignature}
        className="my-2"
      />

      <Button mode="contained" onPress={handleVerify} className="my-4">
        Verify
      </Button>

      {isValid !== null && (
        <View className={`mt-4 p-4 rounded-lg items-center ${
          isValid ? 'bg-green-100' : 'bg-red-100'
        }`}>
          <Text className={`text-lg font-bold ${
            isValid ? 'text-green-800' : 'text-red-800'
          }`}>
            {isValid ? 'Valid Signature' : 'Invalid Signature'}
          </Text>
        </View>
      )}
    </View>
  );
}; 