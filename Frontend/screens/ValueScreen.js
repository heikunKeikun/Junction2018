import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Title,
  Button,
  TextInput,
  Text,
  View,
  YellowBox,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import Toast, {DURATION} from 'react-native-easy-toast'

YellowBox.ignoreWarnings(['Setting a timer'])

export default class ValueScreen extends React.Component {
  static navigationOptions = {
    title: 'Value      '
  };

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      surname: '',
      balance: '',
      newBalance: 0
    };
  }

  componentDidMount() {
    this.onPageLoad();
  }

  onPageLoad = () => {
    firebase
      .database()
      .ref('/user/1')
      .on('value', snapshot => {
        this.setState({
          firstname: snapshot.val().firstName,
          surname: snapshot.val().surname,
          balance: snapshot.val().balance
        });
      });
  };

  editValue = () => {
    firebase
      .database()
      .ref('/user/1/')
      .update({
        balance: this.state.balance + this.state.newBalance
      });
      this.setState({
        newBalance: 0
      })
  };

  increase = () => {
    this.setState({
      newBalance: this.state.newBalance + 1
    })
  }

  decrease = () => {
    this.setState({
      newBalance: this.state.newBalance - 1
    })
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 55,
            borderBottomColor: '#4298f4',
            borderBottomWidth: 2,
            color: "#4298f4"
          }}>
          Your balance{'\n'}
        </Text>
        <Text style={{ fontSize: 40, marginTop: 50, color: "#4298f4" }}>
          {this.state.balance + "€"}
        </Text>
        <View style={{ width: 100, marginTop: 50, flexDirection: 'row', justifyContent: "space-around"}}>
          <TouchableOpacity style={{alignContent: "center", backgroundColor: "#4298f4", padding: 10}} onPress={this.increase}>
            <Text>+</Text>
          </TouchableOpacity>
          <TextInput
            onChangeText={newBalance => this.setState({ newBalance })}
            value={`${this.state.newBalance}`}
            keyboardType="numeric"
            style={{ borderBottomColor: 'black', borderBottomWidth: 2 }}
          />
          <TouchableOpacity style={{alignContent: "center", backgroundColor: "#4298f4", padding: 10}} onPress={this.decrease}>
          <Text>-</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: "#4298f4", width: 100, padding: 10, marginTop: 50}} onPress={() => {
          this.refs.toast.show('Payment confirmed!', 500, () => {
            this.editValue();
          });
        }}>
          <Text>Bank/Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: "#4298f4", width: 100, padding: 10, marginTop: 50}} onPress={() => {
          this.refs.toast.show('Payment confirmed!', 500, () => {
            this.editValue();
          });
        }}><Text>MobilePay</Text></TouchableOpacity>
        <Toast 
        ref="toast"
        position="top"
        style={{backgroundColor: "gray"}}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
