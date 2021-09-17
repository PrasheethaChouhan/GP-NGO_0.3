import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Card, Icon, ListItem } from "react-native-elements";
import firebase from "firebase";
const { width } = Dimensions.get("screen");
import db from "../config";
import { Header, Badge } from "react-native-elements";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      ngoId: firebase.auth().currentUser.email,
      previousEvents: [],
    };
  }

  getEvents = () => {
    var email = this.state.ngoId;
    this.requestRef = db
      .collection("events")
      .where("ngoId", "==", email)
      .onSnapshot((snapshot) => {
        var dbpreviousEvents = [];

        snapshot.docs.map((doc) => {
          dbpreviousEvents.push(doc.data());
        });
        console.log(dbpreviousEvents);

        this.setState({
          previousEvents: dbpreviousEvents,
        });
        console.log(this.state.previousEvents);
      });
  };
  componentDidMount() {
    this.getEvents();
  }
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <View>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => {
            this.props.navigation.navigate("NGOeventDetail", {
              eventDetails: item,
            });
          }}
        >
          <Image source={item.eventImage} style={styles.img} />
          <View
            style={{
              flex: 0.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              {item.eventName}
            </Text>
            <Text style={{ color: "white", textAlign: "center" }}>
              {item.eventId}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: 0,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1B2E0F",
          marginTop: "-6%",
        }}
      >
        <Header
          centerComponent={{
            text: "GreenPin",
            style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" },
          }}
          rightComponent={
            <Icon
              name="paw"
              type="font-awesome"
              color="#696969"
              onPress={() => {
                this.props.navigation.navigate("NotificationScreen");
              }}
            />
          }
          backgroundColor="#eaf8fe"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("CreateEventScreen");
          }}
        >
          <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
            Create Event
          </Text>
        </TouchableOpacity>
        <View style={{ flex: 0.8 }}>
          <Text
            style={{
              color: "white",
              fontSize: 22,
              padding: 10,
            }}
          >
            Previous Events
          </Text>
          <View
            style={{
              flex: 1,
              backgroundColor: "#1B2E0F",
              color: "#82152b",
            }}
          >
            {this.state.previousEvents.length === 0 ? (
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20 }}>No event found</Text>
              </View>
            ) : (
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.previousEvents}
                renderItem={this.renderItem}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  button: {
    width: "95%",
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#375C1E",
    elevation: 10,
    marginTop: "10%",
  },
  scrollView: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
  divider: {
    borderRightWidth: 0.3,
  },
  products: {
    width: width - 50 * 2,
    paddingVertical: 50 * 2,
  },

  productTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  productDescription: {
    padding: 50,
  },
  imageStyles: {
    width: 200,
    height: 200,
  },
  shadow: {
    shadowColor: "#415136",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  imageContainer: {
    elevation: 1,
  },
  img: {
    width: "50%",
    height: 100,
    resizeMode: "contain",
    borderRadius: 10,
    justifyContent: "center",
  },
});
