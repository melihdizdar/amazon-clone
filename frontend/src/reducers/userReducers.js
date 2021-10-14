import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS , USER_SIGNIN_FAIL, USER_SIGNOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_RESET, USER_DETAILS_RESET, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET, USER_TOPSELLERS_REQUEST, USER_TOPSELLERS_SUCCESS, USER_TOPSELLERS_FAIL, USER_ADDRESS_MAP_CONFIRM } from "../constants/userConstants";


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST: //kayıt işlemini başlatma süreci
        return { loading: true };
      case USER_REGISTER_SUCCESS: //Başarılı kayıt işlemi
        return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL: //Başarılı kayıt işlemi
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

export const userSigninReducer = (state = {},action) =>{
    switch(action.type){
        case USER_SIGNIN_REQUEST: //giriş işlemini başlatma süreci
            return {loading:true};
        case USER_SIGNIN_SUCCESS: //Başarılı giriş işlemi
            return {loading:false,userInfo:action.payload}; 
        case USER_SIGNIN_FAIL: //Başarısız giriş işlemi
            return {loading:false, error:action.payload};
        case USER_SIGNOUT: //çıkış işlemi
            return {};
        default:
            return state;
    }
}

export const userDetailsReducer = (state = {loading:true},action) =>{ //33.display user profile
  switch(action.type){
      case USER_DETAILS_REQUEST:
          return {loading:true};
      case USER_DETAILS_SUCCESS:
          return {loading:false,user:action.payload}; 
      case USER_DETAILS_FAIL:
          return {loading:false, error:action.payload};
      case USER_DETAILS_RESET: //48.Edit User
          return { loading: true };
      default:
          return state;
  }
}

export const userUpdateProfileReducer = (state = {}, action) => { //34.uptade user profile
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => { //48.Edit User
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = {loading:true}, action) => { //46.list users
  switch(action.type){
    case USER_LIST_REQUEST:
        return {loading:true};
    case USER_LIST_SUCCESS:
        return {loading:false,users:action.payload}; 
    case USER_LIST_FAIL:
        return {loading:false, error:action.payload};
    default:
        return state;
  }
}

export const userDeleteReducer = (state = {}, action) => { //47.delete user
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const userTopSellerListReducer = (state = {loading:true}, action) => { //51.Add Top Seller Carousel
  switch(action.type){
    case USER_TOPSELLERS_REQUEST:
        return {loading:true};
    case USER_TOPSELLERS_SUCCESS:
        return {loading:false,users:action.payload}; 
    case USER_TOPSELLERS_FAIL:
        return {loading:false, error:action.payload};
    default:
        return state;
  }
};

export const userAddressMapReducer = (state = {}, action) => { //57.Choose address on google map
  switch (action.type) {
    case USER_ADDRESS_MAP_CONFIRM:
      return { address: action.payload };
    default:
      return state;
  }
};