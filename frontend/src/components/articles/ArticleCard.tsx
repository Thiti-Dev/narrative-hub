import React, { useEffect } from 'react'
import {Container, Grid, Typography,Link,Card,CardActions,CardMedia,CardContent} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import type {RawDraftContentState} from 'draft-js'

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

  let trimHeader = rawContentData

  if(rawContentData.length > 108){
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
    } catch {
      // recieved the invalid content data
      trimHeader = "Invalid content information"
    }
  }
  return (
    <Card className={elevateOnHover ? classes.cardStyle : undefined} raised sx={{ maxWidth: 345, height: '300px',cursor:'pointer' }} onClick={() => navigate(`/writeups/${id}`)}>
      <CardMedia
        sx={{ height: 140 }}
        image={coverImageURL ?? "https://i.pinimg.com/originals/9a/de/dd/9adedde0c19cabfcdc4e0f1ccde19cb0.jpg"}
        title={topic}
      />
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