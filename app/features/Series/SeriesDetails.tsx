import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Ishow} from '@shared/types';
import MaskedShadow from '@components/MaskedShadow/MaskedShadow';
import MaskedView from '@react-native-masked-view/masked-view';
import {constants} from '@shared/constants/constants';
import {Container} from '@components/Container';
import {VectorIcon} from '@components/VectorIcon';
import isEmpty from 'lodash.isempty';

interface Props {
  route: RouteProp<{params: {show: Ishow}}>;
  navigation: NavigationProp<{}>;
}

const SeriesDetails: React.FC<Props> = ({route, navigation}) => {
  const {show} = route.params;

  return (
    <Container style={{backgroundColor: constants.theme.main}}>
      <MaskedView
        style={{flex: 2, position: 'relative'}}
        maskElement={<MaskedShadow />}>
        <ImageBackground
          style={{height: '100%'}}
          source={{
            uri: show?.image?.original ?? show?.image?.medium,
          }}></ImageBackground>
      </MaskedView>

      <View style={{flex: 1, paddingHorizontal: 10, marginTop: -150}}>
        {show?.name && <Text style={styles.name}>{show?.name}</Text>}

        {show?.summary && (
          <Text style={styles.summary} numberOfLines={6}>
            {/**not a safe solution, replace with markdown */}
            {show?.summary?.replace(/<[^>]*>?/gm, '')}
          </Text>
        )}

        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          {show.genres.map((gen, i) => {
            const string =
              show?.genres?.length - 1 === i ? `${gen}` : `${gen},   `;
            return (
              <Text key={`genre-${i}`} style={styles.genre}>
                {string}
              </Text>
            );
          })}
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {!isEmpty(show?.schedule?.days) && (
            <>
              <VectorIcon
                size={18}
                name="ios-calendar-outline"
                color="#fff"
                style={{marginRight: 10}}
              />
              {show?.schedule?.days?.map(day => (
                <Text
                  key={`day-${day}`}
                  style={styles.detailButtonText}>{`${day}  `}</Text>
              ))}
            </>
          )}

          {show?.schedule?.time && (
            <>
              <VectorIcon
                size={18}
                name="time-outline"
                color="#fff"
                style={{marginRight: 10}}
              />
              <Text
                style={
                  styles.detailButtonText
                }>{`${show?.schedule?.time}  `}</Text>
            </>
          )}
        </View>

        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => navigation.navigate('episodes', {show})}>
          <VectorIcon
            name="md-information-circle-outline"
            style={{marginRight: 10}}
          />
          <Text style={styles.mainButtonText}>{`Seasons and Episodes `}</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default SeriesDetails;

const styles = StyleSheet.create({
  name: {
    color: '#fff',
    fontSize: 32,
    zIndex: 100000,
  },

  genre: {
    color: constants.colors.GRAY,
    fontWeight: '500',
    fontSize: 12,
    fontFamily: 'Roboto',
  },

  summary: {
    fontWeight: '500',
    fontSize: 13,
    fontFamily: 'Roboto',
    color: '#fff',
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
    fontSize: 11,
    fontFamily: 'Roboto',
    letterSpacing: 1,
  },

  mainButton: {
    height: 35,
    marginVertical: 20,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    borderWidth: 1,
    marginRight: 10,
    flexDirection: 'row',
    // borderColor: constants.colors.GRAY,
    backgroundColor: '#fff',
    borderRadius: 3,
  },

  mainButtonText: {
    fontWeight: '500',
    fontSize: 13,
    fontFamily: 'Roboto',
    color: '#000',
  },
});
