import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';
import Communications from 'react-native-communications';

import sharedStyles from '../../../Themes/sharedStyles';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  cardItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    padding: 10,
    margin: 0,
    width,
  },
  address: {
    fontSize: 12,
    color: '#959595',
  },
});


const mePlan = (props) => {
  if (!props.plans) {
    return (
      <View style={sharedStyles.center}>
        <Text>Loading saved plans...</Text>
      </View>
  );
  }
  const list = props.plans.map((plan, key) =>
    <View style={styles.cardItem} key={key}>
      <Text style={sharedStyles.hashtags}>#drinks #party #pool #nightlife #date</Text>
      <Text style={{ fontSize: 14, marginBottom: 10 }}>{plan.title}</Text>
      <Text style={{ fontSize: 12, fontWeight: '600' }}>{plan.merchant_name}</Text>
      <Text style={styles.address}>{plan.merchant_address}</Text>
      <Text
        style={{ fontSize: 12, color: 'blue' }}
        onPress={() => Communications.phonecall(plan.phone, true)}
      >{plan.phone}</Text>
    </View>
  );
  return (
    <View>
      <View style={styles.cardItem}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 14,
            fontWeight: 'bold',
          }}
        >{props.tabLabel}</Text>
      </View>
      <View>{list}</View>
    </View>
 );
};

mePlan.propTypes = {
  plans: React.PropTypes.array,
  tabLabel: React.PropTypes.string,
};

export default mePlan;
