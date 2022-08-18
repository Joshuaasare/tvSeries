import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Series from '@tvSeries/features/Series/Series';
import SeriesDetails from '@tvSeries/features/Series/SeriesDetails';
import SeasonsAndEpisodes from '@tvSeries/features/Series/SeasonsAndEpisodes';

const RootStack = createStackNavigator();

const Navigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          //     backgroundColor: constants.colors.DARK_BLUE,
        },
      }}
      initialRouteName={'series'}>
      <RootStack.Screen name={'series'} component={Series} />
      <RootStack.Screen name={'seriesDetails'} component={SeriesDetails} />
      <RootStack.Screen name={'episodes'} component={SeasonsAndEpisodes} />
    </RootStack.Navigator>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
