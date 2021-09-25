import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS , USER_SIGNIN_FAIL, USER_SIGNOUT } from "../constants/userConstants";

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