// flow
// some code copied from https://github.com/oblador/react-native-vector-icons/issues/330
import React from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextProps, ViewStyle} from 'react-native';

export type VectorIcons =
  | 'MaterialIcons'
  | 'EvilIcons'
  | 'Entypo'
  | 'FontAwesome'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'Zocial'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Feather'
  | 'AntDesign';

const VectorIcons = {
  MaterialIcons,
  EvilIcons,
  Entypo,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  Zocial,
  Octicons,
  SimpleLineIcons,
  Feather,
  AntDesign,
};

export interface Props extends TextProps {
  groupName?: VectorIcons;
  name: string;
  size?: number;
  style?: ViewStyle;
  color?: string;
}

const VectorIcon: React.FunctionComponent<Props> = ({
  groupName,
  name,
  size,
  style,
  color,
  ...rest
}: Props): React.ReactElement => {
  const Icon = VectorIcons[groupName as VectorIcons];
  return <Icon name={name} size={size} style={style} color={color} {...rest} />;
};

VectorIcon.defaultProps = {
  style: {},
  groupName: 'Ionicons',
  color: '#000',
  size: 20,
};

export default VectorIcon;
