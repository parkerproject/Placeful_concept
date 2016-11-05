import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import moment from 'moment';
import sharedStyles from '../../../Themes/sharedStyles';


const DateCard = (props) => {
  const plan = props.plan;
  return (
    <View style={sharedStyles.card}>
      <View style={sharedStyles.CardItem}>
        <View>
          <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
            {moment(plan.start_date).format('MMM, DO')} - {moment(plan.end_date).format('MMM, Do')}
          </Text>
        </View>
        <View>
          <Text style={sharedStyles.description}>
            {plan.start_time} - {plan.end_time}
          </Text>
        </View>
      </View>
    </View>
  );
};

DateCard.propTypes = {
  plan: React.PropTypes.shape({
    start_time: React.PropTypes.string,
    end_time: React.PropTypes.string,
    start_date: React.PropTypes.string,
    end_date: React.PropTypes.string,
  }),
};

export default DateCard;
