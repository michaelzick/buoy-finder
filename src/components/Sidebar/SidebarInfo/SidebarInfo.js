import React from 'react';

const sidebarInfo = (props) => {
    let name,
        location;

    if (props.info) {
      name = props.info.name;
      location = props.info.snippet.split('Location: ')[1];
    }

    return (
      <div>
        <div>{name}</div>
        <div>{location}</div>
      </div>
    );
};

export default sidebarInfo;
