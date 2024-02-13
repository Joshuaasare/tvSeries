import {VectorIcon} from '@components/VectorIcon';
import {constants} from '@shared/constants/constants';
import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TextStyle,
  ViewStyle,
  Platform,
  TouchableOpacity,
} from 'react-native';

export interface Props {
  value?: string;
  onSearch?: (text: string) => void | string;
  onChange: (text: string) => void | string;
  onClear: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  placeholder?: string;
  placeholderTextColor?: string;
  iconColor?: string;
  backgroundColor?: string;
  iconSize?: number;
  testID?: string;
  accessibilityLabel?: string;
}

export const CustomSearchBar: React.FunctionComponent<Props> = ({
  value,
  onChange,
  backgroundColor,
  containerStyle,
  iconSize,
  iconColor,
  placeholderTextColor,
  placeholder,
  testID,
  accessibilityLabel,
  onClear,
}: Props) => {
  testID = testID || 'CustomSearchBar';
  const textInputRef = useRef<TextInput>(null);
  const clear = (): void => {
    if (onClear) onClear();
    textInputRef.current?.clear();
  };

  return (
    <View style={[styles.container, containerStyle, {backgroundColor}]}>
      <VectorIcon color={iconColor} name="ios-search" size={iconSize} />

      <TextInput
        value={value}
        style={styles.inputStyle}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        onChangeText={onChange}
        underlineColorAndroid="transparent"
        ref={textInputRef}
        selectionColor={constants.colors.AQUA}
        testID={`${testID}Input`}
        accessibilityLabel={`${accessibilityLabel}Input`}
      />
      {value !== '' ? (
        <TouchableOpacity
          accessibilityLabel={'clearTextButton'}
          testID={'clearTextButton'}
          style={styles.closeIconContainer}
          onPress={clear}>
          <VectorIcon
            color={iconColor}
            name="ios-close-circle-outline"
            size={iconSize}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

CustomSearchBar.defaultProps = {
  placeholder: 'Search',
  placeholderTextColor: constants.colors.GRAY,
  iconColor: constants.colors.GRAY,
  backgroundColor: constants.colors.GRAY2,
  iconSize: 20,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'android' ? 0 : 8,
    borderRadius: 6,
    height: 40,
    justifyContent: 'space-between',
  },

  inputStyle: {
    flex: 1,
    color: constants.colors.WHITE,
    marginBottom: 0,
    marginLeft: 5,
  },

  closeIconContainer: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
});
