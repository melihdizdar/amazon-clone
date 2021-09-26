import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS , USER_SIGNIN_FAIL, USER_SIGNOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";


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