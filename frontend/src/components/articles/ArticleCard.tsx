import React, { useEffect, useState } from 'react'
import {Container, Grid, Typography,Link,Card,CardActions,CardMedia,CardContent, Skeleton} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import type {RawDraftContentState} from 'draft-js'
import { useInView } from 'react-intersection-observer'

type TProps = {
  topic:string,
  rawContentData: string,
  coverImageURL:string
  id:number
  elevateOnHover?: boolean
}

const ArticleCard = React.memo(({rawContentData,topic,coverImageURL,id,elevateOnHover = false}: TProps) => {
  const navigate = useNavigate()
  const {classes} = useStyles()

  const [isLoaded, setIsLoaded] = useState(false);
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true, // Only trigger the observer once
    threshold: 0.1,    // When at least 10% of the element is visible
  });

  let trimHeader = rawContentData

  if(rawContentData){
    try {
      const contentData: RawDraftContentState = JSON.parse(rawContentData)
      let accumulatedText: string = ""
      for(const block of contentData.blocks){
        if(accumulatedText.length > 108) break;
        if(block.text){
          accumulatedText+=block.text+" "
        }
      }

      //post-check if it got accumulated and having exceeding char counts
      if(accumulatedText.length > 108){
        trimHeader = accumulatedText.substring(0,108) + ". . ."
      }
      trimHeader = accumulatedText
    } catch {
      // recieved the invalid content data
      trimHeader = "Invalid content information"
    }
  }
  return (
    <Card className={elevateOnHover ? classes.cardStyle : undefined} raised sx={{ maxWidth: 345, height: '300px',cursor:'pointer' }} onClick={() => navigate(`/writeups/${id}`)}>
      <CardMedia
        ref={headerRef}
        sx={{ height: 140 }}
        image={isLoaded ? coverImageURL ?? "https://i.pinimg.com/originals/9a/de/dd/9adedde0c19cabfcdc4e0f1ccde19cb0.jpg" : undefined}
        title={topic}
      >
        {(!isLoaded && headerInView) && <Skeleton sx={{ bgcolor: 'grey.400',zIndex:99999999999 }} variant='rectangular' width='100%' height='100%'/>}
        {!isLoaded && headerInView && (
                  <img
                    src={coverImageURL}
                    alt="Background"
                    onLoad={() => {
                      setIsLoaded(true)
                    }}
                    style={{ display: 'none' }} // Hide the image element
                  />
        )}
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {topic}
        </Typography>
        <Typography sx={{height:'60px',overflow:'hidden'}} variant="body2" color="text.secondary">
            {trimHeader}
        </Typography>
      </CardContent>
    </Card>
  );
})

export const useStyles = makeStyles()(
  (theme) => ({
      cardStyle:{
        transition: 'transform 250ms',
        ':hover':{
          transform: 'translateY(-10px)'
        }
      }
  })
)

export default ArticleCard