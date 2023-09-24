import React, { useEffect } from 'react'
import {Container, Grid, Typography,Link,Card,CardActions,CardMedia,CardContent} from '@mui/material'

type TProps = {
  topic:string,
  header: string,
  coverImageURL:string
}

const ArticleCard = React.memo(({header,topic,coverImageURL}: TProps) => {
  let trimHeader = header
  if(header.length > 108){
    trimHeader = header.substring(0,108) + " . . ."
  }
  return (
    <Card raised sx={{ maxWidth: 345, height: '300px',cursor:'pointer' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={coverImageURL ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/1200px-FullMoon2010.jpg"}
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