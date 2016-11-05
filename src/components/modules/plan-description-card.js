import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import sharedStyles from '../../../Themes/sharedStyles';


const description = (props) => {
  const hashtags = props.plan.tags.map(tag => `#${tag} `);
  return (
    <View style={sharedStyles.card}>
      <View style={sharedStyles.CardItem}>
        <View>
          <Text style={sharedStyles.hashtags}>
            {hashtags}
          </Text>
        </View>
        <View>
          <Text style={sharedStyles.description}>
            {props.plan.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

description.propTypes = {
  plan: React.PropTypes.shape({
    tags: React.PropTypes.array,
    description: React.PropTypes.string,
  }),
};

export default description;
