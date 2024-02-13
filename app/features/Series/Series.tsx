import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Pagination from '@components/Pagination/Pagination';
import {useSeriesQuery} from '@shared/hooks/useSeriesQuery';
import {useState} from 'react';
import {Container} from '@components/Container';
import {Spinner} from '@components/Spinner/Spinner';
import {constants} from '@shared/constants/constants';
import {Ishow} from '@shared/types';
import SeriesItem from './SeriesItem';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {CustomSearchBar} from '@components/CustomSearchBar/CustomSearchBar';
import isEmpty from 'lodash.isempty';
import {VectorIcon} from '@components/VectorIcon';
import EmptyStates from '@components/EmptyStates/EmptyStates';

interface Props {
  route: RouteProp<{}>;
  navigation: NavigationProp<{}>;
}

const Series: React.FC<Props> = ({navigation}) => {
  const [currPage, setCurrPage] = useState(1);
  const [searchString, setSearchString] = useState<undefined | string>();

  const {error, loading, data, refetch} = useSeriesQuery(
    currPage,
    searchString,
  );

  const renderItem = ({item}: {item: Ishow}) => {
    return (
      <SeriesItem
        data={item}
        key={item.id}
        onPress={() => navigation.navigate('seriesDetails', {show: item})}
      />
    );
  };

  const keyExtractor = (item: Ishow) => `show-${item.id}`;

  const renderData = () => {
    if (loading) {
      return (
        <Container centered>
          <Spinner color={constants.colors.AQUA} />
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

    if (data) {
      return (
        <FlatList
          renderItem={renderItem}
          data={data}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 20,
                borderColor: constants.colors.LIGHT_TEXT,
                borderTopWidth: 0.3,
              }}
            />
          )}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Container style={styles.container}>
        <View style={styles.logo}>
          <VectorIcon
            size={25}
            name="tv"
            color="#fff"
            groupName="Feather"
            style={{marginRight: 10}}
          />
          <Text style={styles.logoText}>tvSeries</Text>
        </View>
        <View style={{paddingVertical: 20}}>
          <CustomSearchBar
            value={searchString}
            onClear={() => setSearchString(undefined)}
            onChange={text => setSearchString(text)}
          />
        </View>
        <View style={{flex: 1}}>{renderData()}</View>
        <View style={styles.pagination}>
          {isEmpty(searchString) && (
            <Pagination
              visiblePageLength={5}
              currPage={currPage}
              setCurrPage={setCurrPage}
            />
          )}
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default Series;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: constants.theme.main,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },

  logoText: {
    color: '#fff',
    fontWeight: '300',
    fontSize: 25,
  },

  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pagination: {
    justifyContent: 'flex-end',
    paddingVertical: 10,
  },
});
