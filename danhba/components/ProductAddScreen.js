import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Database from '../Database';
import Icon from 'react-native-vector-icons/FontAwesome';

const db = new Database();

export default class ProductAddScreen extends Component {
  static navigationOptions = {
    title: 'Thêm danh bạ',
  };
  constructor() {
    super();
    this.state = {
      prodId: '',
      prodName: '',
      prodDesc: '',
      prodImage: '',
      prodPrice: '',
      isLoading: false,
    };
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  
  saveProduct() {
    this.setState({
      isLoading: true,
    });
    let data = {
      prodId: this.state.prodId,
      prodName: this.state.prodName,
      prodDesc: this.state.prodDesc,
      prodImage: this.state.prodImage,
      prodPrice: this.state.prodPrice
    }
    db.addProduct(data).then((result) => {
      console.log(result);
      this.setState({
        isLoading: false,
      });
      this.props.navigation.state.params.onNavigateBack;
      this.props.navigation.goBack();
    }).catch((err) => {
      console.log(err);
      this.setState({
        isLoading: false,
      });
    })
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        
        <View>
          <Text style={styles.text}>ID:</Text>
          <TextInput
              style={styles.subContainer}
              placeholder={'Nhập kiểu số'}
              keyboardType='numeric'
              value={this.state.prodId}
              onChangeText={(text) => this.updateTextInput(text, 'prodId')}
          />
          <Text style={styles.text}>URL avatar: </Text>
          <TextInput
              style={styles.subContainer}
              placeholder={'photos/avatar.jpg '}
              value={this.state.prodImage}
              onChangeText={(text) => this.updateTextInput(text, 'prodImage')}
          />
          <Text style={styles.text}>Tên: </Text>
           <TextInput
              style={styles.subContainer}
              placeholder={'Nguyễn Văn Tuân'}
              value={this.state.prodName}
              onChangeText={(text) => this.updateTextInput(text, 'prodName')}
          />
          <Text style={styles.text}>Số điện thoại: </Text>
          <TextInput
              style={styles.subContainer}
              placeholder={'0963900827'}
              keyboardType='numeric'
              value={this.state.prodPrice}
              onChangeText={(text) => this.updateTextInput(text, 'prodPrice')}
          />
          <Text style={styles.text}>Email: </Text>
          <TextInput
              style={styles.subContainer}
              placeholder={'nguyentuan277tq@gmail.com'}
              value={this.state.prodDesc}
              onChangeText={(text) => this.updateTextInput(text, 'prodDesc')}
          />
       
          
        </View>
        <View style={styles.btn}>
          <Button
            large
            icon={<Icon name='check' size={15} color='#ffffff'/>}
            title=' Thêm danh bạ'
            onPress={() => this.saveProduct()} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontWeight: 'bold',
  },
  btn: {
    marginTop: 20,
  },
  subContainer: {
    flex: 1,
    paddingLeft:15,
    paddingRight: 15,
    marginTop: 3,
    marginBottom:3,
    borderWidth: 1,
    borderColor: '#0abde3',
    borderStyle: 'solid',
    borderRadius: 3,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})