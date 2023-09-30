import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { IUserData } from '../shared/types/authentication/common';
import { useNavigate } from 'react-router-dom';
import { useAuthenticationStore } from '../states/authentication';

export default function useAuthenticationManagement() {
  const [localStorageValue, setLocalStorageValue] = useState<string|null>(localStorage.getItem('token'));
  useEffect(() => {
    if(localStorageValue){
      // if found token
      
      try {
        const decoded = jwt_decode<IUserData>(localStorageValue)
        if(+new Date()/1000 >= decoded.exp){
          localStorage.removeItem('token')
          window.location.href = "/master-verification"
        }
        useAuthenticationStore.setState({isAuthenticated:true,userData: decoded})
      } catch {
        localStorage.removeItem('token')
        window.location.href = "/master-verification"
      }

    }
  },[localStorageValue])
  return null
}
