import {create,UseBoundStore,StoreApi} from 'zustand'
import { IUserData } from '../shared/types/authentication/common'

interface IAuthenticationState{
    isAuthenticated: boolean
    userData: IUserData|null
}

export const useAuthenticationStore =  create<IAuthenticationState>(() => ({
    isAuthenticated: false,
    userData: null
}))