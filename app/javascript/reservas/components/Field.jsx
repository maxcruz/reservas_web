import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  
});

class Field extends React.Component {

    render() {

        const { classes } = this.props;

        return (
          <React.Fragment>
            <CssBaseline />

          </React.Fragment>
        );
    }
}

Field.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Field);
