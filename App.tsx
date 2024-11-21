/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {FlatList, PermissionsAndroid, Text, View} from 'react-native';
const SmsAndroid = require('react-native-get-sms-android');

const Item = ({item}: any) => {
  return (
    <View>
      <Text>{item.address}</Text>
      <Text>{item.body}</Text>
      <Text>{new Date(item.date).toLocaleString()}</Text>
    </View>
  );
};

function App(): React.JSX.Element {
  const [smsList, setSMSList] = useState([]);

  async function requestSmsPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'SMS Permission',
          message: 'This app needs access to your message',
          buttonNeutral: 'Ask me later',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        },
      );

      console.log(granted, "Grsnted")

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    async function fetchSms() {
      const hasPermission = await requestSmsPermission();
      console.log("Hello", hasPermission, PermissionsAndroid.RESULTS)
      if (hasPermission) {
        SmsAndroid.list(
          JSON.stringify({
            box: 'inbox',
            maxCount: 10,
          }),
          (err: any) => {
            console.log('Something went wrong: ' + err);
          },
          // eslint-disable-next-line @typescript-eslint/no-shadow
          (count: any, smsList: any) => {
            const messages = JSON.parse(smsList);
            setSMSList(messages);
          },
        );
      }
    }

    fetchSms();
  }, []);

  return (
    <View>
      {/* <Text>{hasPermission ? "Yes" : "No"}</Text> */}
      <FlatList
        data={smsList}
        renderItem={Item}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text>NO SMS FOUND</Text>}
      />
    </View>
  );
}

export default App;

// npx react-native start
