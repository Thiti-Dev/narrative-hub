import React, { ChangeEvent, useEffect, useState } from 'react'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Breadcrumbs, Button, Container, Input, Link, Typography } from '@mui/material';
import {Home,Grain} from '@mui/icons-material'
import { useStyles } from './styles';
import { axiosDefaultInstance } from '../../../../../core/app-core';
import { useLoadingBar } from '../../../../../contexts/global/hooks/useLoadingBar';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function CreatePost() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [topicName,setTopicName] = useState<string>('')
    const [localizedErrors, setLocalizedErrors] = useState<{topic?: string,coverImage?:string}>({})
    const loadingBar = useLoadingBar()
    const navigate = useNavigate();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const {classes} = useStyles()

    useCreateLocalizedErrorClearupWatcherHook(topicName,'topic')
    useCreateLocalizedErrorClearupWatcherHook(selectedFile,'coverImage')

    function useCreateLocalizedErrorClearupWatcherHook(value:any,key: 'topic' | 'coverImage'){
        useEffect(() => {
            if(value && localizedErrors[key]){
                setLocalizedErrors((prevState) => {
                    delete prevState[key]
                    return prevState
                })
            }
        }, [value])
        return null
    }

    async function onCreatingPost(){
        setLocalizedErrors({}) // clear any existing errors
        // manual validation


        if(!topicName) return setLocalizedErrors((prevState) => ({...prevState,topic:'* Please enter topic name'}))
        if(!selectedFile) return setLocalizedErrors((prevState) => ({...prevState,coverImage:'* Please select cover image'}))
        // ------------------
        loadingBar?.continuousStart()

        const contentState = editorState.getCurrentContent()
        const rawContentState = convertToRaw(contentState)
        const stringifiedContent = JSON.stringify(rawContentState)

        const formData = new FormData()
        formData.set("topic", topicName)
        formData.set("content_data", stringifiedContent)
        formData.append("file",selectedFile as File)

        try {
            const writeupCreation = await axiosDefaultInstance.post('/writeups/create',formData)
            navigate('/')
        } catch {
            MySwal.fire({
                icon:'error',
                title: 'Oops...',
                text: 'Something went wrong'
            })
        } finally{
            loadingBar?.complete()
        }
    }

    function handleCoverImageChange(event: ChangeEvent<HTMLInputElement>){
        const file = event.target.files && event.target.files[0];
        setSelectedFile(file || null);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              const preview = reader.result as string;
              setPreviewUrl(preview);
            };
            reader.readAsDataURL(file);
          } else {
            setPreviewUrl(null);
          }
    }

    return (
        <Container maxWidth='xl'>
            <Breadcrumbs sx={{marginTop:'10px'}} aria-label="breadcrumb">
                <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="/"
                >
                <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                Writeups
                </Link>

                <Typography
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="text.primary"
                    >
                    <Grain sx={{ mr: 0.5 }} fontSize="inherit" />
                    Create Writeup
                </Typography>
            </Breadcrumbs>
            <Typography color='MenuText' display='inline'>* Topic name: </Typography><Input type='text' error={!!localizedErrors.topic} value={topicName} placeholder='Enter topic name' onChange={(e) => setTopicName(e.currentTarget.value)}/> {!!localizedErrors.topic ? <Typography color='red' display='inline'>{localizedErrors.topic}</Typography> : null}
            <br/>
            <Typography color='MenuText' display='inline'>* Select cover image: </Typography><Input type='file' error={!!localizedErrors.coverImage} inputProps={{accept:'image/*'}} placeholder='cover image' onChange={handleCoverImageChange} /> {!!localizedErrors.coverImage ? <Typography color='red' display='inline'>{localizedErrors.coverImage}</Typography> : null}
            <br/>
            {previewUrl ? <img src={previewUrl} width='450px' height='200px'/>: null}

            <div className={classes.editorContainer}>
                <div className={classes.editorInnerContainer}>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        editorStyle={{height:'800px'}}
                    />
                </div>
            </div>
            <div className={classes.actionContainer}>
                <Button tabIndex={-1} fullWidth onClick={onCreatingPost} size='large' variant="outlined">Post</Button>
                <Button tabIndex={-1} fullWidth color='error' size='large' variant="outlined">Go back</Button>
            </div>
        </Container>
    )
}
