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
import blue from '@material-ui/core/colors/blue';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  card: {
    maxWidth: 550,
    margin: 10,
    backgroundColor: '#F8F8F8'
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
  }
});

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      raised: false
    }
  }

  mouseOver = () => {
    this.setState({raised: true});
  }

  mouseLeave = () => {
    this.setState({raised: false});
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  render() {
    const { classes } = this.props;
    const { title, url, walkscore, size, reviews, rating, image, city, price } = this.props.listing;
    return (
      <Card className={classes.card} raised={this.state.raised} onMouseOver={this.mouseOver} onMouseLeave={this.mouseLeave}>
        <CardHeader
          avatar={
            <Avatar aria-label="Walkscore" className={classes.avatar}>
              {walkscore}
            </Avatar>
          }
          title={title}
          subheader={city}
        />
        <a href={url} target="_blank">
          <CardMedia
            className={classes.media}
            image={image}
            title="Listing Image"
          />
        </a>
        <CardContent style={{backgroundColor: blue[500]}}>
          <Grid container justify="space-evenly">
            {size.map(value => (
              <Grid key={value} item>
                <Typography component="div" variant="subtitle2" style={{color: 'white'}}>
                  {value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <CardContent style={{paddingBottom: '16px', backgroundColor: '#F8F8F8'}}>
          <Grid container justify="space-evenly">
          <Grid item>
              <Typography component="div" variant="subtitle2">
                ${price}/night
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="div" variant="subtitle2">
                Rating: {rating}/5
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="div" variant="subtitle2">
                {reviews} reviews
              </Typography>
            </Grid>
          </Grid>
          </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Listing);