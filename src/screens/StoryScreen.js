// src/screens/StoryScreen.js
import React, { useState } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function StoryScreen({ route, navigation }) {
  // Array of image URLs passed in params
  const { stories } = route.params;
  const [index, setIndex] = useState(0);

  const goNext = () => {
    if (index < stories.length - 1) {
      setIndex(i => i + 1);
    } else {
      navigation.goBack();
    }
  };

  const goPrev = () => {
    if (index > 0) {
      setIndex(i => i - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Full-screen image */}
      <FastImage
        source={{ uri: stories[index] }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />

      {/* Close button */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => navigation.goBack()}
      >
        <Icon name="close" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Tap areas */}
      <TouchableOpacity
        style={styles.leftArea}
        onPress={goPrev}
      />
      <TouchableOpacity
        style={styles.rightArea}
        onPress={goNext}
      />

      {/* Progress indicators */}
      <View style={styles.progressBarContainer}>
        {stories.map((_, i) => (
          <View
            key={i}
            style={[
              styles.progressBar,
              i <= index ? styles.progressFilled : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width,
    height,
  },
  closeBtn: {
    position: 'absolute',
    top: 40,
    right: 16,
  },
  leftArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.3,
  },
  rightArea: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: width * 0.3,
  },
  progressBarContainer: {
    position: 'absolute',
    top: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 2,
  },
  progressFilled: {
    backgroundColor: '#fff',
  },
});
