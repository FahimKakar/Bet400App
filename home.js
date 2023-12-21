import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const images = [
  { source: require('./assets/soccer.jpeg'), link: 'Soccer' },
  { source: require('./assets/basketball.jpeg'), link: 'Basketball' },
  { source: require('./assets/motorsports.jpeg'), link: 'Racing' },
];

const Home = ({ navigation, title, content }) => {
  const handleImageClick = (link) => {
    navigation.navigate(link);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bet400</Text>
      <ScrollView horizontal>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImageClick(image.link)}>
            <Image source={image.source} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 10,
    color: '#2E8B57',
  },
  image: {
    width: 400,
    height: 400,
    margin: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'green',
  },
});
export default Home;