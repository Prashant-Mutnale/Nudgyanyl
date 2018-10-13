import { combineReducers } from 'redux';
import Login from './loginReducer'
import RecentReducer from './recentRedcer'
import HallReducer from './halloffReducer'
import myReviewReducer from './myReviewsReducer'
import WritereviewReducer from './writeReviewReducer'
import SearchReducer from './searchemployeeReducer'
import ShoutoutReducer from './shoutoutReducer'
import Reviewstatusreducer from './reviewstatusReducer'
import FeedbackReducer from './feedbackReducer'
import projectidReducer from './projectidReducer'
import forgotReducertidReducer from './forgotPasswordReducer'
const rootReducer = combineReducers({
    userData: Login,
    recentdata: RecentReducer,
    halldata: HallReducer,
    myreviewdata: myReviewReducer,
    writereviewdata: WritereviewReducer,
    searchdata: SearchReducer,
    shoutoutdata: ShoutoutReducer,
    reviewstatusdata: Reviewstatusreducer,
    feedbackData: FeedbackReducer,
    projectiddata: projectidReducer,
    forgotdata: forgotReducertidReducer
});
export default rootReducer;