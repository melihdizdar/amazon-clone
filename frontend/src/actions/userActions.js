import axios from "axios";
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT ,USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"


export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
        //Başarılı kayıt işlemi
      const { data } = await axios.post('/api/users/register', {name,email,password,});
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data }); //userInfo USER_SIGNIN_SUCCESS'da tanımlandığı için bu kod satırı yazıldı
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        //Başarısız kayıt işlemi
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const signin = (email,password) => async(dispatch) =>{
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email,password}});
    try{
        //Başarılı giriş işlemi
        const {data} = await axios.post('/api/users/signin',{email,password});
        dispatch({type:USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    catch(error){
        //Başarısız giriş işlemi
        dispatch({type:USER_SIGNIN_FAIL, payload:error.response && error.response.data.message ?
        error.response.data.message : error.message,});
    }
}

export const signout = () => (dispatch) =>{
    //navbar'daki üye isminin silinip cart'ın gelme olayı
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({type:USER_SIGNOUT});
};