import React, { Component } from "react";
import {
  Container,
  Header,
  Form,
  Body,
  Button,
  Item,
  Icon,
  Title,
  Label,
  Text,
  Input,
  CheckBox,
  ListItem,
  Content,
  Card,
  CardItem,
  Toast
} from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";
import emaiValidator from "email-validator";
import { ToastAndroid } from "react-native";
import ToDoList from "./ToDoList";

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { emailAddress: "", password: "" };
    this.validateEmail = this.validateEmail.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  validateEmail() {
    if (!emaiValidator.validate(this.state.emailAddress)) {
      ToastAndroid.show("Enter a valid email address", ToastAndroid.SHORT);
    }
  }
  submitLogin() {
    if (!emaiValidator.validate(this.state.emailAddress)) {
      ToastAndroid.show("Enter a valid email address", ToastAndroid.SHORT);
    } else if (this.state.password === "") {
      ToastAndroid.show("Enter a password", ToastAndroid.SHORT);
    } else {
      this.props.navigation.navigate("ToDoList");
    }
  }
  render() {
    return (
      <Container>
        <Header>
          <Title style={{ fontSize: 30, textAlign: "left" }}>MyLists</Title>
        </Header>
        <Body style={{ justifyContent: "space-evenly" }}>
          <Card>
            <CardItem header>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>Login</Text>
            </CardItem>
            <Form>
              <Item stackedLabel>
                <Label>
                  <Text>Email Address</Text>
                </Label>
                <Input
                  value={this.state.emailAddress}
                  onChangeText={emailAddress => this.setState({ emailAddress })}
                  onEndEditing={this.validateEmail}
                />
              </Item>
              <Item stackedLabel>
                <Label>
                  <Text>Password</Text>
                </Label>
                <Input
                  secureTextEntry
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                />
              </Item>
              <CardItem footer>
                <Button
                  rounded
                  small
                  style={{
                    width: "20%",
                    alignContent: "center"
                  }}
                  onPress={this.submitLogin}
                >
                  <Text>Login</Text>
                </Button>
              </CardItem>
            </Form>
          </Card>
        </Body>
      </Container>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    ToDoList: ToDoList
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);
