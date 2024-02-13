import {StatusBar, StyleSheet, SafeAreaView, Alert} from 'react-native';
import messaging, {firebase} from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {Container} from '@components/Container';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from '@tvSeries/Navigator';
import {constants} from '@shared/constants/constants';
import {PermissionsAndroid} from 'react-native';

const App = () => {
  useEffect(() => {
    initApp();
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });
    // return unsubscribe;
  }, []);

  const initApp = async () => {
    // await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    // );
    const token = await messaging().getToken();
    console.log('token', {token, firebase: messaging().app});

    messaging().onNotificationOpenedApp(notification => {
      console.log('not', notification);
    });
  };

  return (
    <Container style={styles.container}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Navigator />
      </NavigationContainer>
    </Container>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    // backgroundColor: constants.colors.DARK_BLUE,
  },
});
