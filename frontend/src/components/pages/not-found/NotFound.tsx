import React from 'react'
import { makeStyles } from 'tss-react/mui'
import { keyframes } from 'tss-react'
import notFoundFlatDesign from '../../../assets/images/not-found.png'
import { Button, Link } from '@mui/material'
import { Home } from '@mui/icons-material'

export default function NotFound() {
    const {classes} = useStyles()
    return (
    <div className={classes.rootContainer}>
        <div className={classes.rotatingImage}/>
        <Link href="/">
            <Button startIcon={<Home/>} className={classes.btnBackHome} variant='outlined' size='large'>BACK HOME</Button>
        </Link>
    </div>
  )
}

export const useStyles = makeStyles()(
    (theme) => ({
    rootContainer:{
        width:'100%',
        height:'100vh',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    rotatingImage:{
        width: '512px',
        height: '512px',
        [theme.breakpoints.down('md')]:{
            width:'256px',
            height:'256px'
        },
        backgroundImage: `url(${notFoundFlatDesign})`,
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
        backgroundSize:'contain',
        animation: `${keyframes`
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        `} infinite 15s linear`,//` lint confusion fixed by doing this
    },
    btnBackHome:{
        position:'absolute',
        bottom:'10%'
    }
    })
)