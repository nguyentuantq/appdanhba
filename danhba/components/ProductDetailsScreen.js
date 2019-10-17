import React, { Component } from 'react';
import {ScrollView, StyleSheet, Image, ActivityIndicator, View, Text} from 'react-native';
import {Button } from 'react-native-elements';
import Database from '../Database';
import Icon from 'react-native-vector-icons/FontAwesome';

const db = new Database();

export default class ProductDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Chi tiết danh bạ',
  }

  constructor() {
    super();
    this.state = {
      TextInputDisableStatus: true,
      isLoading: true,
      product: {},
      id: '',
    };
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      const { navigation } = this.props;
      db.productById(navigation.getParam('prodId')).then((data) => {
        console.log(data);
        product = data;
        this.setState({
          product,
          isLoading: false,
          id: product.prodId
        });
      }).catch((err) => {
        console.log(err);
        this.setState = {
          isLoading: false
        }
      })
    });
  }
  
  deleteProduct(id) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    db.deleteProduct(id).then((result) => {
      console.log(result);
      this.props.navigation.goBack();
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
            <View style={styles.boxavt}>
              <Image
                style={styles.avt}
                source={{uri: this.state.product.prodImage}}
              />
            </View>
            <View>
              <Text>Tên: </Text>
              <Text style={styles.text}>{this.state.product.prodName}</Text>

              <Text>Số điện thoại: </Text>
              <Text style={styles.text}>{this.state.product.prodPrice}</Text>
              
              <Text>Email: </Text>
              <Text style={styles.text}>{this.state.product.prodDesc}</Text>
            </View>
            
          <View style={styles.detailButton}>
            <Button
              icon={<Icon name='edit' size={15} color='#fff'/>}
              large
              title=' Sửa thông tin'
              onPress={() => {
                this.props.navigation.navigate('EditProduct', {
                  prodId: `${this.state.id}`,
                });
              }} />
          </View>
          <View style={styles.detailButton}>
            <Button
              type='outline'
              icon={<Icon name='remove' size={15} color='#0abde3'/>}
              large
              title=' Xóa khỏi danh bạ'
              onPress={() => this.deleteProduct(this.state.id)} />
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20
  },
  boxavt: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avt: {
    flex: 1,
    justifyContent:'space-around',
    width:125,
    height: 125,
  },
  text: {
    paddingLeft:15,
    paddingRight: 15,
    marginTop: 3,
    marginBottom:3,
    borderWidth: 1,
    borderColor: '#0abde3',
    borderStyle: 'solid',
    borderRadius: 3,
    height: 45,
    lineHeight: 45,
    fontWeight:'bold',

  },

  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailButton: {
    marginTop: 20
  }
})
