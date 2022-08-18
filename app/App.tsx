import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {Container} from '@components/Container';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navigator from '@tvSeries/Navigator';

const App = () => {
  return (
    <Container style={styles.container}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeArea} />
        <Navigator />
      </NavigationContainer>
    </Container>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {},

  safeArea: {
    flex: 0,
    // backgroundColor: constants.colors.DARK_BLUE,
  },
});
