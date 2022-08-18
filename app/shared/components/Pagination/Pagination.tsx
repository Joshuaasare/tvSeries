import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {VectorIcon} from '@components/VectorIcon';
import {constants} from '@shared/constants/constants';

interface Props {
  totalPages?: number;
  onPageChange?: (page: number) => void;
  currPage: number;
  setCurrPage: (page: number) => void;
  visiblePageLength: number;
}

const {GRAY, GRAY2, WHITE} = constants.colors;

const Pagination: React.FC<Props> = ({
  currPage,
  setCurrPage,
  totalPages = 254,
  visiblePageLength = 7,
  onPageChange,
}) => {
  const numOfBoxes = visiblePageLength; // should always be an odd
  const array = Array(numOfBoxes).fill(0);

  /**
   *
   * @returns
   * function to get the starting point of the pagination
   * boxes e.g 1,2,3,4,5,6,7 - with 7 being the max and
   * numOfBoxes being 3
   */
  const getStartingPoint: () => number = () => {
    if (currPage <= (numOfBoxes + 1) / 2) {
      return 1;
    }

    if (currPage > (totalPages as number) - (numOfBoxes + 1) / 2) {
      return totalPages - (numOfBoxes - 1);
    }

    return currPage - (numOfBoxes - 1) / 2;
  };

  const onSelectPage = (page: number) => {
    setCurrPage(page);
    onPageChange?.(page);
  };

  /**
   * checks for active states of icons
   */

  const isJumpToStartActive = () => {
    return currPage > 1;
  };

  const isJumpToEndActive = () => {
    return currPage < totalPages;
  };

  const isPreviousActive = () => {
    return isJumpToStartActive();
  };

  const isNextActive = () => {
    return isJumpToEndActive();
  };

  /**
   * Icon actions
   */

  const next = () => {
    setCurrPage(currPage + 1);
  };

  const previous = () => {
    setCurrPage(currPage - 1);
  };

  const jumpToStart = () => {
    setCurrPage(1);
  };

  const jumpToEnd = () => {
    setCurrPage(totalPages);
  };

  const renderBox = (i: number) => {
    const startingPoint = getStartingPoint();
    const value = startingPoint + i;
    const isActive = value === currPage;

    if (value > (totalPages as number)) {
      return null;
    }

    return (
      <TouchableOpacity
        style={[styles.box, isActive && styles.activeBox]}
        key={i}
        onPress={() => onSelectPage(value)}>
        <Text style={[styles.text, isActive && styles.activeText]}>
          {value}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{...styles.container}}>
      <View style={styles.iconGroup}>
        <TouchableOpacity
          disabled={!isJumpToStartActive()}
          onPress={jumpToStart}>
          <VectorIcon
            color={!!isJumpToStartActive() ? GRAY : GRAY2}
            name="previous"
            groupName="Foundation"
            size={20}
          />
        </TouchableOpacity>

        <TouchableOpacity disabled={!isPreviousActive()} onPress={previous}>
          <VectorIcon
            color={!!isPreviousActive() ? GRAY : GRAY2}
            name="chevrons-left"
            groupName="Feather"
            size={15}
          />
        </TouchableOpacity>
      </View>

      <View style={{...styles.pageGroup}}>
        {array.map((val, i) => renderBox(i))}
      </View>

      <View style={styles.iconGroup}>
        <TouchableOpacity disabled={!isNextActive()} onPress={next}>
          <VectorIcon
            color={!!isNextActive() ? GRAY : GRAY2}
            name="chevrons-right"
            groupName="Feather"
            size={15}
          />
        </TouchableOpacity>

        <TouchableOpacity disabled={!isJumpToEndActive()} onPress={jumpToEnd}>
          <VectorIcon
            color={!!isJumpToEndActive() ? GRAY : GRAY2}
            name="next"
            groupName="Foundation"
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  box: {
    height: 30,
    width: 30,

    alignItems: 'center',
    justifyContent: 'center',
  },

  pageGroup: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  text: {
    fontWeight: '500',
    fontSize: 12,
    color: '#fff',
  },

  activeBox: {
    backgroundColor: GRAY2,
    borderRadius: 6,
  },

  activeText: {
    color: WHITE,
  },
});
