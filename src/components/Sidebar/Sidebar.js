import React from 'react';
import classes from './Sidebar.css';
import SidebarInfo from './SidebarInfo/SidebarInfo';

const sidebar = (props) => {
  return (
    <div className={classes.sidebar}>
      <SidebarInfo info={props.info}/>
    </div>
  );
};

export default sidebar;
