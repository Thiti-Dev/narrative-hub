import React, { useEffect } from 'react'
import {Container, Grid, Typography,Link,Card,CardActions,CardMedia,CardContent} from '@mui/material'
import { useNavigate } from 'react-router-dom'

type TProps = {
  topic:string,
  header: string,
  coverImageURL:string
  id:number
}

const ArticleCard = React.memo(({header,topic,coverImageURL,id}: TProps) => {

  const navigate = useNavigate()

  let trimHeader = header
  if(header.length > 108){
    trimHeader = header.substring(0,108) + " . . ."
  }
  return (
    <Card raised sx={{ maxWidth: 345, height: '300px',cursor:'pointer' }} onClick={() => navigate(`/writeups/${id}`)}>
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

export default ArticleCard