import { Box, Container, FormControl, Grid, IconButton, TextField } from '@mui/material'
import React, { useRef } from 'react'
import { useStyles } from './styles'
import { AccountCircle,Fingerprint,KeyOutlined } from '@mui/icons-material'
import { createMouseEvent } from '../../../../../utilities/misc/create-mouse-event'

export default function MasterVerification() {
  const {cx,classes} = useStyles()
  const buttonRef = useRef<HTMLButtonElement>()
  return (
    <div className={classes.rootContainer} onKeyUp={(e) => {
      if(e.code === 'Enter'){
        buttonRef.current!.click()
        
        // Click effect simulation
        const downEvent = createMouseEvent('mousedown')
        setTimeout(() => {
          const upEvent = createMouseEvent('mouseup')
          buttonRef.current!.dispatchEvent(upEvent)
        }, 1000);
        buttonRef.current!.dispatchEvent(downEvent)
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
                      <TextField id="input-username" label="Whoami" variant="standard" />
                    </Box>
                    <Box mt="5px" sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <KeyOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField id="input-password" type="password" label="Password" variant="standard" />
                    </Box>

                    <IconButton ref={buttonRef as unknown as any} aria-label="fingerprint" color="secondary" size="large">
                      <Fingerprint  fontSize="large"/>
                    </IconButton>
                  </FormControl>
                </form>
              </div>
            </div>
          </Grid>
      </Grid>
    </div>
  )
}

