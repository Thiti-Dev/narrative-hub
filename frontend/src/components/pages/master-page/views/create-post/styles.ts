import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(
    (theme) => ({
        actionContainer:{
            marginTop:'20px',
            marginBottom:'20px',
            display:'flex',
            width:'100%',
            justifyContent:'flex-end',
            flexDirection:'column',
        },
        editorContainer:{
            marginTop:'20px',
            display:'flex',
            justifyContent:'center',
            padding: '20px',
            border: '1px solid #BFBFBF',
            boxShadow:'8px 8px 5px #aaaaaa'
        },
        editorInnerContainer:{
            width:'100%',
        },
        editorStyle:{
            height: '800px'
        }
    })
)