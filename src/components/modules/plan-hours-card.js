import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import sharedStyles from '../../../Themes/sharedStyles';


class HoursCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hours: null,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    };
    this.colorForReview = this.colorForReview.bind(this);
  }

  componentWillReceiveProps(object) {
    if (object.hours) {
      this.setState({ hours: object.hours[0] });
    }
  }

  colorForReview(num) {
    let color;
    if (num > 3) {
      color = '#26A65B';
    } else if (num < 4 && num > 1.9) {
      color = '#E87E04';
    } else {
      color = '#D91E18';
    }

    return color;
  }

  convertTime24to12(time24) {
    let timeArr = time24.split('');
    timeArr = `${timeArr[0]}${timeArr[1]}:${timeArr[2]}${timeArr[3]}`;

    const tmpArr = timeArr.split(':');
    let time12;
    const tmp = Number(tmpArr[0]);

    if (tmp === 12) {
      time12 = `${tmpArr[0]}:${tmpArr[1]} PM`;
    } else if (tmpArr[0] === '00') {
      time12 = `12:${tmpArr[1]}  AM`;
    } else if (tmp > 12) {
      time12 = `${(tmp - 12)}:${tmpArr[1]} PM`;
    } else {
      time12 = `${(tmpArr[0])}:${tmpArr[1]} AM`;
    }
    return time12;
  }


  render() {
    if (this.state.hours == null) {
      return (<View />);
    }

    const hours = this.state.hours;
    const dailyHours = hours.open.map((time, key) =>
      <View key={key} style={{ flexDirection: 'row' }}>
        <View style={{ width: 50 }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '600',
            }}
          >{this.state.days[time.day]}</Text>
        </View>
        <View>
          <Text
            style={{ fontSize: 13 }}
          >
          {this.convertTime24to12(time.start)} - {this.convertTime24to12(time.end)}
          </Text>
        </View>
      </View>
    );


    return (
      <View style={sharedStyles.card}>
        <View style={sharedStyles.CardItem}>
          <Text style={{ fontWeight: '700' }}>Hours</Text>
        </View>
        {dailyHours}

      </View>
    );
  }

}

HoursCard.propTypes = {
  hours: React.PropTypes.array,
};

export default HoursCard;
