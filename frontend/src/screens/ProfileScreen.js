import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState(''); //34.uptade user profile
  const [email, setEmail] = useState(''); //34.uptade user profile
  const [password, setPassword] = useState(''); //34.uptade user profile
  const [confirmPassword, setConfirmPassword] = useState(''); //34.uptade user profile

  const [sellerName, setSellerName] = useState(''); //49.Implement Seller View
  const [sellerLogo, setSellerLogo] = useState(''); //49.Implement Seller View
  const [sellerDescription, setSellerDescription] = useState(''); //49.Implement Seller View

  const userSignin = useSelector((state) => state.userSignin); //33.display user profile
  const { userInfo } = userSignin; //33.display user profile
  const userDetails = useSelector((state) => state.userDetails); //33.display user profile
  const { loading, error, user } = userDetails; //33.display user profile
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile); //34.uptade user profile
  const { success: successUpdate, error: errorUpdate, loading: loadingUpdate, } = userUpdateProfile; //34.uptade user profile
  const dispatch = useDispatch(); //33.display user profile
  useEffect(() => { //33.display user profile
    if (!user) { //34.uptade user profile
      dispatch({ type: USER_UPDATE_PROFILE_RESET }); //34.uptade user profile
      dispatch(detailsUser(userInfo._id)); //34.uptade user profile
    } else { //34.uptade user profile
      setName(user.name); //34.uptade user profile
      setEmail(user.email); //34.uptade user profile
      if (user.seller) { //49.Implement Seller View
        setSellerName(user.seller.name); //49.Implement Seller View
        setSellerLogo(user.seller.logo); //49.Implement Seller View
        setSellerDescription(user.seller.description); //49.Implement Seller View
      }
    }
  }, [dispatch, userInfo._id, user]); //34.uptade user profile
  //  dispatch(detailsUser(userInfo._id)); //33.display user profile
  //}, [dispatch, userInfo._id]); //33.display user profile
  const submitHandler = (e) => { //33.display user profile
    e.preventDefault(); //33.display user profile
    if (password !== confirmPassword) { //34.update user profile
      alert('Password and Confirm Password Are Not Matched'); //34.update user profile
    } else { //34.update user profile
      //dispatch(updateUserProfile({ userId: user._id, name, email, password })); //34.update user profile
      dispatch(
        updateUserProfile({userId: user._id,name,email,password,sellerName,sellerLogo,sellerDescription,})); //49.Implement Seller View
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (<LoadingBox/>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : 
        (
          <>
            {loadingUpdate && <LoadingBox/>}
            {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
            {successUpdate && (<MessageBox variant="success">Profile Updated Successfully</MessageBox>)}
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input id="confirmPassword" type="password" placeholder="Enter confirm password" onChange={(e) => setConfirmPassword(e.target.value)}></input>
            </div>
            {user.isSeller && (
              <>
                <h2>Seller</h2>
                <div>
                  <label htmlFor="sellerName">Seller Name</label>
                  <input id="sellerName" type="text" placeholder="Enter Seller Name" value={sellerName} onChange={(e) => setSellerName(e.target.value)} ></input>
                </div>
                <div>
                  <label htmlFor="sellerLogo">Seller Logo</label>
                  <input id="sellerLogo" type="text" placeholder="Enter Seller Logo" value={sellerLogo} onChange={(e) => setSellerLogo(e.target.value)} ></input>
                </div>
                <div>
                  <label htmlFor="sellerDescription">Seller Description</label>
                  <input id="sellerDescription" type="text" placeholder="Enter Seller Description" value={sellerDescription} onChange={(e) => setSellerDescription(e.target.value)}></input>
                </div>
              </>
            )}
            <div>
              <label />
              <button className="primary" type="submit">Update</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}