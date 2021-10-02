import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
  const userId = props.match.params.id; //48.edit user
  const [name, setName] = useState(''); //48.edit user
  const [email, setEmail] = useState(''); //48.edit user
  const [isSeller, setIsSeller] = useState(false); //48.edit user
  const [isAdmin, setIsAdmin] = useState(false); //48.edit user

  const userDetails = useSelector((state) => state.userDetails); //48.edit user
  const { loading, error, user } = userDetails; //48.edit user

  const userUpdate = useSelector((state) => state.userUpdate); //48.edit user
  const {loading: loadingUpdate,error: errorUpdate,success: successUpdate,} = userUpdate; //48.edit user

  const dispatch = useDispatch(); //48.edit user
  useEffect(() => { //48.edit user
    if (successUpdate) { //48.edit user
      dispatch({ type: USER_UPDATE_RESET }); //48.edit user
      props.history.push('/userlist'); //48.edit user
    }
    if (!user) { //48.edit user
      dispatch(detailsUser(userId)); //48.edit user
    } else { //48.edit user
      setName(user.name); //48.edit user
      setEmail(user.email); //48.edit user
      setIsSeller(user.isSeller); //48.edit user
      setIsAdmin(user.isAdmin); //48.edit user
    }
  }, [dispatch, props.history, successUpdate, user, userId]); //48.edit user

  const submitHandler = (e) => { //48.edit user
    e.preventDefault(); //48.edit user
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin })); //48.edit user
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit User {name}</h1>
          {loadingUpdate && <LoadingBox/>}
          {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
        </div>
        {loading ? (<LoadingBox />) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : 
        (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="isSeller">Is Seller</label>
              <input id="isSeller" type="checkbox" checked={isSeller} onChange={(e) => setIsSeller(e.target.checked)}></input>
            </div>
            <div>
              <label htmlFor="isAdmin">Is Admin</label>
              <input id="isAdmin" type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></input>
            </div>
            <div>
              <button type="submit" className="primary">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}