// src/components/Stories.js

import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

const STORIES = [
  {
    id: '1',
    name: 'You',
    avatar: 'https://picsum.photos/id/1012/80/80',
    images: [
      'https://picsum.photos/id/1012/600/800',
      'https://picsum.photos/id/1013/600/800',
      'https://picsum.photos/id/1014/600/800',
    ],
  },
  {
    id: '2',
    name: 'Alice',
    avatar: 'https://picsum.photos/id/1013/80/80',
    images: [
      'https://picsum.photos/id/1015/600/800',
      'https://picsum.photos/id/1016/600/800',
    ],
  },
  {
    id: '3',
    name: 'Bob',
    avatar: 'https://picsum.photos/id/1014/80/80',
    images: ['https://picsum.photos/id/1017/600/800'],
  },
  {
    id: '4',
    name: 'Carlos',
    avatar: 'https://picsum.photos/id/1015/80/80',
    images: [
      'https://picsum.photos/id/1018/600/800',
      'https://picsum.photos/id/1019/600/800',
      'https://picsum.photos/id/1020/600/800',
    ],
  },
  {
    id: '5',
    name: 'Fatima',
    avatar: 'https://picsum.photos/id/1016/80/80',
    images: ['https://picsum.photos/id/1021/600/800'],
  },
  {
    id: '6',
    name: 'George',
    avatar: 'https://picsum.photos/id/1017/80/80',
    images: [
      'https://picsum.photos/id/1022/600/800',
      'https://picsum.photos/id/1023/600/800',
    ],
  },
  // add more as needed...
];

export default function Stories() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={STORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.story}
            onPress={() =>
              navigation.navigate('Story', { stories: item.images })
            }
          >
            <FastImage
              source={{ uri: item.avatar }}
              style={styles.avatar}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  list: {
    paddingHorizontal: 16,
  },
  story: {
    width: 70,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#e91e63',
  },
  name: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
  },
});
