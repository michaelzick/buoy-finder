import React from 'react';
import classes from './Sidebar.css';
import SidebarInfo from './SidebarInfo/SidebarInfo';

const sidebar = (props) => {
  let favElements = '';

  if (props.favs) {
    favElements = [];

    for (let fav in props.favs) {
      if (props.favs.hasOwnProperty(fav)) {
        favElements.push(<SidebarInfo key={fav} favData={props.favs[fav]} />);
      }
    }
  }

  return (
    <div className={classes.sidebar}>
      {favElements}
    </div>
  );
};

export default sidebar;
