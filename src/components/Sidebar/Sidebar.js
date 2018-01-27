import React from 'react';
import classes from './Sidebar.css';
import SidebarInfo from './SidebarInfo/SidebarInfo';

const sidebar = (props) => {
  let favElements = '';

  if (props.favs) {
    favElements = [];

    for (let fav in props.favs) {
      if (props.favs.hasOwnProperty(fav) && fav !== 'favs') {
        favElements.push(
          <SidebarInfo
            key={fav}
            id={fav}
            favData={props.favs[fav]} />
        );
      }
    }
  }

  return (
    <div className={classes.sidebar}>
      <button onClick={props.clearFavs}>Clear All Favorites</button>
      {favElements}
    </div>
  );
};

export default sidebar;
