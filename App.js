import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  FlatList,
  Button
} from 'react-native';

import { observer } from 'mobx-react';

import Realm from 'realm';

import UserSchema from './src/schemas/userSchema.js';

import rootStore from './src/rootStore';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
@observer
export default class App extends Component<Props> {

    componentDidMount(){

        // rootStore.userStore.fetchUsers();
        rootStore.userStore.getUsers()
        .then(users => {

            if(!users){

                rootStore.userStore.fetchUsers();

            }

        })
        .catch(err => {
            console.log('[Error] getUsers');
            console.log(err);
        });

    }

    _renderRow(item){

        return <View style={{backgroundColor: 'orange', flex: 1, flexDirection: 'row'}}>

            <View style={{alignItems: 'center', justifyContent: 'center', flex: 2}}>
                <Text>{item.name}</Text>
            </View>

            <View style={{flex: 1}}>
                <Button
                    title={'Details'}
                    onPress={e => null}
                />
            </View>

        </View>;

    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.elem}>

                    <Text>List of users {rootStore.userStore.users.length}</Text>

                    <FlatList
                        data={rootStore.userStore.users}
                        renderItem={ ({item}) => this._renderRow(item) }
                    />

                </View>
                <View style={styles.elem}>
                    <Text>Details of user</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  elem: {
      flex: 1,
      backgroundColor: 'gray'
  }
});
