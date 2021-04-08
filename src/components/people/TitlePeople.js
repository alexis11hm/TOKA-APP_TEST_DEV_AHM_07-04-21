import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export const TitlePeople = ({children}) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
}

TitlePeople.propTypes = {
  children: PropTypes.node,
};