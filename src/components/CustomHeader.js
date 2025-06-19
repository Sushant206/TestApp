// src/components/CustomHeader.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CustomHeader() {
  return (
    <View style={styles.container}>
      {/* Left icons */}
      <View style={styles.side}>
        <Icon name="arrow-back" size={24} color="#000" />
        <Icon
          name="camera-outline"
          size={24}
          color="#000"
          style={styles.iconSpacing}
        />
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Ankita</Text>
        <Icon name="chevron-down" size={20} color="#000" />
      </View>

      {/* Right icons */}
      <View style={styles.side}>
        <Icon name="search-outline" size={24} color="#000" />
        <Icon
          name="ellipsis-vertical"
          size={24}
          color="#000"
          style={styles.iconSpacing}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,               
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',   // white background
  },
  side: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#000',             // black text
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 4,
  },
  iconSpacing: {
    marginLeft: 16,
  },
});
