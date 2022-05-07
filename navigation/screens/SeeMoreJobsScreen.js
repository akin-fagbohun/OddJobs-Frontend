import * as React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { Text, FlatList, View, StyleSheet, Pressable } from 'react-native';
import { getAllJobs } from '../../api';
import { Map } from '../../components/Map';
import { JobScreen } from './JobScreen';

export const SeeMoreJobsScreen = ({ setLoggedIn }) => {
  const [jobs, setJobs] = React.useState([]);

  React.useEffect(() => {
    getAllJobs().then(jobsFromApi => {
      setJobs(jobsFromApi);
    });
  }, []);

  // global user context
  const user = useContext(AuthContext);
  console.log(user);
  // global user context

  return (
    <>
      <View style={styles.container}>
        {/* <Map /> */}
        {/* <Text>Map Render</Text> */}
      </View>
      <View style={styles.list}>
        <FlatList
          data={jobs}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.item}
              onPressOut={() => navigation.navigate(JobScreen)}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.category}</Text>
              <Text>£{item.price.toFixed(2)}</Text>
            </Pressable>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,

    // backgroundColor: '#c7f9cc',
    paddingTop: 30,
    paddingLeft: 30,
  },

  item: {
    backgroundColor: '#c7f9cc',

    borderRadius: 15,
    width: '90%',
    // height: 130,
    marginBottom: 20,
    padding: 10,
    paddingLeft: 15,
  },
  title: {
    fontSize: 18,
  },
});
