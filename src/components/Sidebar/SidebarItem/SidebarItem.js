import React from 'react';
import classes from './SidebarItem.css';

const sidebarItem = (props) => {
    const favDataRaw = JSON.parse(props.favData),
          favData = favDataRaw[props.id];

    return (
      <div className={classes.sidebarItem}>
        <div>
          <div className={classes.sidebarName}>{favData.name}</div>
          <div className={classes.deleteFav} onClick={() => props.deleteFav(props.id)}>Remove</div>
        </div>
        <div
          dangerouslySetInnerHTML={{__html: favData.description}}
          className={classes.sidebarDescription}></div>
      </div>
    );
};

export default sidebarItem;
