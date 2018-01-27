import React from 'react';

const sidebarInfo = (props) => {
    const favDataRaw = JSON.parse(props.favData),
          favData = favDataRaw[props.id],
          name = props.favData.name,
          description = favData.description;

    return (
      <div>
        <div>{name}</div>
        <div>{description}</div>
      </div>
    );
};

export default sidebarInfo;
