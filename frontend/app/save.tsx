import { Image } from 'expo-image';
import { StyleSheet, Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { DarkTheme } from '@react-navigation/native';

export default function ScanPage() {
  return (
    <ThemedView style={styles.wholePage}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">save</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wholePage: {
    flex: 1,
    flexDirection: 'column',
    padding: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginVertical: 36,
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  grid: {
    flex: 1, // Takes up all remaining vertical space
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'stretch', // Stretches rows to fill height
    gap: 15, // Gap between buttons
  },
  gridItem: {
    width: '47%', // Slightly less than 50% to account for gap
    height: '47%', // Slightly less than 50% to account for gap
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    padding: 150,
    margin: 40
  },
});
