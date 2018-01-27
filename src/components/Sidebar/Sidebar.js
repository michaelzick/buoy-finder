import React from 'react';
import classes from './Sidebar.css';
import SidebarInfo from './SidebarInfo/SidebarInfo';

const sidebar = (props) => {
  let favElements = '',
      clearBtn = '';

  if (props.favs.length) {
    favElements = [];
    clearBtn = <button onClick={props.clearFavs}>Clear All Favorites</button>;

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
  } else {
    favElements = <h2>You don't have any favorites. Click a map marker and add one.</h2>;
  }

  return (
    <div className={classes.sidebar}>
      {clearBtn}
      {favElements}
    </div>
  );
};

export default sidebar;
