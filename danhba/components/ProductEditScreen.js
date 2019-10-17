import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import Database from '../Database';

const db = new Database();

export default class ProductEditScreen extends Component {
  static navigationOptions = {
    title: 'Sửa danh bạ',
  };

  constructor() {
    super();
    this.state = {
      prodId: '',
      prodName: '',
      prodDesc: '',
      prodImage: '',
      prodPrice: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    db.productById(navigation.getParam('prodId')).then((data) => {
      console.log(data);
      const product = data;
      this.setState({
        prodId: product.prodId,
        prodName: product.prodName,
        prodDesc: product.prodDesc,
        prodImage: product.prodImage,
        prodPrice: product.prodPrice,
        isLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }
  
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  updateProduct() {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    let data = {
      prodId: this.state.prodId,
      prodName: this.state.prodName,
      prodDesc: this.state.prodDesc,
      prodImage: this.state.prodImage,
      prodPrice: this.state.prodPrice
    }
    db.updateProduct(data.prodId, data).then((result) => {
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
          <Text style={styles.text}>Tên: </Text>
          <TextInput
              style={styles.subContainer}
              value={this.state.prodName}
              onChangeText={(text) => this.updateTextInput(text, 'prodName')}
          />
          <Text style={styles.text}>Số điện thoại: </Text>  
          <TextInput
              style={styles.subContainer}
              value={this.state.prodPrice}
              keyboardType='numeric'
              onChangeText={(text) => this.updateTextInput(text, 'prodPrice')}
          />
          <Text style={styles.text}>Email: </Text>
          <TextInput
              style={styles.subContainer}
              value={this.state.prodDesc}
              onChangeText={(text) => this.updateTextInput(text, 'prodDesc')}
          />
          <Text style={styles.text}>URL avatar: </Text>
          <TextInput
              style={styles.subContainer}
              value={this.state.prodImage}
              onChangeText={(text) => this.updateTextInput(text, 'prodImage')}
          />

        </View>
        <View style={styles.btn}>
          <Button
            large
            icon={<Icon name='check' size={15} color='#ffffff'/>}
            title=' Sửa thông tin'
            onPress={() => this.updateProduct()} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
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