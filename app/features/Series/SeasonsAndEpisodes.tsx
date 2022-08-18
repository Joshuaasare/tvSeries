import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Iseason, Ishow} from '@shared/types';
import {useGenericQuery} from '@shared/hooks/useGenericQuery';
import Episodes from './Episodes';
import {Container} from '@components/Container';
import {constants} from '@shared/constants/constants';
import {Spinner} from '@components/Spinner/Spinner';
import {VectorIcon} from '@components/VectorIcon';
import EmptyStates from '@components/EmptyStates/EmptyStates';

interface Props {
  route: RouteProp<{params: {show: Ishow}}>;
  navigation: NavigationProp<{}>;
}

const SeasonsAndEpisodes: React.FC<Props> = ({route}) => {
  const {show} = route.params;
  const {
    data: seasons,
    loading,
    error,
    refetch,
  } = useGenericQuery<Iseason[]>(
    `https://api.tvmaze.com/shows/${show.id}/seasons`,
  );

  const renderContent = () => {
    if (loading) {
      return (
        <Container centered>
          <Spinner />
        </Container>
      );
    }

    if (error) {
      return (
        <Container centered>
          <EmptyStates
            icon="undo"
            groupName="EvilIcons"
            text="Error: Please Click to refetch"
            iconSize={50}
            hasRetry
            onRetry={refetch}
          />
        </Container>
      );
    }

    return (
      <FlatList
        data={seasons}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
      />
    );
  };

  const renderItem = ({item}: {item: Iseason}) => {
    return (
      <View style={styles.season}>
        <Text style={styles.seasonText}>{`Season ${item.number}`}</Text>
        <Episodes season={item} />
      </View>
    );
  };

  const keyExtractor = (item: Iseason) => `season-${item.id}`;

  return (
    <Container style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <VectorIcon
          size={30}
          name="tv"
          color="#fff"
          groupName="Feather"
          style={{marginRight: 10}}
        />
        <Text style={styles.name}>{show.name}</Text>
      </View>
      {renderContent()}
    </Container>
  );
};

export default SeasonsAndEpisodes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: constants.theme.main,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  season: {
    height: 150,
  },
  seasonText: {
    color: '#fff',
    fontSize: 27,
    fontWeight: '200',
    paddingVertical: 5,
  },

  name: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '600',
    zIndex: 100000,
  },
});
