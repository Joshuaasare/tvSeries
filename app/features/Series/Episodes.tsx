import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Iepisode, Iseason} from '@shared/types';
import {useGenericQuery} from '@shared/hooks/useGenericQuery';
import {VectorIcon} from '@components/VectorIcon';
import Modal from 'react-native-modal';
import Episode from './Episode';

interface Props {
  season: Iseason;
}

const Episodes: React.FC<Props> = ({season}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<null | Iepisode>(null);

  const {
    data: episodes,
    loading,
    error,
  } = useGenericQuery<Iepisode[]>(
    `https://api.tvmaze.com/seasons/${season.id}/episodes`,
  );

  if (loading) {
    return null;
  }

  if (error) {
    return null;
  }

  const renderItem = ({item}: {item: Iepisode}) => {
    return (
      <TouchableOpacity
        style={styles.episode}
        onPress={() => {
          setSelectedEpisode(item);
          setModalVisible(true);
        }}>
        <ImageBackground
          style={{height: '100%'}}
          source={{uri: item?.image?.medium}}>
          <View
            style={{
              paddingHorizontal: 5,
              paddingVertical: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text numberOfLines={3} style={styles.episodeName}>
              {item.name}
            </Text>
          </View>
          <View style={{justifyContent: 'flex-end', flex: 1}}>
            <View style={styles.bottomGroup}>
              <Text style={styles.episodeText}>{`Ep ${item?.number}`}</Text>
              <View style={styles.circular}>
                <VectorIcon
                  color="#fff"
                  name="md-play-skip-forward"
                  size={10}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        isVisible={isModalVisible}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View style={{height: '70%', backgroundColor: '#000'}}>
          <Episode episode={selectedEpisode as Iepisode} />
        </View>
      </Modal>
    );
  };

  const keyExtractor = (item: Iepisode) => `episode-${item.id}`;

  return (
    <>
      <FlatList
        data={episodes}
        horizontal
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <View style={{marginRight: 20}} />}
      />
      {renderModal()}
    </>
  );
};

export default Episodes;

const styles = StyleSheet.create({
  episode: {
    width: 100,
  },

  episodeName: {
    color: '#fff',
    fontWeight: '500',
  },
  episodeText: {
    color: '#5A979F',
    fontSize: 12,
  },

  circular: {
    width: 20,
    height: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A979F',
  },

  bottomGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
