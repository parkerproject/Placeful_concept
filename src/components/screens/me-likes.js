import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {
  Icon,
  Text,
} from 'native-base';
import sharedStyles from '../../../Themes/sharedStyles';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  cardImage: {
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  cardItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    alignItems: 'flex-start',
    padding: 10,
    width,
  },
  address: {
    fontSize: 12,
    color: '#959595',
  },
  meta: {
    alignSelf: 'flex-end',
  },
  miles: {
    fontSize: 12,
    alignSelf: 'flex-end',
    color: '#959595',
  },
  likes: {
    fontSize: 12,
    paddingLeft: 10,
  },
  heart: {
    fontSize: 25,
  },
});


export default () => {
  return (
    <View style={styles.cardItem}>
      <View>
        <Text style={sharedStyles.hashtags}>#drinks #party #pool #nightlife #date</Text>
      </View>
      <View>
        <Text style={{ fontSize: 14 }}>The lucky bee</Text>
      </View>
      <View>
        <Text style={styles.address}>252 Broome St.</Text>
      </View>
      <TouchableOpacity>
        <View style={{ flex: 1, flexDirection: 'row', top: 10 }}>
          <Icon name="ios-heart-outline" style={styles.heart} />
          <Text style={styles.likes}>8 likes</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.miles}>0.04 mi</Text>
    </View>
 );
};
