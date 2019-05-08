import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = theme => ({
  card: {
    maxWidth: 550,
    margin: 10
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  render() {
    const { classes } = this.props;
    const { title, url, walkscore, size, reviews, rating, image, city} = this.props.listing;
    console.log(title);
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Walkscore" className={classes.avatar}>
              {walkscore}
            </Avatar>
          }
          title={title}
          subheader={city}
        />
        <CardMedia
          className={classes.media}
          image={image}
          title="Listing Image"
        />
        <CardContent>
          <Typography component="p">
            {rating} out of 5 stars based on {reviews} reviews
            {size.map(metric => <div>{metric}</div>)}
            $99/night
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(Listing);