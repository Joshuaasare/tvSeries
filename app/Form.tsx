import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import axios from 'axios';

export default function App() {
  // Write your logic here...
  const LIMIT = 20;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://example.com/countries?offset=${offset}&limit=${LIMIT}`,
      );
      setData(prev => {
        return [...prev, ...resp.data.results];
      });
      setCount(resp.data.count);
      setLoading(false);
    } catch (err) {
      /**
       * Error handling purposes
       * Not used as API is assumed to always return data
       */
    }
  }, [offset, LIMIT]);

  useEffect(() => {
    fetchData();
  }, [fetchData, offset, count, data?.length]);

  const renderContent = () => {
    return (
      <FlatList
        style={styles.list}
        data={data}
        onScroll={e => {
		console.log('e',e.nativeEvent.contentInset.)
          const fullContentHeight = e.nativeEvent.contentSize.height;
          /**threshold scroll position is 90% scrolling
           * since there should be at least 10% of scrolling available
           */
          const thresholdScrollHeight = 0.9 * fullContentHeight;
          if (e.nativeEvent.contentOffset.y >= thresholdScrollHeight) {
            if (count > data?.length) {
              setOffset(offset + LIMIT);
            }
          }
        }}
        keyExtractor={({item}) => item.name}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
          </View>
        )}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    );
  };

  return <View style={styles.container}>{renderContent()}</View>;
}

// You can also use class components if you like.
// Just remove above functional component and uncomment below class component:
// export default class App extends React.Component {
//   // Write your logic here ...
//
//   render() {
//     return (
//       <View style={styles.container}>
//          <FlatList
//            style={styles.list}
//            data={[]}
//            renderItem={() => <View style={styles.listItem}></View>}
//          />
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%',
    height: '100%',
  },
  listItem: {
    width: '100%',
    height: '40px',
    padding: '8px',
    alignItems: 'flexStart',
  },
});
