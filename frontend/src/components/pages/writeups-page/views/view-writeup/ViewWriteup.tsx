import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import useSWR from 'swr'
import { AppCore, axiosDefaultInstance } from '../../../../../core/app-core'
import { useLoadingBar } from '../../../../../contexts/global/hooks/useLoadingBar'
import { Breadcrumbs, Container, IconButton, Link, Skeleton, Typography } from '@mui/material'
import { useStyles } from './styles'
import { Home,BurstModeSharp,Person2,DeleteOutlineOutlined } from '@mui/icons-material'

import { Editor } from 'react-draft-wysiwyg';
import { RawDraftContentState, EditorState, convertFromRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useAuthenticationStore } from '../../../../../states/authentication'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


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
      } catch {
        // do nothings
      }
      const contentState = convertFromRaw(parsed ?? {blocks:[],entityMap:{}});
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
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
          {!isLoading ? <div className={classes.coverImageContainer} style={{backgroundImage:`url(${data?.data.cover_image_url ?? 'https://i.pinimg.com/originals/9a/de/dd/9adedde0c19cabfcdc4e0f1ccde19cb0.jpg'})`}}/> : <Skeleton sx={{ bgcolor: 'grey.400' }} variant='rectangular' width='100%' height='200px'/>}
          <Typography fontFamily='monospace' mt='5px' variant='h4'>
              {data?.data.topic}
          </Typography>
        </div>
        <div className={classes.writeupContainer}>
          <Editor editorState={editorState} readOnly toolbarHidden/>
        </div>
    </Container>
  )
}