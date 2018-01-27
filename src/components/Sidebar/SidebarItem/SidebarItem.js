import React from 'react';
import classes from './SidebarItem.css';

const sidebarItem = (props) => {
    const favDataRaw = JSON.parse(props.favData),
          favData = favDataRaw[props.id];

    return (
      <div className={classes.sidebarItem}>
        <div className={classes.sidebarName}>{favData.name}</div>
        <div dangerouslySetInnerHTML={{__html: favData.description}}></div>
      </div>
    );
};

export default sidebarItem;
