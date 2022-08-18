import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

export interface Props {
  children: React.ReactNode;
  centered?: boolean;
  style?: ViewStyle;
}

export const Container: React.FunctionComponent<Props> = ({
  children,
  centered = false,
  style = {},
}: Props) => {
  return (
    <View style={[styles.container, style, centered ? styles.centered : null]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Container;
