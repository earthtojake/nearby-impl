import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { StatusBar, Text, View, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import NavigationBar from 'react-native-navbar';
import GroupFull from './GroupFull.react';
import Leaderboard from './Leaderboard.react';

const pages = [
  {
    titleConfig: {
      title: 'Top'
    },
    rightButton: {
      title: 'Group',
    },
    component: <Leaderboard />
  },
  {
    titleConfig: {
      title: 'Group'
    },
    rightButton: {
      title: 'Settings',
    },
    leftButton: {
      title: 'Leaderboard',
    },
    component: <GroupFull />,
  },
  {
    titleConfig: {
      title: 'Settings'
    },
    leftButton: {
      title: 'Group',
    },
    component: <Text>Settings</Text>,
  },
]

const groups = [];

export default class Navigator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    }
  }

  changeIndex(index) {
    this.setState({index});
  }

  swipe(direction) {
    this.refs.swiper.scrollBy(direction);
  }

  render() {

    return (
      <Swiper
        onIndexChanged={index => this.changeIndex(index)}
        ref="swiper"
        style={styles.wrapper}
        showsButtons={false}
        bounces={true}
        loop={false}
        showsPagination={false}
      >
        {pages.map((config, index) => {
          if (config.rightButton) {
            config.rightButton.handler = () => {
              this.swipe(1);
            }
          }
          if (config.leftButton) {
            config.leftButton.handler = () => {
              this.swipe(-1);
            }
          }
          return (
            <View key={index} style={styles.container}>
              <NavigationBar
                title={config.titleConfig}
                rightButton={config.rightButton}
                leftButton={config.leftButton}
              />
              {config.component}
            </View>
          );
        })}
      </Swiper>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECEFF2",
  },
})