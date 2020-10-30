import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
const url = 'https://arpo-prod-api-app.azurewebsites.net/taxons/?searchText=&take=15&skip=0&notMatched=false&isDkTaxon=true&isDefaultTaxon=true&isMissingPhoto=false&speciesGroups=Fugle';

export default class App extends React.Component {

  state = {
    birdsInfoList: [],
    withImageUrl: [],
    withoutImageUrl: []
  };

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async() => {
    let response = await fetch(url);
    const result = await response.json();
    var withImageUrl =[];
    var withoutImageUrl =[];
    const birdsList = result.items;
    this.setState({birdsInfoList: birdsList});
    birdsList.map((item, index) => {
      if (item.imageUrl === ""){
        withoutImageUrl.push(item)
      } else{
        withImageUrl.push(item)
    }
    });

    this.setState({birdsInfoList: birdsList})
    this.setState({withImageUrl: withImageUrl})
    this.setState({withoutImageUrl: withoutImageUrl})

  };

  render() {

    const withImageUrl= Object.values(this.state.withImageUrl);
    const keyswith = Object.keys(this.state.birdsInfoList);
    const withoutImageUrl= Object.values(this.state.withoutImageUrl);
    const keysWithout = Object.keys(this.state.birdsInfoList);
  return(
<View style={styles.container}>
  <ScrollView style={styles.scrollView}>
  {withImageUrl.map((item, key) =>
      (
      <View style={styles.listItem} key={key}>
        <Text>navn: {item.acceptedVernacularName}</Text>
        <Text>Rank: {item.rank}</Text>
        <Image style={styles.tinyLogo} source={{uri: item.imageUrl}}/>
      </View>
  ))}
  {withoutImageUrl.map((item, key) =>
      (
          <View style={styles.listItem} key={key}>
            <Text>navn: {item.acceptedVernacularName}</Text>
            <Text>Rank: {item.rank}</Text>
            <Text>No image is available</Text>
          </View>
      ))}
  </ScrollView>
</View>
)
  ;
}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    listItem: {
  width: '100%',
      padding: 10,
      textAlign: 'center',
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: '#E5E5E5',
      marginTop: '1%'
},
itemList: {
  marginTop: 20,
      width: '80%',
},
  tinyLogo: {
    width: 50,
    height: 50,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  }
});
