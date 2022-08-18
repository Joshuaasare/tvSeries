/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Container} from '@components/Container';
import {constants} from '@shared/constants/constants';
import Icon, {VectorIcons} from '@components/VectorIcon/VectorIcon';

export interface Props {
  text: string;
  icon?: string;
  groupName?: VectorIcons;
  hasRetry?: boolean;
  retryText?: string;
  onRetry?: () => void | {};
  iconSize?: number;
  centered?: boolean;
}

const EmptyStates: React.FunctionComponent<Props> = ({
  text,
  icon,
  groupName,
  hasRetry,
  retryText,
  iconSize,
  onRetry,
  centered,
}: Props) => {
  return (
    <Container centered={centered}>
      {hasRetry && onRetry ? (
        <TouchableOpacity style={styles.icon} onPress={onRetry}>
          <Icon
            name={icon as string}
            groupName={groupName}
            color={constants.colors.GRAY}
            size={iconSize}
          />
        </TouchableOpacity>
      ) : null}
      <Text style={styles.text}>{text}</Text>
    </Container>
  );
};

EmptyStates.defaultProps = {
  onRetry: (): void | {} => {},
  hasRetry: false,
  retryText: 'retry',
  icon: 'reload',
  groupName: 'Ionicons',
  iconSize: 35,
  centered: true,
};

const styles = StyleSheet.create({
  bg: {flex: 1},
  text: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },

  buttonText: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 20,
    marginHorizontal: 30,
  },

  icon: {
    paddingVertical: 20,
  },
});

export default EmptyStates;
