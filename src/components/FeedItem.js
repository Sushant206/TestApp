// src/components/FeedItem.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FeedItem({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const likeCount = Array.isArray(post.reactions.length)
    ? post.reactions.reduce((sum, r) => sum + (r.count || 0), 0)
    : 0;
  const shareCount = post.share ?? 0;
  const file = post.files && post.files.length ? post.files[0] : null;

  return (
    <View style={styles.card}>
      {/* ... same UI you already have ... */}
      <View style={styles.topRow}>
        <View style={styles.userRow}>
          <FastImage
            source={{ uri: post.user.avatar }}
            style={styles.avatar}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.username}>{post.user.name}</Text>
        </View>
        <View style={styles.statsRow}>
          <Icon name="heart" size={18} color="#e91e63" />
          <Text style={styles.statText}>{likeCount}</Text>
          <Icon
            name="share-social"
            size={18}
            color="#666"
            style={styles.statIconSpacing}
          />
          <Text style={styles.statText}>{shareCount} Shares</Text>
        </View>
      </View>

      <View style={styles.subRow}>
        <Text style={styles.timestamp}>{formattedDate}</Text>
        <Icon name="globe-outline" size={14} color="#666" style={styles.globe} />
      </View>

      {file && (
        <FastImage
          source={{ uri: file.url }}
          style={styles.postImage}
          resizeMode={FastImage.resizeMode.cover}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    padding: 12,
    // Shadow (iOS) / elevation (Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#333',
  },
  statIconSpacing: {
    marginLeft: 16,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  globe: {
    marginLeft: 6,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});
