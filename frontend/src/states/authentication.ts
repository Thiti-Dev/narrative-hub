import {create,UseBoundStore,StoreApi} from 'zustand'
import { IUserData } from '../shared/types/authentication/common'
import jwt_decode from "jwt-decode";

interface IAuthenticationState{
    isAuthenticated: boolean
    userData: IUserData|null
}

export const useAuthenticationStore =  create<IAuthenticationState>(() => ({
    isAuthenticated: false,
    userData: null
}))

export function setAuthenticated(token:string) {
    const decoded = jwt_decode<IUserData>(token)
    useAuthenticationStore.setState({isAuthenticated:true,userData: decoded})
}