import {View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {constants} from '@shared/constants/constants';

const MaskedShadow = () => (
  <View style={{backgroundColor: 'transparent', flex: 1, flexDirection: 'row'}}>
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0.1, y: 0.8}}
      colors={[constants.theme.main, constants.theme.gray, 'transparent']}
      style={{flex: 1}}
    />
  </View>
);

export default MaskedShadow;
