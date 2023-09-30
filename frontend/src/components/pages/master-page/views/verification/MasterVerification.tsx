import { Alert, AlertTitle, Box, Container, FormControl, Grid, IconButton, TextField, useFormControl } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useStyles } from './styles'
import { AccountCircle,Fingerprint,KeyOutlined } from '@mui/icons-material'
import { createMouseEvent } from '../../../../../utilities/misc/create-mouse-event'
import { axiosDefaultInstance } from '../../../../../core/app-core'
import type {AxiosError} from 'axios'
import { useLoadingBar } from '../../../../../contexts/global/hooks/useLoadingBar'
import {useNavigate} from 'react-router-dom'
import { setAuthenticated } from '../../../../../states/authentication'

export default function MasterVerification() {
  const {cx,classes} = useStyles()

  const buttonRef = useRef<HTMLButtonElement>()
  const [isInvalid,setIsInvalid] = useState<boolean>(false)
  const [username,setUsername] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const [isProcessLocked,setIsProcessLocked] = useState<boolean>(false)
  const loadingBar = useLoadingBar()
  const navigate = useNavigate();

  async function onLoggingIn(){
    loadingBar?.continuousStart() // start loading bar
    setIsInvalid(false) // reset
    try {
      const res = await axiosDefaultInstance.post("/managements/login",{
        username,password
      })
      const {token} = res.data
      if(token){
        //if token found
        localStorage.setItem('token',token)
        setAuthenticated(token)
        navigate("/")
      }
    } catch (error:unknown) {
      if((error as AxiosError).response?.status === 401){
        setIsInvalid(true)
      }
    }finally{
      loadingBar?.complete() // finish the loading bar
    }
  }

  return (
    <div className={classes.rootContainer} onKeyUp={(e) => {
      if(e.code === 'Enter' && !isProcessLocked){
        setIsProcessLocked(true)
        // Click effect simulation
        const downEvent = createMouseEvent('mousedown')
        setTimeout(() => {
          const upEvent = createMouseEvent('mouseup')
          buttonRef.current!.dispatchEvent(upEvent)
          setIsProcessLocked(false)
          buttonRef.current!.click() // triggering the click after the event dispatched
        }, 1000);
        buttonRef.current?.dispatchEvent && buttonRef.current.dispatchEvent(downEvent)
        //--------------------------------------
      }
    }}>
      <Grid container sx={{height:'100%',width:'100%'}} direction="row">
          <Grid item xs={12} lg={6}>
            <div className={classes.backgroundContainer}/>
          </Grid>
          <Grid item xs={12} lg={6}>
            <div className={classes.credentialBoxContainer}>
              <div className={classes.credentialBox}>
                <form className={cx(classes.fwfh, classes.flexCentered)} noValidate autoComplete="off">
                  <FormControl>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField id="input-username" label="Whoami" variant="standard" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
                    </Box>
                    <Box mt="5px" sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <KeyOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField id="input-password" type="password" label="Password" variant="standard" value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
                    </Box>

                    <IconButton onClick={onLoggingIn} ref={buttonRef as unknown as any} aria-label="fingerprint" color="secondary" size="large">
                      <Fingerprint  fontSize="large"/>
                    </IconButton>
                  </FormControl>
                  {isInvalid &&                   <Alert style={{position:'absolute',bottom:'0%',right:0}} severity="error">
                      <AlertTitle>Error</AlertTitle>
                      Credentail provided is <strong>Incorrect!</strong>
                  </Alert>}
                </form>
              </div>
            </div>
          </Grid>
      </Grid>
    </div>
  )
}

