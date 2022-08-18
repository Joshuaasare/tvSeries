import {constants} from '@shared/constants/constants';
import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, ViewStyle} from 'react-native';

const spinnerSize = 25;
const delayDuration = 2000;

export interface Props {
  color?: string;
  size?: number;
  overlay?: boolean;
  style?: ViewStyle;
  hasDelay?: boolean;
}

export const Spinner: React.FunctionComponent<Props> = ({
  color,
  size,
  overlay,
  style,
  hasDelay = true,
}) => {
  const [delayed, setDelayed] = useState(hasDelay);

  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), delayDuration);
    return (): void => clearTimeout(timeout);
  }, []);
  return (
    <View style={[styles.spinner, overlay ? styles.overlay : {}, style]}>
      {!delayed && <ActivityIndicator color={color} size={size} />}
    </View>
  );
};

Spinner.defaultProps = {
  color: constants.colors.WHITE,
  size: spinnerSize,
  overlay: false,
  style: {},
};

const styles = StyleSheet.create({
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    zIndex: 100,
  },
  text: {
    width: '75%',
    textAlign: 'center',
    color: constants.colors.WHITE,
    paddingTop: 10,
  },
});
