import React, {Component} from 'react';
import {FlatList, StatusBar, View} from 'react-native';
import PropTypes from 'prop-types';
import {Grid, LineChart, XAxis, YAxis} from 'react-native-svg-charts'

import {connectAlert} from '../components/Alert';
import {connect} from "react-redux";
import {ListItem, Separator} from '../components/List';
import Moment from "moment/moment";

class Dynamics extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    alertWithType: PropTypes.func,
    primaryColor: PropTypes.string,
    dynamics: PropTypes.array,
  };

  render() {
    return (
      <View>
        <StatusBar translucent={false} barStyle="default"/>
        <View>
          <View style={{height: '40%', width: '100%', flexDirection: 'row'}}>
            <YAxis
              data={this.props.dynamics}
              contentInset={{top: 20, bottom: 20}}
              style={{padding: 7}}
              svg={{
                fill: 'grey',
                fontSize: 10,
              }}
              numberOfTicks={10}
              formatLabel={value => `${value.toFixed(2)}`}
            />
            <View style={{flex: 1, marginLeft: 10}}>
              <XAxis
                data={this.props.dynamics}
                style={{padding: 7, marginLeft: 5}}
                contentInset={{top: 20, bottom: 20}}
                svg={{
                  fill: 'grey',
                  fontSize: 10,
                }}
                numberOfTicks={10}
                formatLabel={value => `${value}`}

              />
              <LineChart
                style={{height: 200}}
                data={this.props.dynamics}
                svg={{stroke: this.props.primaryColor}}
                contentInset={{top: 20, bottom: 20}}
              >

                <Grid/>
              </LineChart>
            </View>
          </View>
          <FlatList style={{height: '60%'}}
                    data={this.props.data}
                    keyExtractor={item => item.Date}
                    ItemSeparatorComponent={Separator}
                    renderItem={({item}) => (
                      <ListItem
                        text={Moment(item.Date).format('YYYY[-]MM[-]DD')}
                        optText={item.Cur_OfficialRate.toFixed(4)}
                        selected={false}
                        onPress={null}
                        iconBackground={this.props.primaryColor}
                      />
                    )}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { primaryColor } = state.theme;
  const { data } = state.dynamics;
  const dynamics = state.dynamics.data.map(e => e.Cur_OfficialRate);

  return {
    primaryColor,
    dynamics,
    data,
  };
};

export default connect(mapStateToProps)(connectAlert(Dynamics));