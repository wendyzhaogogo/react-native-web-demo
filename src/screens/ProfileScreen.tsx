import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text, Button, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <Animated.View 
      style={[
        styles.container,
      ]}
    >
      <View style={styles.header}>
        <Button 
          icon="close" 
          onPress={handleClose}
          style={styles.closeButton}
        >
          <Text style={styles.title}>Profile</Text>
        </Button>
      </View>

      <View style={styles.content}>
        <Avatar.Image 
          size={120} 
          source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.2k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>364</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <Button 
          mode="contained" 
          onPress={() => {}}
          style={styles.editButton}
        >
          Edit Profile
        </Button>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    width: '100%',
    marginTop: 16,
  },
}); 