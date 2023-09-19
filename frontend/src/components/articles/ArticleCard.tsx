import React from 'react'
import {Container, Grid, Typography,Link,Card,CardActions,CardMedia,CardContent} from '@mui/material'

export default function ArticleCard() {
  return (
    <Card raised sx={{ maxWidth: 345,cursor:'pointer' }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/1200px-FullMoon2010.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Exploring tss-react
        </Typography>
        <Typography variant="body2" color="text.secondary">
            I just got back into programming world and so many things have come around while I was on the honeymoon period . . .
        </Typography>
      </CardContent>
    </Card>
  );
}
