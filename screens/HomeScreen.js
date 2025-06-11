import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Top Bar inside Image */}
      <ImageBackground
        source={require('../assets/images/home.jpg')}
        style={styles.backgroundImage}
        imageStyle={styles.imageRounded}
      >
        <View style={styles.topBar}>
          <Image
            source={require('../assets/images/logo.png')} // ← Update to your logo file
            style={styles.logo}
          />
          <TouchableOpacity>
            <Image
              source={require('../assets/images/menu.png')} // ← Three lines icon
              style={styles.menuIcon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Card Section */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Image source={require('../assets/images/card1.jpg')} style={styles.cardImage} />
        </TouchableOpacity>
        <View style={styles.card} />
        <View style={styles.card} />
        <View style={styles.card} />
      </View>

      {/* Footer */}
      <View style={styles.footer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    height: 425,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  imageRounded: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 30,
    top: 13,
    resizeMode: 'contain',
  },
  menuIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    top: 13,
  },
  overlayContent: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  card: {
    width: 75,
    height: 75,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(210, 210, 210, 0.61)',
  },
  cardImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  footer: {
    height: 30,
    backgroundColor: '#1c2c44',
    top: 240,
  },
});
