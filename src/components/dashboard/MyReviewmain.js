import React from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  findNodeHandle,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
  RefreshControl,
  BackHandler
} from "react-native";
import { Actions } from "react-native-router-flux";
import Octicons from "react-native-vector-icons/Octicons";
import styles from "./styles/style";
import RNPickerSelect from "react-native-picker-select";
import colors from "../Elements/colors";
import StarRating from "react-native-star-rating";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MyReviews from '../dashboard/MyReviews';
import ReviewByme from '../dashboard/reviewByme';
import { myreviews } from '../../redux/actions/MyReviews'
import { getProjectid } from '../../redux/actions/projectId'
import { reviewByme } from '../../redux/actions/MyReviews'
import { reviewstatus } from '../../redux/actions/Reviewstatus'
import { hrRating } from '../../redux/actions/MyReviews'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'
import TimeAgo from 'react-native-timeago';
let reviewedstatus
let avaragerating
let behaviourfinal
let skillLevelfinal
let communicationfinal
let dependabilityfinal
let gettoken
let getid
let behaviouralround
let skillround
let communicationround
let dependablityround
let finalratinggot
let finalroundrating
let nameiduser
let behavior = 0
let skillLevel = 0
let communication = 0
let dependability = 0
let avrg = 0;
let gotlength
let overallrating
let username
let averagetextrating
let nerating
let average = 0
let behaviorAvg = 0
let skillLevelAvg = 0
let dependabilityAvg = 0
let communicationAvg = 0
let ratingaverage
let loginname
let behaviorFinal = 0
let skillFinal = 0
let communicationFinal = 0
let dependablityFinal = 0
let Arrayid
let joinId
class MyReviewsmain extends React.Component {
  constructor(props) {
    super(props);
    this.getemployerating=""
    this.behavior = 0
    this.skillLevel = 0
    this.communication = 0
    this.dependability = 0
    this.behaviorFinal = 0
    this.skillFinal = 0
    this.communicationFinal = 0
    this.dependablityFinal = 0
    this.average = 0
    this.hrrating = 0
    this.state = {
      viewRef: null,
      starCount: 3,
      favColor: undefined,
      lastupdated: 'present',
      refreshing: false,
      changetabs: "myReviews",
      items: [
        {
          label: "Last Month",
          value: "last"
        },
        {
          label: "This Month",
          value: "present"
        },
        {
          label: "Overall",
          value: "all"
        }
      ]
    };
    this.selectpicker = this.selectpicker.bind(this);
    this.checkEmployees = this.checkEmployees.bind(this)
    this.checkTabs = this.checkTabs.bind(this)
  }
  _onRefresh = () => {
    this.setState({ refreshing: true }), this.props.myreviews(gettoken, getid, this.state.lastupdated), this.setState({ refreshing: false })
  }
  selectpicker(value, index) {
    this.setState({
      lastupdated: value
    })
    this.props.myreviews(gettoken, getid, value)
    this.props.hrRating(gettoken, getid, value)
    this.props.reviewByme(gettoken, value)
  }
  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }
  checkTabs(checktabs){
      console.log("clicked",checktabs)
    this.setState({
        changetabs: checktabs
    })
  }
  async componentDidMount() {
    const signindetails = await AsyncStorage.getItem("signindata")
    let parsedata = JSON.parse(signindetails)
    gettoken = parsedata.accessToken
    getid = parsedata.userData.id
    loginname = parsedata.userData.name.charAt(0).toUpperCase() + parsedata.userData.name.slice(1)
    this.props.myreviews(gettoken, getid, this.state.lastupdated)
    this.props.getProjectid(gettoken)
    this.props.hrRating(gettoken, getid, this.state.lastupdated)
    this.props.reviewByme(gettoken,this.state.lastupdated)
  }
  checkEmployees() {
    this.props.projectiddata !== "" && this.props.projectiddata != undefined ?
      Arrayid = this.props.projectiddata.project.map(function (itemsid, id) {
        // console.log("itemsid", itemsid)
        return itemsid.id
      }).join("&")
      : null
    joinId = Arrayid
    this.props.reviewstatus(gettoken, joinId, "frommyreview")
  }
  componentWillReceiveProps(nextProps) {
    this.behavior = 0
    this.skillLevel = 0
    this.communication = 0
    this.dependability = 0
    this.behaviorFinal = 0
    this.skillFinal = 0
    this.communicationFinal = 0
    this.dependablityFinal = 0
    this.average = 0

    if (nextProps.myreviewdata !== undefined && nextProps.myreviewdata !== "") {
      let getlength = nextProps.myreviewdata.data
      gotlength = getlength.length
      nextProps.myreviewdata.data !== "" && nextProps.myreviewdata.data !== undefined ?
        nextProps.myreviewdata.data.map((items, i) => {
          if (gotlength >= 1) {
            username = items.reviewTo.name
            // this.behavior = 0
            // this.skillLevel = 0  
            // this.communication = 0
            // this.dependability = 0
            this.behavior = this.behavior + parseInt(items.employeeRating.behavior)
            console.log("behavournew", this.behavior)
            this.skillLevel = this.skillLevel + parseInt(items.employeeRating.skillLevel);
            this.communication = this.communication + parseInt(items.employeeRating.communication);
            this.dependability = this.dependability + parseInt(items.employeeRating.dependability);
          }
          else {
            null
          }
        })
        : null
      if (gotlength >= 1) {
        this.behavior = this.behavior / nextProps.myreviewdata.data.length;
        this.skillLevel = this.skillLevel / nextProps.myreviewdata.data.length;
        this.communication = this.communication / nextProps.myreviewdata.data.length;
        this.dependability = this.dependability / nextProps.myreviewdata.data.length;
        this.average = Math.round((this.behavior + this.skillLevel + this.communication + this.dependability) / 4 * 10) / 10;
        this.behaviorFinal = Math.round(this.behavior * 10) / 10;
        this.skillFinal = Math.round(this.skillLevel * 10) / 10;
        this.communicationFinal = Math.round(this.communication * 10) / 10;
        this.dependabilityFinal = Math.round(this.dependability * 10) / 10;
      }
      else {
        null
      }
    }


  }

  render() {
    reviewedstatus = this.props.myreviewdata.reviewed
    if (this.props.hrData) {
      hrratingsec = (this.props.hrData.workCulture + this.props.hrData.punctuality + this.props.hrData.absenteeism) / 3
      this.hrrating = Math.round(hrratingsec*10)/10;
    }

    
    // var str = [{ name: "Joe", age: 22 },
    // { name: "Kevin", age: 24 },
    // { name: "Peter", age: 21 }
    // ].map(function (elem) {
    //   return elem.name;
    // }).join("&");
    // console.log("str", str)
    if (!this.props.myreviewdata.data) {
      return (
        <ActivityIndicator
          animating={true}
          style={[styles.indicator, styles.activityindicator]}
          size="large"
          color="#000"
        />
      );
    }
    this.getemployerating = this.props.myreviewdata.data
    return (
      <View style={{
        flex: 1
      }}>
            <StatusBar backgroundColor="#000" barStyle="light-content"/>
      <View style={{
            backgroundColor: '#000',
            height: 35
        }}></View>
                <View style={styles.fixedHeader}>
          <TouchableOpacity style={styles.newTab}  activeOpacity={1} onPress={()=>this.checkTabs("myReviews")}>
              <View>
                  <Text style={styles.myReviewText}>My Reviews</Text>
                  {/* <Text style={styles.rateText}>teammate</Text> */}
              </View>
              <View>
              <Image
          source={require('../../assets/images/My-reviews.png')}
        />
              </View>
              {
                  this.state.changetabs=="myReviews"? <View style={{
                    flexDirection: 'column',
                    flex: 1,
                    width: '100%',
                    position: 'absolute',
                    bottom: 0
                }}>
                <View style={{
                    height: 3,
                    flex:1,
                    flexDirection: 'column',
                    backgroundColor: "#000"
                }}>
                </View>
                </View>: null
              }
          </TouchableOpacity>
          <TouchableOpacity style={styles.newTab} onPress={()=>this.checkTabs("rated")} activeOpacity={1}>
              <View>
                  <Text style={styles.myReviewText}>Rated by me</Text>
                  {/* <Text style={styles.rateText}>shout-out</Text> */}
              </View>
              <View>
              <Image
          source={require('../../assets/images/rated-by-me.png')}
        />
              </View>
              {
                  this.state.changetabs=="myReviews"?null: <View style={{
                    flexDirection: 'column',
                    flex: 1,
                    width: '100%',
                    position: 'absolute',
                    bottom: 0
                }}>
                <View style={{
                    height: 3,
                    flex:1,
                    flexDirection: 'column',
                    backgroundColor: "#000"
                }}>
                </View>
                </View>
              }
          </TouchableOpacity>
        </View>
      <View style={{flex: 1, marginTop: 30}}>
      <ScrollView style={styles.containerstyle} refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
      {
          this.state.changetabs == "myReviews"?<MyReviews getDate = {this.props.myreviewdata}/>: <ReviewByme myReviewdatanew = {this.props.myReviewdata}/>
      }
        {/* <MyReviews/> */}
        {/* <ReviewByme/> */}
      </ScrollView>
      </View>
      <View style={styles.calenderHolder}>
      <MaterialCommunityIcons
      style={{
        position: 'absolute'
      }}
             name="calendar-range"
             size={22}
              color="#fff"
        />
                  <RNPickerSelect
                placeholder={{
                  label: "Select Date",
                  value: "present"
                }}
               
                hideIcon={true}
                items={this.state.items}
                // onValueChange={(value) => {
                //     this.setState({
                //         favColor: value,
                //     });
                // }}
                onValueChange={(value, index) =>
                  this.selectpicker(value, index)
                }
                // onUpArrow={() => {
                //     this.inputRefs.name.focus();
                // }}
                // onDownArrow={() => {
                //     this.inputRefs.picker2.togglePicker();
                // }}
                style={pickerSelectStyles}
                value={this.state.favColor}
              // ref={(el) => {
              //     this.inputRefs.picker = el;
              // }}
              />
      </View>
      </View>
    );
  }
}

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 8,
    borderBottomWidth: 0,
    borderColor: "#fff",
    // borderColor: '#fff',
    // borderRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "rgba(255, 255, 255, 0)",
  },
  inputAndroid: {
    // color: 'white',
    borderBottomWidth: 0,
    borderBottomColor: "#fff",
  },
  underline: { borderBottomWidth: 0, borderBottomColor: "#fff", borderTopWidth: 0},
  absolute: {
    position: "absolute",
    backgroundColor: "red",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  placeholderColor: 'transparent',
};


function mapStateToProps(state) {
  return {
    myreviewdata: state.myreviewdata.myreviewdata,
    hrData: state.myreviewdata.hrdata.reviewList,
    projectiddata: state.projectiddata.projectiddata.employeeProject,
    myReviewdata: state.myreviewdata.reviebymedata.reviewList
  }
}


export default connect(mapStateToProps, { myreviews, getProjectid, reviewstatus, hrRating, reviewByme})(MyReviewsmain);