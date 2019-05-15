import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  card: {
    maxWidth: 550,
    margin: 10,
    backgroundColor: '#F8F8F8'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  }
});

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      raised: false,
      shade: 0
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
  /* Generates a color along a blue/red spectrum:
  dark blue for good walkscores, dark red for bad walkscores. */
  generateColor = (walkscore) => {
    if (walkscore > 50) {
      const shade = Math.round((((walkscore - 50) / 50 * 700) + 200 ) / 100) * 100;
      return blue[shade];
    }
    const shade = Math.round((900 - (walkscore / 50 * 700 )) / 100) * 100;
    return red[shade];
  }

  render() {
    const { classes } = this.props;
    const { title, url, walkscore, size, reviews, rating, image, city, price } = this.props.listing;
    return (
      <Card className={classes.card} raised={this.state.raised} onMouseOver={this.mouseOver} onMouseLeave={this.mouseLeave}>
        <CardHeader
          avatar={
            <Avatar aria-label="Walkscore" style={{backgroundColor: this.generateColor(walkscore)}}>
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