import React from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  AsyncStorage,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import styles from "./styles/style";
import colors from "../Elements/colors";
import RNPickerSelect from "react-native-picker-select";
import StarRating from "react-native-star-rating";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { hof } from '../../redux/actions/Hof'
import { hof } from '../../redux/actions/Hallof'
import { connect } from 'react-redux'
let gettoken
let halldata = []
class Hof extends React.Component {
  constructor(props) {
    super(props);
    this.inputRefs = {};
    this.state = {
      starCount: 2,
      hofdata: '',
      refreshing: false,
      lastupdated: 'present',
      favColor: undefined,
      selectmonth: 'Select the month',
      selecttextmonth: "present",
      items: [
        {
          label: "Last Month",
          value: "last"
        },
        {
          label: "This Month",
          value: "present"
        }
      ]
    };
    this.selectpicker = this.selectpicker.bind(this);
    this.callfunction = this.callfunction.bind(this)
  }
  callfunction() {
    console.log("called data")
  }
  static onEnter() {
    // console.log("dasd")
    this.callfunction()
  }

  // componentWillUnmount() {
  //   console.log("hello");
  // }
  emptycontentlist = () => {
    return (
      <View style={{ marginTop: '50%' }}>
        <Text style={{ textAlign: 'center' }}>You don't have any reviews for now.</Text>
      </View>
    )
  }
  method() {
    console.log("calledmethod")
  }
  selectpicker(value, index) {
    this.setState({
      lastupdated: value
    })
    this.props.hof(value)
    // this.props.onEnter(gettoken, value);
  }
  getAlert() {
    alert('getAlert from Child');
  }
  async componentDidMount() {
    const signindetails = await AsyncStorage.getItem("signindata")
    let parsedata = JSON.parse(signindetails)
    gettoken = parsedata.accessToken
    console.log("gettoken", gettoken)
    // this.props.hof(gettoken, this.state.lastupdated)
  }
  onRefresh() {
    this.setState({ refreshing: true }), this.props.hof(gettoken, this.state.lastupdated), this.setState({ refreshing: false })
  }
  render() {
    if (!this.props.hofdatamain.hallOfFame) {
      return (
        <ActivityIndicator
          animating={true}
          style={[styles.indicator, styles.activityindicator]}
          size="large"
          color="#000"
        />
      );
    }
    return (
      <View style={styles.containerstyle}>
        <StatusBar backgroundColor="#000" barStyle="light-content" animated={true}/>
        <View style={{
            backgroundColor: '#000',
            height: 35
        }}></View>
        <View style={styles.monthPicker}>
          <RNPickerSelect
            placeholder={{
              label: "Select the Date",
              value: "present"
            }}
            items={this.state.items}
            // onValueChange={(value) => {
            //     this.setState({
            //         favColor: value,
            //     });
            // }}
            onValueChange={(value, index) => this.selectpicker(value, index)}
            // onUpArrow={() => {
            //     this.inputRefs.name.focus();
            // }}
            // onDownArrow={() => {
            //     this.inputRefs.picker2.togglePicker();
            // }}
            style={pickerSelectStyles}
            value={this.state.favColor}
            ref={el => {
              this.inputRefs.picker = el;
            }}
          />
        </View>
        <View style={styles.HallListmain}>
          <FlatList data={this.props.hofdatamain.hallOfFame}
            showsVerticalScrollIndicator={false}
            renderItem={(items) => {
              // let reviewrating = items.item.finalRating
              let reviewrating = Math.round(items.item.finalRating * 10) / 10;
              // let finalrating = Math.round(reviewrating)
              // let reviewrating = 3.5
              return (
                <View style={styles.HallListCard}>
                  <View style={styles.HallListAvatar}>
                    <Image
                      style={styles.HallListAvataimage}
                      source={require("../../images/Oval.png")}
                    />
                  </View>
                  <View style={styles.HallListName}>
                    <View style={styles.HallListRating}>
                      <Text style={styles.HallListUser}>{items.item.name.charAt(0).toUpperCase() + items.item.name.slice(1)}</Text>
                      <View style={styles.HallListStar}>
                        <View>
                          <StarRating
                            disabled={true}
                            fullStarColor={
                              reviewrating >= 1 && reviewrating <= 1.5
                                ? "red"
                                : reviewrating >= 1.5 && reviewrating <= 2.2
                                  ? "red"
                                  : reviewrating >= 2.3 && reviewrating <= 2.7
                                    ? "#FFCD83"
                                    : reviewrating >= 2.8 && reviewrating <= 3.2
                                      ? "#FFCD83"
                                      : reviewrating >= 3.3 && reviewrating <= 3.7
                                        ? "#FFEB4E"
                                        : reviewrating >= 3.8 && reviewrating <= 4.2
                                          ? "#CDEB76"
                                          : reviewrating >= 4.3 && reviewrating <= 4.7
                                            ? "#CDEB76"
                                            : "#2AF98A"
                            }
                            maxStars={5}
                            // halfStarColor={"FFCD83"}
                            starSize={14}
                            emptyStar={"star"}
                            emptyStarColor={"#e9e9e9"}
                            rating={reviewrating}
                            starColor={"red"}
                          // selectedStar={(rating) => this.onStarRatingPress(rating)}
                          />
                        </View>
                        <View style={{ paddingLeft: 8 }}>
                          <Text style={{ fontSize: 13 }}>{reviewrating}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.HallListReview}>
                      <Text style={styles.HallListReviewText}>{items.item.noOfReviews} Reveiws</Text>
                    </View>
                  </View>
                </View>
              )
            }}
            ListEmptyComponent={this.emptycontentlist}
            keyExtractor={item => item.email}
            refreshing={this.state.refreshing}
            onRefresh={() => this.onRefresh()}
          />
        </View>
      </View>
    );
  }
}

const pickerSelectStyles  = {
  inputIOS: {
    fontSize: 16,
    paddingTop: 0,
    paddingHorizontal: 8,
    paddingBottom: 0,
    borderBottomWidth: 0,
    borderColor: "#fff",
    // borderColor: '#fff',
    // borderRadius: 4,
    height: 50,
    backgroundColor: "white",
    color: "black"
  },
  inputAndroid: {
    // color: 'white',
    borderBottomWidth: 0,
    height: 50,
    borderBottomColor: "#fff",
  },
  underline: { borderBottomWidth: 0, borderBottomColor: "#fff", borderTopWidth: 0}
};
// const stylesstar = StyleSheet.create({
//     backgroundColor: 'red'
// })

function mapStateToProps(state) {
  return {
    hofdatamain: state.halldata.halldata
  }
}

export default connect(mapStateToProps, { hof })(Hof);
// export default Hof;
