// src/components/Hashtags.js

import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Static list matching your design
const TAGS = ['Food', 'Travel', 'Shopping', 'Science', 'Sports', 'Art'];

export default function Hashtags() {
  const [selected, setSelected] = useState(TAGS[0]);

  return (
    <View style={styles.container}>
      <FlatList
        data={TAGS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isActive = item === selected;
          return (
            <TouchableOpacity
              onPress={() => setSelected(item)}
            >
              <Text style={[styles.tag, isActive ? styles.active : styles.inactive]}>
                #{item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  list: {
    paddingHorizontal: 16,
  },
  tag: {
    fontSize: 16,
    marginRight: 16,
  },
  active: {
    color: '#e91e63',
    fontWeight: 'bold',
  },
  inactive: {
    color: '#666',
  },
});
