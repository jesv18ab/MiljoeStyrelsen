import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

//Endpoint fra miljøstyrelsen
const url = 'https://arpo-prod-api-app.azurewebsites.net/taxons/?searchText=&take=15&skip=0&notMatched=false&isDkTaxon=true&isDefaultTaxon=true&isMissingPhoto=false&speciesGroups=Fugle';

// URL til lokationsdata om agerhøne
const url2 = 'https://arpo-prod-api-app.azurewebsites.net/records/?searchText=&take=200&zoomLevel=6.505000000000001&mapBounds=6.311220033140885&mapBounds=53.27908359032372&mapBounds=13.959950596326209&mapBounds=58.54520338469064&speciesGroups=Fugle&taxonIds=966eddf8-f785-ea11-aa77-501ac539d1ea&searchMode=3&includeDescendantTaxons=true&isDeleted=&hasMedia=false&excludeSaughtButNotFound=true&includeSpeciesGroupFacet=false&url=';

export default class App extends React.Component {
//Oprettelse af tre tomme state arrays til at hente data fra endpointet
  state = {
    birdsInfoList: [],
    withImageUrl: [],
    withoutImageUrl: []
  };

  //Oprettelse af componentDidMount metode til at diktere de metoder, som skal kaldes, når komponenten mounter
  componentDidMount() {
    this.fetchData()
  }

  //Denne metode står for at hente- og placere data fra endpointet
  fetchData = async() => {

    // Fetch metoden efterspørger data fra et url og gemmer resultatet i response-variablen
    let response = await fetch(url);

    //Dette er parsing af lokationsdata om agerhøne, ikke integreret i render()
    //let response2 = await fetch(url2);
    //const result2 = await response2.json();
    //console.log(result2);

    //Result variablen er resultatet af deserialisering af json data
    const result = await response.json();
    console.log(result);

    //Oprettelse af to arraya til at gemme data
    var withImageUrl =[];
    var withoutImageUrl =[];

    //birdslisten indeholder al data fra url'et efter deserialisering
    const birdsList = result.items;

    //Denæst bruges map metoden til at gennemgå alle dataobjekter i hele listen , hvorefter der testes på om attributten imageUrl er en tom streng
    //På baggrund af attributtens værdi gemmes data i den ene eller den anden liste
    birdsList.map((item, index) => {
      if (item.imageUrl === ""){
        withoutImageUrl.push(item)
      } else{
        withImageUrl.push(item)
    }
    });

//Slutteligt sættes de to statevariabler
    this.setState({birdsInfoList: birdsList});
    this.setState({withImageUrl: withImageUrl});
    this.setState({withoutImageUrl: withoutImageUrl})
  };

  render() {
  //Her gemmes værdierne i to nye variabler, som printes ved brug af map metoden
    const withImageUrl= Object.values(this.state.withImageUrl);
    const withoutImageUrl= Object.values(this.state.withoutImageUrl);
  return(
<View style={styles.container}>
  <Text
      size={18}
      style={styles.paragraph}
  >
    Fugle beskrivelser
  </Text>
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
  },
  paragraph: {
    margin: 24,
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
