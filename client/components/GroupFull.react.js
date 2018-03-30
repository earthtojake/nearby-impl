import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'; 

import { Container, Text, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body, Right } from 'native-base';

import BioModal from './BioModal.react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const groupUsersQuery = gql`
query {
  user {
    _id
    group {
      _id
      users {
        _id
        name
        picture
      }
    }
  }
}`

const { width, height } = Dimensions.get('window');
const numColumns = 2;
const gridPadding = 20;
const imageDim = width / numColumns - gridPadding * 2 - (numColumns - 2) * (gridPadding/2);

class GroupFull extends Component {

  _keyExtractor = (item, index) => index;

  renderRowItem = ({item}) => {
    return (
      <TouchableOpacity activeOpacity={0.7} style={{flex:1}} onPress={this.bioModal._toggleModal}>
        <Card style={styles.card}>
          <CardItem>
            <Left>
              <Body>
                <Text>{item.name}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={{uri: item.picture}} style={{height: 150, width: null, flex: 1}}/>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }

  render() {
    const {data} = this.props;
    const users = data.loading === false && !data.error ? data.user.group.users : [];
    return (
      <View style={styles.container}>
        <FlatList
          data={users}
          numColumns={numColumns}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderRowItem}
        />
        <BioModal ref={bioModal => this.bioModal = bioModal} uid={"123"}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: gridPadding/2,
    paddingRight: gridPadding/2,
  },
  card: {
    borderWidth: 0,
  },
});

export default graphql(groupUsersQuery)(GroupFull);