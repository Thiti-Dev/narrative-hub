import React, { useEffect, useMemo, useRef } from 'react'
import { makeStyles, withStyles } from "tss-react/mui";
import {Container, Grid, Typography,Link,Card,CardActions,CardMedia,CardContent, Button} from '@mui/material'
import {Instagram,Facebook, KeyOutlined,Add,GitHub} from '@mui/icons-material'
import githubProfile from '../../../assets/images/github-profile.png'
import ArticleCard from '../../articles/ArticleCard';
import useSWRImmutable from 'swr/immutable'
import { AppCore } from '../../../core/app-core';
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuthenticationStore } from '../../../states/authentication';
import { useLoadingBar } from '../../../contexts/global/hooks/useLoadingBar';
import { mutate } from 'swr';


export default function Landing() {
    const {cx,classes} = useStyles()
    const {data,error,isLoading,isValidating} = useSWRImmutable('/writeups/list',AppCore.getAxiosAsFetcher())
    const loadingBar = useLoadingBar()
    const location = useLocation();
    const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated)

    useEffect(() => {
        // for forcing to refetch the data when just redirected from another page using stack pushing
        if(!location.state) return
        if(((location.state) as {dataRefetchNeeded?:boolean}).dataRefetchNeeded){
            mutate('/writeups/list')
        }
    },[location.pathname])

    useEffect(() => {
        if(isLoading) return loadingBar?.continuousStart()
        return loadingBar?.complete()
    },[isLoading])

    const renderedArticles = useMemo(() => {
        if(!data?.data) return null
        return data.data.map((data:any,index:number) => <ArticleCard key={index}  elevateOnHover id={data.id}  topic={data.topic} rawContentData={data.content_data} coverImageURL={data.cover_image_url}/>)
    },[data]) 
    
    return (
        <Container maxWidth={false} className={classes.container}>
            {!isAuthenticated ? <Link href="master-verification" underline="none">
                <Button className={classes.authenticateNavigation} variant="outlined" startIcon={<KeyOutlined/>}>
                    You are me?
                </Button>
            </Link> : <Link href="create-post" underline="none">
                <Button className={classes.authenticateNavigation} variant="contained" startIcon={<Add/>}>
                    Create write up
                </Button>
            </Link>}
            <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
                <Grid item xs={12}>
                    <img src={githubProfile} alt="github-profile" className={classes.profileImage}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Thiti-Dev</Typography>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.socialLinkContainerRoot}>
                        <div className={classes.socialLinkContainer}>
                            <Instagram fontSize='large'/>
                            <Link href="https://www.instagram.com/thiti.mwk" underline='hover'>_thiti.mwk</Link>
                        </div>

                        <div className={classes.socialLinkContainer}>
                            <Facebook fontSize='large'/>
                            <Link href="https://www.facebook.com/thiti.dev.5" underline='hover'>Thiti-Dev</Link>
                        </div>

                        <div className={classes.socialLinkContainer}>
                            <GitHub fontSize='large'/>
                            <Link href="https://github.com/Thiti-Dev" underline='hover'>Thiti-Dev</Link>
                        </div>
                    </div>
                </Grid>
                <div className={classes.underline}/>
            </Grid>
            <div className={classes.contentGridContainerHolder}>
                {!isLoading && !data.data?.length ?
                    <div className={classes.noContentBox}>
                        <Typography variant='h5'>No content created from this creator . . . 😭</Typography>
                    </div>
                :   
                <div className={classes.mainGrid}>
                    {renderedArticles}
                </div>}
            </div>
        </Container>
  )
}

const useStyles = makeStyles()(
    (theme) => ({
        container:{
        },
        profileImage:{
            borderRadius: "50%"
        },
        socialLinkContainerRoot:{
            alignItems: 'center',
            display:'flex',
        },
        socialLinkContainer:{
            alignItems: 'center',
            display:'flex',
            margin: 5
        },
        underline:{
            backgroundColor:'red',
            width: '80%',
            height: '20px',
            background: 'linear-gradient(to right, grey 0%, grey 100%)',
            backgroundPosition: 'bottom',
            backgroundSize: '100% 1px',
            backgroundRepeat: 'no-repeat',
            marginBottom: '25px'

        },
        contentGridContainer:{
            [theme.breakpoints.down('lg')]:{

            },
            [theme.breakpoints.up('lg')]:{
                width:'75%',
            },            
            justifyContent:'center',
            cursor:'pointer'
        },
        contentGridContainerHolder:{
            display: 'flex',
            justifyContent:'center'
        },
        mainGrid:{
            display:'grid',
            width:'75%',
            gridTemplateColumns:'repeat(auto-fill, 365px)', // for dynamic margining on wrap process use minmax(365px, 1fr) instead of pure {value}px
            rowGap: '20px',
            //columnGap:'10px',
            justifyContent:'center' // centering in grid when grid doesn't have any element to fill up the grid and left desolated also came from dimnishing the screen size
        },
        authenticateNavigation:{
            float:'right',
            marginTop:'10px'
        },
        noContentBox:{

        }
    })
);