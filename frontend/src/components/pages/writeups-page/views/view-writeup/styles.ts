import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(
    (theme) => ({
        coverImageContainer:{
            marginTop: '20px',
            width:'100%',
            height: '200px',
            backgroundPosition:'center',
            backgroundSize:'cover',
            backgroundRepeat:'no-repeat'
        },
        headerContainer:{
            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
        },
        writeupContainer:{
            marginTop: '20px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;'
        }
    })
)