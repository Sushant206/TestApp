// src/screens/FeedScreen.js

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import FeedItem from '../components/FeedItem';
import CustomHeader from '../components/CustomHeader';
import { fetchFeed } from '../service/feedService';
import Stories from '../components/Stories';
import Hashtags from '../components/Hashtags';

export default function FeedScreen() {
  const [feed, setFeed] = useState([]);
  const [lastId, setLastId] = useState('');   // for pagination
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const ITEMS_PER_PAGE = 4;

  const loadFeed = useCallback(
    async (useLastId = '', replace = false) => {
      try {
        const { feeds, more } = await fetchFeed(useLastId, ITEMS_PER_PAGE);

        setFeed(prev =>
          replace ? feeds : [...prev, ...feeds]
        );
        setHasMore(more);

        // update lastId for next page
        if (feeds.length > 0) {
          setLastId(feeds[feeds.length - 1]._id);
        }
        setError(null);
      } catch (err) {
        setError(err.message || 'Error fetching feed');
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    []
  );

  // initial load
  useEffect(() => {
    loadFeed('', true);
  }, [loadFeed]);

  // pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    setHasMore(true);
    setLastId('');
    loadFeed('', true);
  };

  // infinite scroll
  const onEndReached = () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    loadFeed(lastId, false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      <Stories />
      <Hashtags />

      <FlatList
        data={feed}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <FeedItem post={item} />}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16 },
  list: { padding: 16 },
  footer: { paddingVertical: 12 },
});
