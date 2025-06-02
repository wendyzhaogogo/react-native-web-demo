import React, { useState } from 'react';
import { View, Clipboard, StyleSheet } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import { generateKeyPair, hashMessage, signMessage } from '@/utils/crypto';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Sign: undefined;
  Verify: {
    message: string;
    publicKey: string;
    signature: string;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Sign'>;

export const SignScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [message, setMessage] = useState('');
  const [hash, setHash] = useState('');
  const [signature, setSignature] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGenerateKeys = async () => {
    try {
      const keys = await generateKeyPair();
      setPrivateKey(keys.privateKey);
      setPublicKey(keys.publicKey);
    } catch (error) {
      console.error('Failed to generate keys:', error);
    }
  };

  const handleSign = async () => {
    if (!message || !privateKey) return;
    
    const messageHash = hashMessage(message);
    setHash(messageHash);
    
    const sig = await signMessage(message, privateKey);
    setSignature(sig);
  };

  const handleCopyPublicKey = async () => {
    if (!publicKey) return;
    
    await Clipboard.setString(publicKey);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Sign Message</Text>
      
      <Button 
        mode="contained"
        onPress={handleGenerateKeys} 
        style={styles.button}
      >
        Generate New Keys
      </Button>

      {publicKey ? (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text variant="bodySmall" style={styles.label}>Public Key:</Text>
            <IconButton
              icon={copySuccess ? "check" : "content-copy"}
              size={20}
              onPress={handleCopyPublicKey}
              style={[styles.iconButton, copySuccess && styles.successIconButton]}
            />
          </View>
          <Text selectable style={styles.monoText}>{publicKey}</Text>
        </View>
      ):null}

      <TextInput
        mode="outlined"
        label="Message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <Button 
        mode="contained"
        onPress={handleSign} 
        style={styles.button}
      >
        Hash + Sign
      </Button>

      {hash ? (
        <View style={styles.card}>
          <Text variant="bodySmall" style={styles.label}>Hash (SHA-256):</Text>
          <Text selectable style={styles.monoText}>{hash}</Text>
        </View>
      ):null}

      {signature ? (
        <View style={styles.card}>
          <Text variant="bodySmall" style={styles.label}>Signature (Ed25519):</Text>
          <Text selectable style={styles.monoText}>{signature}</Text>
        </View>
      ):null}

      <Button 
        mode="outlined"
        onPress={() => navigation.navigate('Verify', {
          message,
          publicKey,
          signature
        })}
        style={styles.button}
      >
        Go to Verify
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginVertical: 8,
  },
  card: {
    padding: 12,
    marginVertical: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: '#374151',
  },
  iconButton: {
    margin: 0,
  },
  successIconButton: {
    backgroundColor: '#dcfce7',
  },
  monoText: {
    marginTop: 4,
    fontFamily: 'monospace',
    fontSize: 12,
  },
  input: {
    marginVertical: 12,
  },
}); 