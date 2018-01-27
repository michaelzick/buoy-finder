import React from 'react';
import classes from './InfoWindow.css';

const infoWindow = (props) => {
  return (
    <div>
      <div className={classes.favBarText}>Add to favorites</div>
      <button className={classes.favBarPlus} onClick={props.addFav(props.data)}>+</button>
      <div className={classes.clearDiv}></div>
      <div dangerouslySetInnerHTML={{__html: props.data.infoWindowHtml}}></div>
    </div>
  );
};

export default infoWindow;
