import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView   } from 'react-native';
import LeftArr from './assets/left.png'
import RightArr from './assets/right.png'

export default class App extends React.Component {
  state = {
    pageNumber:1,
    images: Array(48).fill(),
    totalPages: 0
  }

  pageBack = () => {
    const {totalPages, pageNumber} = this.state
    if(pageNumber >  1){
      this.setState({pageNumber: pageNumber-1})
    }else if(pageNumber === 1){
      this.setState({pageNumber:totalPages})
    }
  }
  pageForward = () => {
    const {totalPages, pageNumber} = this.state
    if(pageNumber <  totalPages){
      this.setState({pageNumber: pageNumber+1})
    }else if(pageNumber === totalPages){
      this.setState({pageNumber:1})
    }
    
  }

  componentDidMount(){
    this.setState({
      totalPages:  Math.ceil(this.state.images.length / 12)
    })
  }

  render() {

    const { pageNumber, images, totalPages } = this.state
    const colors = [
      '#ff0000',
      '#00ff00',
      '#0000ff',
      'cyan',
    ]
    const elements = images.map((item, i, arr)=>
    <Image
      key={i}
      style={{
        width: `${100 / 3}%`, 
        height: `${100 / 4}%`,
        borderColor:colors[Math.floor(i / 12)],
        borderWidth:2
      }}
      source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}

    />
    )
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity
          onPress={this.pageBack} 
          style={{
            
          }} >
            <Image source={LeftArr}/>
          </TouchableOpacity>
            <Text style={styles.heading} >Kitten App!</Text>
            <TouchableOpacity
              onPress={this.pageForward}
              style={{
           
          }} >
              <Image source={RightArr}/>
            </TouchableOpacity>
        </View>
        <View style={styles.photoContainer}>
          {elements.filter((Item, i)=>
            Math.ceil((i + 1) / 12) >= pageNumber && Math.ceil((i + 1) / 12) < pageNumber + 1 &&<Item key={i}/>
          )}
        </View>
        <Text style={{
          color:"white"
        }}>{totalPages}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    //alignItems: 'center',
    paddingTop: 100,
    //paddingBottom: 100,
    paddingLeft: 20,
    paddingRight: 20,
  },
  heading:{
    marginBottom: 20,
    justifyContent: 'center',
    fontSize: 24,
    color: '#fff',
  },
  photoContainer:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderColor: '#FFF',
    borderWidth: 2,
    borderStyle: 'solid',
    width: '100%',
    height:400,
    overflow:'hidden'
  },
  imageWrapper:{
    justifyContent:'space-around',
    flexDirection:'row',
    width: '100%',
    //height:50,
    overflow:'hidden'
  }

});
