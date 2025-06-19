// src/components/FeedItem.js

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

export default function FeedItem({ post }) {
  // Format ISO timestamp to “Weekday, Month Day”
  const formattedDate = new Date(post.timestamp).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.card}>
      {/* Top row: avatar + name on left; stats on right */}
      <View style={styles.topRow}>
        <View style={styles.userRow}>
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <Text style={styles.username}>{post.user.name}</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Icon name="heart" size={18} color="#e91e63" />
            <Text style={styles.statText}>{post.likes}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="share-social" size={18} color="#666" />
            <Text style={styles.statText}>{post.comments} Shares</Text>
          </View>
        </View>
      </View>

      {/* Second row: date + globe icon */}
      <View style={styles.subRow}>
        <Text style={styles.timestamp}>{formattedDate}</Text>
        <Icon
          name="globe-outline"
          size={14}
          color="#666"
          style={styles.globe}
        />
      </View>

      {/* Post image */}
      {post.image && (
       <FastImage
          source={{ uri: post.image }}
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
    color:'black'
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  statText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#333',
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
    resizeMode: 'cover',
  },
});
