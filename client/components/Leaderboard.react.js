import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Button,
} from 'react-native'; 
import Emoji from './Emoji.react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const topGroupsQuery = gql`
query {
  groups(count:20) {
    _id
    title
    size
    users {
      _id
      name
      picture
    }
  }
}`

const { width, height } = Dimensions.get('window');

class Leaderboard extends Component {

  _keyExtractor = (item, index) => item._id;

  renderRowItem = ({item, index}) => {

    let images = item.users.map(user =>
      <Image
        key={user._id}
        source={{uri: user.picture}}
        style={styles.image}
      />
    );

    if (images.length > 6) {
      images = images.splice(0,6);
      images.push(
        <View key="more" style={styles.moreImages}>
          <Text style={{color:'#FFFFFF'}}>+{item.users.length-6}</Text>
        </View>);
    }

    let primaryText = null;
    if (index === 0) {
      primaryText = <Text style={styles.primaryText}><Emoji name="trophy"/> {item.title}</Text>;
    } else {
      primaryText = <Text style={styles.primaryText}>{item.title}</Text>;
    }

    return (
      <View style={styles.groupItem}>
        {primaryText}
        <Text style={styles.secondaryText}>{item.size} people · Created X hours ago</Text>
        <View style={styles.images}>
          {images}
        </View>
      </View>
    )
  }

  handlePress() {
    alert("Sign in!");
  }

  render() {
    const {data} = this.props;
    const groups = data.loading === false && !data.error ? data.groups : [];
    return (
      <View style={{flex:1}}>
        <View style={styles.container}>
          <FlatList
            style={styles.groupList}
            data={groups}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderRowItem}
          />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  groupList: {
    padding: 10,
    marginBottom: 10,
  },
  groupItem: {
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: undefined,
    borderRadius: 4,
  },
  primaryText: {
    fontFamily: 'system font',
    fontSize: 16,
    fontWeight: 'bold'
  },
  secondaryText: {
    fontFamily: 'system font',
    fontSize: 12,
    color: 'lightgrey',
  },
  images: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 5,
    paddingBottom: 5,
  },
  image: {
    marginRight: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  moreImages: {
    borderRadius: 20,
    backgroundColor: "purple",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  signUpButton: {
    height: undefined,
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    color: "#FFFFFF",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default graphql(topGroupsQuery)(Leaderboard);