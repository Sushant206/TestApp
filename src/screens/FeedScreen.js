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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const ITEMS_PER_PAGE = 4;

  // Core loader: fetches a page of items
  const loadPage = useCallback(
    async (pageToLoad, replace = false) => {
      try {
        const items = await fetchFeed(pageToLoad, ITEMS_PER_PAGE);
        if (replace) {
          setFeed(items);
        } else {
          setFeed(prev => [...prev, ...items]);
        }
        if (items.length < ITEMS_PER_PAGE) {
          setHasMore(false);
        }
        setPage(pageToLoad);
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

  // Initial load
  useEffect(() => {
    loadPage(1, true);
  }, [loadPage]);

  // Pull-to-refresh handler
  const onRefresh = () => {
    setRefreshing(true);
    setHasMore(true);
    loadPage(1, true);
  };

  // Infinite-scroll handler
  const onEndReached = () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    loadPage(page + 1);
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
        keyExtractor={item => item.id.toString()}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  list: {
    padding: 16,
  },
  footer: {
    paddingVertical: 12,
  },
});
