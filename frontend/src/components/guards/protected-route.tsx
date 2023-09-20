import React, { useEffect, useState } from 'react';
import {redirect} from 'react-router-dom'
import { AppCore } from '../../core/app-core';
import { useLoadingBar } from '../../contexts/global/hooks/useLoadingBar';
function ProtectedRoute({children}: {children:React.ReactNode}){
    const loadingBar = useLoadingBar()
    const [isFinishChecking,setIsFinishChecking] = useState<boolean>(false)
    useEffect(() => {
        loadingBar?.continuousStart()
        tokenChecking()
    }, [])

    async function tokenChecking(){
        const token = localStorage.getItem('token')
        if(!token) return window.location.href ="/master-verification"
        const isValid  = await AppCore.isTokenValid()
        loadingBar?.complete()
        if(!isValid){
            localStorage.removeItem('token')
            return window.location.href ="/master-verification"
        }
        setIsFinishChecking(true)
    }
    
    return isFinishChecking ? children : null
}

export default ProtectedRoute