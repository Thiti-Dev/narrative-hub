import React, { useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { IUserData } from '../shared/types/authentication/common';
import { useNavigate } from 'react-router-dom';
import { useAuthenticationStore } from '../states/authentication';

export default function useAuthenticationManagement() {
  useEffect(() => {
    const token = localStorage.getItem('token')

    if(token){
      // if found token
      const decoded = jwt_decode<IUserData>(token)
    
      if(+new Date()/1000 >= decoded.exp){
        localStorage.removeItem('token')
        window.location.href = "/master-verification"
      }

      useAuthenticationStore.setState({isAuthenticated:true,userData: decoded})

    }
  },[])
  return null
}
