import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import ReactDOMServer from 'react-dom/server';
import useSWR from 'swr'
import { AppCore, axiosDefaultInstance } from '../../../../../core/app-core'
import { useLoadingBar } from '../../../../../contexts/global/hooks/useLoadingBar'
import { Breadcrumbs, Button, Container, Fab, IconButton, Link, Skeleton, Typography } from '@mui/material'
import { useStyles } from './styles'
import { Home,BurstModeSharp,Person2,DeleteOutlineOutlined, ArrowUpward } from '@mui/icons-material'

import { Editor } from 'react-draft-wysiwyg';
import { RawDraftContentState, EditorState, convertFromRaw, CompositeDecorator } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useAuthenticationStore } from '../../../../../states/authentication'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { CodeBlock, dracula } from "react-code-blocks";

import cusorUpwardImage from '../../../../../assets/images/scroll-up.png'

const CODE_BLOCK_INCLUSION_LANG_LIST:string[] = ['tsx','jsx','js','ts','kotlin','scala','kotlin','clojure','errlang','elixir'] // 'tsx' should be placed before 'ts', for proper assigning iteration otherwise it will interpret ***tsx openning wrapper with ***ts transpiler 

const MySwal = withReactContent(Swal)

const PreloadTypescriptBlock = ({language}:{language:string}) => {
  return (
  <div style={{display:'none'}}><CodeBlock language={language} showLineNumbers theme={dracula}/></div>
  )
}

const WrappedCodeBlockRenderer = ({code,language}:  {code:string,language:string}) => {

  return (
    <CodeBlock
    text={code}
    language={language}
    showLineNumbers
    theme={dracula}
  />
  )
}

export default function ViewWriteup() {
  const {writeupID} = useParams<{writeupID:string}>()


  const {data,error,isLoading} = useSWR<{data:{topic:string,cover_image_url:string,owner:any,content_data:string}}>(`/writeups/${writeupID}/detail`,AppCore.getAxiosAsFetcher())
  
  const [editorState, setEditorState] = useState(() =>
  EditorState.createEmpty())
  const loadingBar = useLoadingBar()
  const navigate = useNavigate()

  const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated)

  const {classes} = useStyles()

  useEffect(() => {
    if(isLoading) return loadingBar?.continuousStart()
    else loadingBar?.complete()
  }, [isLoading])

  useEffect(() => {
    if(data){
      let parsed = null;
      try {
        parsed = JSON.parse(data.data.content_data)
        console.log(parsed)
      } catch {
        // do nothings
      }
      const contentState = convertFromRaw(parsed ?? {blocks:[],entityMap:{}});
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);

      setTimeout(() => {
        // Array of language to be iterated
        // improving performance later . . .
        CODE_BLOCK_INCLUSION_LANG_LIST.forEach(async(lang)=> {
          while(true){
          const contentBlock = document.getElementById('content-section')
          const innerHTMLCodeSectionRegEx = new RegExp(`<span data-text="true">\\*\\*\\*${lang}(.*?)\\*\\*\\*<\\/span>`,'s')
          const match = innerHTMLCodeSectionRegEx.exec(contentBlock?.innerHTML!) // taking index 0 to include the opening tag
          const innerTextCodeSectionRegEx = new RegExp(`\\*\\*\\*${lang}(.*?)\\*\\*\\*`,'s')
          const match2 = innerTextCodeSectionRegEx.exec(contentBlock?.innerText!) // taing index 1 to omit the part lile '***'
          if(contentBlock && match && match2){
            const renderedStringFromJSX = ReactDOMServer.renderToString(<WrappedCodeBlockRenderer language={lang} code={match2![1].replace(/^\n+|\n+$/g, '')}/>)
            contentBlock.innerHTML = contentBlock.innerHTML.replace(match![0],renderedStringFromJSX)
          }else{
            break
          }
        }
        })
      }, 50); // some delay to await the hook setter first
    }
  },[data])

  function handleOnDeletePost(){
    Swal.fire({
      title: 'Do you want to remove this Writeup?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#FF0000'
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          await axiosDefaultInstance.delete(`/writeups/${writeupID}/delete`)
          Swal.fire({titleText:'Removed',icon:'success',showConfirmButton:false,timer:1500,willClose: () => {
            navigate('/')
          }}) 
          
        } catch {   
          Swal.fire('Problem occurs', '', 'error') 
        }
      }
    })
  }

  return (
    <Container maxWidth='lg'>
        <div style={{position:'sticky',top: 0,zIndex: 999999999,backgroundColor:'white'}}>
          <Breadcrumbs aria-label="breadcrumb">
                <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="/"
                >
                <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                Writeups
                </Link>
                <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href={`/writers/${data?.data.owner.username}`}
                >
                <Person2 sx={{ mr: 0.5 }} fontSize="inherit" />
                {data?.data.owner.username}
                </Link>
                <Typography
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="text.primary"
                    >
                    <BurstModeSharp sx={{ mr: 0.5 }} fontSize="inherit" />
                    {data?.data.topic}
                    {isAuthenticated ?                   <IconButton color="error" onClick={handleOnDeletePost} >
                      <DeleteOutlineOutlined />
                    </IconButton> : null}
                </Typography>
            </Breadcrumbs>
          <div className={classes.headerContainer}>
            {!isLoading ? <div onClick={() => {
              window.scrollTo({top:0,behavior:'smooth'})
            }} className={classes.coverImageContainer} style={{cursor:`url(${cusorUpwardImage}), auto`,backgroundImage:`url(${data?.data.cover_image_url ?? 'https://i.pinimg.com/originals/9a/de/dd/9adedde0c19cabfcdc4e0f1ccde19cb0.jpg'})`}}/> : <Skeleton sx={{ bgcolor: 'grey.400' }} variant='rectangular' width='100%' height='200px'/>}
            <Typography style={{textAlign:'center'}} fontFamily='monospace' mt='5px' variant='h4'>
                {data?.data.topic}
            </Typography>
          </div>
        </div>
        <div id="content-section" className={classes.writeupContainer}>
          <Editor editorState={editorState} readOnly toolbarHidden/>
        </div>      
        {CODE_BLOCK_INCLUSION_LANG_LIST.map((lang,index) => <PreloadTypescriptBlock key={`preload-${lang}-${index}`} language={lang}/>)}
    </Container>
  )
}