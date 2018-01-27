import React from 'react';
import classes from './InfoWindow.css';

const infoWindow = (props) => {
  return (
    <div>
      <div className={classes.favBarText}>Add to favorites</div>
      <button className={classes.favBarPlus} onClick={props.addFav(props.element.featureData)}>+</button>
      <div className={classes.clearDiv}></div>
      <div dangerouslySetInnerHTML={{__html: props.data.infoWindowHtml}}></div>
    </div>
  );
};

export default infoWindow;




// const newData = {...e.featureData}, // Copy the feature data first
//           infoWinDiv = document.createElement('div'),
//           clearDiv = document.createElement('div'),
//           favBarDiv = document.createElement('div'),
//           favBarPlusDiv = document.createElement('div'),
//           favBarTextDiv = document.createElement('div'),
//           favBarText = document.createTextNode('Add to favorites'),
//           favBarPlus = document.createTextNode('+');

//       // Div to clear floats (utility);
//       clearDiv.classList.add(classes.clearDiv);

//       favBarTextDiv.appendChild(favBarText); // Add the text to the span element
//       favBarPlusDiv.appendChild(favBarPlus); // Add the '+' to the div element

//       // Adds classes to the elements
//       favBarTextDiv.classList.add(classes.favBarText);
//       favBarPlusDiv.classList.add(classes.favBarPlus);

//       // Clicking '+' updates state and adds to favs
//       favBarPlusDiv.addEventListener('click', () => {
//         this.addToFavs(newData);
//       });

//       favBarDiv.appendChild(favBarTextDiv); // Add the text to the parent div
//       favBarDiv.appendChild(favBarPlusDiv); // Add the '+' to the parent div
//       favBarDiv.appendChild(clearDiv); // Add the clearDiv to the parent div

//       infoWinDiv.appendChild(favBarDiv);

//       infoWinDiv.insertAdjacentHTML('beforeend', e.featureData.infoWindowHtml);

//       // Add custom html to the infoWindow
//       newData.infoWindowHtml = infoWinDiv;