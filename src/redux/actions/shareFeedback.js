
import { Actions, Scene, Router, Animations } from 'react-native-router-flux'
import { Feedback, BASEURL } from '../constant'

export const feedback = (getid, gettoken, messagedata) => dispatch => {
    console.log("getid", getid)
    console.log("gettoken", gettoken)
    console.log("messagedata", messagedata)
    fetch(BASEURL + '/mgmtFeedBack', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            authorization: gettoken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(messagedata)
    })
        .then(res => res.json())
        .then(data => dispatch({
            type: Feedback,
            payload: data
        }))
}


export const emptysharedata = () => dispatch => {
    console.log("emptysharedata")
    console.log("celld")
    dispatch({
        type: Feedback,
        payload: ""
    })
}