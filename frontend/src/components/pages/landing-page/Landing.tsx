import React from 'react'
import { makeStyles, withStyles } from "tss-react/mui";
import {Container, Grid, Typography,Link,Card,CardActions,CardMedia,CardContent, Button} from '@mui/material'
import {Instagram,Facebook, KeyOutlined} from '@mui/icons-material'
import githubProfile from '../../../assets/images/github-profile.png'
import ArticleCard from '../../articles/ArticleCard';

export default function Landing() {
    const {cx,classes} = useStyles()

  return (
    <Container maxWidth={false} className={classes.container}>
        <Link href="master-verification" underline="none">
            <Button className={classes.authenticateNavigation} variant="outlined" startIcon={<KeyOutlined/>}>
                You are me?
            </Button>
        </Link>
        <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
            <Grid item xs={12}>
                <img src={githubProfile} alt="github-profile" className={classes.profileImage}/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Thiti-Dev </Typography>
            </Grid>
            <Grid item xs={12}>
                <div className={classes.socialLinkContainerRoot}>
                    <div className={classes.socialLinkContainer}>
                        <Instagram fontSize='large'/>
                        <Link href="https://www.instagram.com/thiti.mwk">thiti.mwk</Link>
                    </div>

                    <div className={classes.socialLinkContainer}>
                        <Facebook fontSize='large'/>
                        <Link href="https://www.facebook.com/thiti.dev.5">Thiti-Dev</Link>
                    </div>
                </div>
            </Grid>
            <div className={classes.underline}/>
        </Grid>
        <div className={classes.contentGridContainerHolder}>
            <div className={classes.mainGrid}>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>

            </div>
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
            float:'right'
        }
    })
);