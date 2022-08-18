import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Ishow} from '@shared/types';
import {VectorIcon} from '@components/VectorIcon';
import {constants} from '@shared/constants/constants';
import CountryFlag from 'react-native-country-flag';

interface Props {
  data: Ishow;
  onPress?: () => void;
}

const SeriesItem: React.FC<Props> = ({data, onPress}) => {
  return (
    <TouchableOpacity
      style={{height: 120, flexDirection: 'row'}}
      onPress={onPress}
      key={`show-${data.id}`}>
      <Image
        source={{uri: data?.image?.medium}}
        style={{height: 100, width: 100, borderRadius: 10}}
      />
      <View style={{paddingHorizontal: 10}}>
        {data?.name && <Text style={styles.name}>{data?.name}</Text>}

        <View style={{flexDirection: 'row'}}>
          {data?.genres?.map((gen, i) => {
            const string =
              data?.genres?.length - 1 === i ? `${gen}` : `${gen}, `;
            return (
              <Text key={`genre-${i}`} style={styles.genre}>
                {string}
              </Text>
            );
          })}
        </View>

        <View style={styles.detailGroup}>
          <VectorIcon
            size={18}
            name="tv"
            color="#fff"
            groupName="Feather"
            style={{marginRight: 10}}
          />
          {data.premiered && (
            <View style={{...styles.detailButton}}>
              <Text style={styles.detailButtonText}>
                {data?.premiered?.substring(0, 4)}
              </Text>
            </View>
          )}

          {data?.language && (
            <View style={{...styles.detailButton}}>
              <Text style={styles.detailButtonText}>{data?.language}</Text>
            </View>
          )}

          {data?.network?.country?.code && (
            <View>
              <CountryFlag
                isoCode={data?.network?.country?.code?.toLowerCase() ?? 'us'}
                size={10}
                style={{marginRight: 10}}
              />
            </View>
          )}
        </View>

        <View style={styles.detailGroup}>
          {data?.rating?.average && (
            <View style={{...styles.detailButton}}>
              <VectorIcon
                size={9}
                name="star"
                color="gold"
                style={{marginRight: 5}}
              />
              <Text
                style={
                  styles.detailButtonText
                }>{`${data?.rating?.average} avg`}</Text>
            </View>
          )}

          {data?.averageRuntime && (
            <View style={{...styles.detailButton}}>
              <VectorIcon
                size={9}
                name="ios-time-outline"
                color="#fff"
                style={{marginRight: 5}}
              />
              <Text
                style={
                  styles.detailButtonText
                }>{`${data.averageRuntime} min`}</Text>
            </View>
          )}

          {data?.network?.name && (
            <View style={{...styles.detailButton}}>
              <Text
                style={
                  styles.detailButtonText
                }>{`${data?.network?.name.substring(0, 6)}`}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SeriesItem;

const styles = StyleSheet.create({
  name: {
    color: constants.colors.WHITE,
    fontWeight: '500',
  },

  genre: {
    color: constants.colors.GRAY,
    fontWeight: '500',
    fontSize: 11,
    fontFamily: 'Roboto',
  },

  detailButton: {
    backgroundColor: constants.theme.gray,
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 50,
    marginRight: 10,
    flexDirection: 'row',
  },

  detailButtonText: {
    color: constants.colors.WHITE,
    fontWeight: '500',
    fontSize: 8,
    fontFamily: 'Roboto',
    letterSpacing: 1,
  },

  detailGroup: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
});
