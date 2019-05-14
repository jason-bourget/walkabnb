import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import AutoSuggest from './AutoSuggest.jsx';


const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }
});

class Title extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar style={{ position: "fixed", backgroundColor: blue[900]}}>
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              walkabnb
            </Typography>
            <AutoSuggest cities={this.props.cities} getListings={this.props.getListings}/>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Title);