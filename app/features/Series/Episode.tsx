import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Iepisode} from '@shared/types';
import {VectorIcon} from '@components/VectorIcon';

interface Props {
  episode: Iepisode;
}

const Episode: React.FC<Props> = ({episode}) => {
  return (
    <View style={{flex: 1}}>
      <Image style={{height: '50%'}} source={{uri: episode?.image?.original}} />
      <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
        <Text
          style={
            styles.episodeText
          }>{`S ${episode.season} Ep ${episode.number}. ${episode.name}`}</Text>

        {episode?.summary && (
          <Text style={styles.summary} numberOfLines={6}>
            {/**not a safe solution, replace with markdown */}
            {episode?.summary?.replace(/<[^>]*>?/gm, '')}
          </Text>
        )}

        <View style={{flexDirection: 'row'}}>
          {episode?.runtime && (
            <View style={styles.detailButton}>
              <VectorIcon
                size={15}
                name="time-outline"
                color="#fff"
                style={{marginRight: 5}}
              />
              <Text
                style={
                  styles.detailButtonText
                }>{`${episode?.runtime} min`}</Text>
            </View>
          )}

          {episode?.rating?.average && (
            <View style={{...styles.detailButton}}>
              <VectorIcon
                size={15}
                name="star"
                color="gold"
                style={{marginRight: 5}}
              />
              <Text
                style={
                  styles.detailButtonText
                }>{`${episode.rating.average} avg`}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Episode;

const styles = StyleSheet.create({
  episodeText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '200',
  },
  episodeName: {},

  summary: {
    color: '#fff',
    fontWeight: '300',
    paddingVertical: 10,
  },

  time: {
    color: '#fff',
    fontSize: 12,
  },

  detailButton: {
    paddingVertical: 7,
    paddingHorizontal: 5,
    borderRadius: 50,
    marginRight: 10,
    flexDirection: 'row',
  },

  detailButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});
