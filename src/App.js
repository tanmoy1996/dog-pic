import React, { Component } from 'react'
import {Button} from './container/Button'
import {Image} from './container/Image'
import {Selector} from './container/Selector'
import axios from 'axios';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
      img: '',
      url: 'https://dog.ceo/api/breeds/image/random',
      loading: false,
    }
  }
  getUrl(value){
    window.localStorage.setItem('breed',value);
    if(value=='random'){
      return 'https://dog.ceo/api/breeds/image/random'
    }
    else{
      return `https://dog.ceo/api/breed/${value}/images/random`
    }
  }

  async next(value){
    const nexturl = value?this.getUrl(value):this.state.url
    this.setState({...this.state,loading:true})
    await axios.get(nexturl)
    .then((res)=>{
      if(res.status==200){
        this.setState({
          ...this.state,
          img:res.data.message,
          url:nexturl,
          loading:false})
      }
    })
  }

  componentDidMount(){
    if(window.location.pathname.substring(1)!=''){
      this.next(window.location.pathname.substring(1))
    }
    else{
      this.next(window.localStorage.getItem('breed'));
    }
  }

  render() {
    const {img,loading} =this.state;
    return (
      <div className='container'>
        {
          window.location.pathname.substring(1)=='' && 
          <Selector reload={this.next.bind(this)} selected={window.localStorage.getItem('breed')}/>
        }
        {
          loading?
          <p>Loding...</p>:
          <Image img={img}/>
        }
        <Button next={this.next.bind(this)}/>
      </div>
    )
  }
}
