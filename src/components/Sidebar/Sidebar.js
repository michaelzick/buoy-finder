import React from 'react';
import classes from './Sidebar.css';
import SidebarInfo from './SidebarInfo/SidebarInfo';

const sidebar = (props) => {
  const isClosed = props.closed ? 'closed' : 'open',
        classNames = [classes[isClosed], classes.sidebar].join(' ');

  return (
    <div className={classNames} id='sidebar'>
      <SidebarInfo info={props.info}/>
    </div>
  );
};

export default sidebar;
