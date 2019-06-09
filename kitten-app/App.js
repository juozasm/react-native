import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import LeftArr from './assets/left.png';
import RightArr from './assets/right.png';
import axios from 'axios';

export default class App extends React.Component {
  state = {
    imageView: false,
    currentImageIndex:0,
    pageNumber:1,
    images: [],
    totalPages: 0,
    dataLoaded: false
    
  }
  onSwipe = (gestureName) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    const imageView = this.state.imageView
    switch (gestureName) {
      case SWIPE_UP:
        break;
      case SWIPE_DOWN:
        break;
      case SWIPE_RIGHT:
        imageView
        ? this.imageBack()
        : this.pageBack()
        break;
      case SWIPE_LEFT:
        imageView
        ? this.imageForward()
        : this.pageForward()
        break;
    }
  }

  backToGridView = () => this.setState({
    imageView: false,
    currentImageIndex:null,
  })

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

  imageForward = () => {

    const { currentImageIndex, images, totalPages } = this.state

    const totalImages = images.length
    const lastIndex = totalImages - 1
    const pageSize =  totalImages / totalPages

    if(currentImageIndex <  lastIndex){
      this.setState({
        currentImageIndex: currentImageIndex + 1,
        pageNumber: Math.ceil((currentImageIndex + 1 + 1) /  pageSize )
    })
    }else if(pageNumber === lastIndex){
      this.setState({
        currentImageIndex:0,
        pageNumber: Math.ceil(( lastIndex + 1 ) / pageSize )
      })
    }
    
  }

  imageBack = () => {
    
    const { currentImageIndex, images, totalPages } = this.state
    const totalImages = images.length
    const lastIndex = totalImages - 1
    const pageSize =  totalImages / totalPages
    
    if(currentImageIndex >  0){
      this.setState({
        currentImageIndex: currentImageIndex - 1,
        pageNumber: Math.ceil((currentImageIndex - 1 + 1 ) / pageSize )
      })
    }else if(pageNumber === 0){
      this.setState({
        currentImageIndex:lastIndex,
        pageNumber: Math.ceil(( lastIndex + 1 ) / pageSize )
      })
    }
  }

  asyncFunction = async (w) =>{
    const response = await axios.get('https://api.chucknorris.io/jokes/random')
    return Promise.resolve(({text: response.data.value, icon_url: response.data.icon_url, image: `http://placekitten.com/${w}/${w}` }))
  }

  getData = async () =>{
    const images = await Promise.all(Array(48).fill().map(_=>{
      const w = Math.ceil(((Math.random() + 1) *  200))
      return this.asyncFunction(w)
    }))

    this.setState({
      images,
      totalPages:  Math.ceil(images.length / 12),
      dataLoaded: true
    })
  }

  getCurrentImage = (i) =>{
    this.setState({
      imageView: true,
      currentImageIndex:i,
    })    
  }

  componentDidMount(){
    this.getData()
  }

  render() {

    const { pageNumber, images, totalPages, imageView, currentImageIndex, dataLoaded } = this.state
    const config = {
      // velocityThreshold: 0.3,
      // directionalOffsetThreshold: 150
    };
    const colors = [
      '#ff0000',
      '#00ff00',
      '#0000ff',
      'cyan',
    ]
    //.filter((images, i)=>!imageView || currentImageIndex === i )
    const elements = images.map((source, i)=>
    <TouchableOpacity
        disabled={imageView}
        key={i}
        onPress={()=>this.getCurrentImage(i)} 
        oN
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
      <ScrollView
       contentContainerStyle={styles.container}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity
          onPress={
            imageView
            ? this.backToGridView
            : this.pageBack

          } 
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width:`${100 / 3}%`,
          }} >
            <Image source={LeftArr}/>
          </TouchableOpacity>
            <Text style={styles.heading} >
              {
                imageView
                ? 'Back'
                : 'Kitten App!'
              }
            </Text>
            <TouchableOpacity
              onPress={this.pageForward}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width:`${100 / 3}%`,
                display: imageView?'none':'flex'
          }} >
              <Image source={RightArr}/>
            </TouchableOpacity>
        </View>
        <GestureRecognizer 
          config={config}
          onSwipe={(direction, state) => this.onSwipe(direction, state)}
          style={dataLoaded?styles.photoContainer:{...styles.photoContainer, ...styles.spinner}}>         
          {
            dataLoaded
            ?elements.splice((pageNumber - 1) * 12, pageNumber * 12)
            :<ActivityIndicator size="large" color="#ffffff" />
          }  
        </GestureRecognizer>
        <View>
          <View>
            {
              imageView&&
              <View style={{
                flexDirection: 'row'
              }}>
                <Image 
                  style={{
                    width:20,
                    height: 20
                  }} 
                  source={{uri: images[currentImageIndex].icon_url}}
                />
                <Text style={{
                  color:"white"
                }}>
                  {
                    images[currentImageIndex].text
                  }
                </Text>
              </View>
            }
          </View>
          <Text style={{
            color:"white"
          }}>
            {pageNumber}/{totalPages}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    //alignItems: 'center',
    paddingTop: 100,
    //paddingBottom: 100,
    paddingLeft: 20,
    paddingRight: 20,
  },
  heading:{
    textAlignVertical: "center",
    height: '100%',
    width:`${100 / 3}%`,
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
  spinner:{
    justifyContent: 'center',
    alignItems:'center'
  },
  imageWrapper:{
    flexDirection:'row',
    width: '100%',
    //height:50,
    overflow:'hidden',
    marginBottom: 50,
  }

});
