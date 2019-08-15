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
  CardItem
} from "native-base";

export default class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = { newItemValue: "", allItems: [] };
    this.addNewItem = this.addNewItem.bind(this);
    // this.handleCheckBox = this.handleCheckBox.bind(this);
  }
  addNewItem() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    currDateTime = date + "/" + month + "/" + year + " " + hours + ":" + min;
    newItem = {
      value: this.state.newItemValue,
      dateAdded: currDateTime,
      isChecked: false
    };
    allItems = this.state.allItems;
    if (this.state.newItemValue !== "") {
      allItems.push(newItem);
      this.setState({ allItems });
      this.setState({ newItemValue: "" });
    }
  }
  removeItem(index) {
    allItems = this.state.allItems;
    allItems.splice(index, 1);
    this.setState({ allItems });
  }
  handleCheckBox(index) {
    allItems = this.state.allItems;
    allItems[index].isChecked = !allItems[index].isChecked;
    this.setState({ allItems });
  }

  render() {
    const fullList = this.state.allItems.map(item => {
      key = this.state.allItems.indexOf(item);
      return (
        <ListItem key={key}>
          <CheckBox
            checked={item.isChecked}
            color="blue"
            onPress={this.handleCheckBox.bind(this, key)}
          />
          <Body>
            <Text>{item.value}</Text>
            <Text style={{ fontSize: 12 }}>{item.dateAdded}</Text>
          </Body>
          {item.isChecked === true && (
            <Button
              danger
              rounded
              small
              onPress={this.removeItem.bind(this, key)}
            >
              <Text>Delete</Text>
            </Button>
          )}
        </ListItem>
      );
    });

    return (
      <Container>
        <Header>
          <Title style={{ fontSize: 30, textAlign: "left" }}>To Do List</Title>
        </Header>
        <Card>
          <Form>
            <Item stackedLabel>
              <Label>
                <Text>New Item</Text>
              </Label>
              <Input
                value={this.state.newItemValue}
                onChangeText={newItemValue => this.setState({ newItemValue })}
              />
            </Item>
            <CardItem footer>
              <Button
                iconLeft
                rounded
                small
                style={{
                  width: "20%",
                  alignContent: "center"
                }}
                onPress={this.addNewItem}
              >
                <Icon name="add" />
                <Text>Add</Text>
              </Button>
            </CardItem>
          </Form>
        </Card>
        <Content>
          <Card>
            <CardItem header>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                List Items
              </Text>
            </CardItem>
            {/* <Text style={{ fontSize: 20 }}>List Items</Text> */}
            {fullList}
          </Card>
        </Content>
      </Container>
    );
  }
}
