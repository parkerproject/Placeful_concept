import React from 'react';
import {
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Icon,
  Text,
} from 'native-base';
import { Row, Col, Grid } from 'react-native-easy-grid';
import { web, phonecall } from 'react-native-communications';
import sharedStyles from '../../../Themes/sharedStyles';

const planAddress = (props) => {
  const plan = props.plan;
  const phone = !plan.phone ? props.phoneFrom4square.contact.formattedPhone : plan.phone;
  return (
    <View style={sharedStyles.card}>
      <View style={sharedStyles.cardItem}>
        <Grid>
          <Row>
            <Grid>
              <Col size={65}>
                <Text style={sharedStyles.title}>{plan.title}</Text>
                <View>
                  <Text style={sharedStyles.cardItemMerchant}>
                    {plan.merchant_name}
                  </Text>
                  <Text
                    style={sharedStyles.cardItemAddress}
                    onPress={() => web(`http://maps.apple.com/?address=${plan.merchant_address}`)}
                  >
                    <Icon name="ios-pin-outline" style={sharedStyles.placeIcon} />
                    &nbsp;{plan.merchant_address}
                  </Text>
                  <TouchableOpacity onPress={() => phonecall(phone, true)}>
                    <Text style={sharedStyles.cardItemPhone}>{phone}</Text>
                  </TouchableOpacity>
                </View>
              </Col>
              <Col size={25}>
                <Image
                  source={{ uri: props.thumbnail }}
                  style={{ width: 80, height: 80 }}
                />
              </Col>
            </Grid>
          </Row>
          {/* <Row style={sharedStyles.follow}>
            <TouchableOpacity style={sharedStyles.followButton}>
              <Text style={sharedStyles.followText}>Follow</Text>
            </TouchableOpacity>
          </Row> */}
          {/* <Row style={sharedStyles.followerNumberWrapper}>
            <Text style={sharedStyles.followerNumber}>2 followers</Text>
          </Row> */}
        </Grid>
      </View>
    </View>
  );
};

planAddress.propTypes = {
  plan: React.PropTypes.object,
  thumbnail: React.PropTypes.string,
  phoneFrom4square: React.PropTypes.any,
};

export default planAddress;
