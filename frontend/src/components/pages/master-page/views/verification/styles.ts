import { makeStyles } from "tss-react/mui";
import authenBackground from '../../../../../assets/images/authen-background.jpg'

export const useStyles = makeStyles()(
    (theme) => ({
        rootContainer:{
            height:'100vh',
        },
        fwfh:{
            position:'relative',
            width:'100%',
            height: '100%'
        },
        flexCentered:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        },
        backgroundContainer:{
            backgroundImage: `url(${authenBackground})`,
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover',
            backgroundPosition:'center',
            height: '100%',
            width:'100%',
            [theme.breakpoints.down('lg')]:{
                height:'500px'
            }
        },
        credentialBoxContainer:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'100%'
        },
        credentialBox:{
            width:'500px',
            height: '500px',
            //backgroundColor:'green',
            boxShadow:'5px 10px 18px #888888',
            borderRadius:'10px',
            borderStyle:'ridge'
        }
    })
)