import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { DarkTheme } from '@react-navigation/native';

export default function HomeScreen() {
  const [coins, setCoins] = useState(67);
  return (
    <ThemedView style={styles.wholePage}>
      <ThemedText type="default" style={styles.coinCount}>💰 {coins}</ThemedText>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Penny Trail</ThemedText>
      </ThemedView>
      <ThemedView style={styles.grid}>
        {/* Row 1 */}
        <Link href="/scan" asChild>
          <Pressable style={styles.gridItem}>
            <ThemedText type="defaultSemiBold">Scan item</ThemedText>
          </Pressable>
        </Link>
        
        <Link href="/shop" asChild>
          <Pressable style={styles.gridItem}>
            <ThemedText type="defaultSemiBold">Shop</ThemedText>
          </Pressable>
        </Link>

        {/* Row 2 */}
        <Link href="/save" asChild>
          <Pressable style={styles.gridItem}>
            <ThemedText type="defaultSemiBold">Save</ThemedText>
          </Pressable>
        </Link>

        <Link href="/leaderboard" asChild>
          <Pressable style={styles.gridItem}>
            <ThemedText type="defaultSemiBold">Leaderboard</ThemedText>
          </Pressable>
        </Link>
      </ThemedView>
      <Image
        source={require('@/assets/images/dog.jpg')}
        style={styles.image}
      />
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
    backgroundColor: 'transparent',
    marginLeft: 8,
    marginVertical: 36,
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  coinCount: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 50,         
    right: 30,
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
