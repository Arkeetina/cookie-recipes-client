import React, {Component} from 'react'; 

const BrowseRecipeButton = () => {
    return (
      <div className="d-md-none">
        <button type="button" className="btn btn-primary buttons" data-toggle="offcanvas">
          Browse Recipe
        </button>
      </div>
    )
}

export default BrowseRecipeButton;
