import React from 'react';

const sidebarInfo = (props) => {
    let name,
        location;

    if (props.info) {
        props.info.map(info => {
            name = info.name;
            location = info.snippet.split('Location: ')[1];
        });
    }

    return (
      <div>
        <div>{name}</div>
        <div>{location}</div>
      </div>
    );
};

export default sidebarInfo;
