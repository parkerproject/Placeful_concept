import React from 'react';
import { View, MapView } from 'react-native';
// import MapView from 'react-native-maps';
import sharedStyles from '../../../Themes/sharedStyles';


const Map = (props) => (
  <View style={sharedStyles.card}>
    <View style={sharedStyles.CardItem}>
      <MapView
        style={{ height: 200, margin: 10 }}
        region={props.geo}
        showsUserLocation
      />
    </View>
  </View>
  );


Map.propTypes = {
  geo: React.PropTypes.object,
};

export default Map;
