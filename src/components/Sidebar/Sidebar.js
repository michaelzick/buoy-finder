import React from 'react';
import './Sidebar.css';
import SidebarInfo from './SidebarInfo/SidebarInfo';

const sidebar = (props) => {
    return (
        <div id='sidebar'>
            <SidebarInfo info={props.info}/>
        </div>
    );
};

export default sidebar;
