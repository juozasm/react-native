import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView   } from 'react-native';
import LeftArr from './assets/left.png';
import RightArr from './assets/right.png';
//import axios from 'axios';

//http://placekitten.com/200/300
export default class App extends React.Component {
  state = {
    imageView: false,
    currentImageIndex:0,
    pageNumber:1,
    images: [],
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

  getChuckNorrisJoke = () =>{
    return 'Joke'
  }

  getRandomImages = () =>{
    return Array(48).fill().map(_=>{
      const w = Math.ceil(((Math.random() + 1) *  200))
      return {image: `http://placekitten.com/${w}/${w}`, text:this.getChuckNorrisJoke()}
    })
  }

  getCurrentImage = (i) =>{
    this.setState({
      imageView: true,
      currentImageIndex:i,
    })    
  }

  componentDidMount(){
    const images = this.getRandomImages()
    this.setState({
      images,
      totalPages:  Math.ceil(images.length / 12)
    })


  //   axios.get('http://placekitten.com/')
  // .then(function (response) {
  //   // handle success
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  }

  render() {

    const { pageNumber, images, totalPages, imageView, currentImageIndex, } = this.state
    const colors = [
      '#ff0000',
      '#00ff00',
      '#0000ff',
      'cyan',
    ]
    //.filter((images, i)=>!imageView || currentImageIndex === i )
    const elements = images.map((source, i)=>
    <TouchableOpacity
        key={i}
        onPress={()=>this.getCurrentImage(i)} 
        style={{
          width: imageView?`100%`:`${100 / 3}%`, 
          height: imageView?'100%':`${100 / 4}%`,
          display:currentImageIndex === i ? 'flex' : imageView ? 'none' : 'flex',
        }} >
      <Image
        style={{
          width: '100%',
          height: '100%',
          //borderColor:colors[Math.floor(i / 12)],
          //borderWidth:2
        }}
        source={{uri: source.image}}

      />
    </TouchableOpacity>
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
          {
            elements.splice((pageNumber - 1) * 12, pageNumber * 12)
          }
          
        </View>
        <Text style={{
          color:"white"
        }}>{pageNumber}/{totalPages}</Text>
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
