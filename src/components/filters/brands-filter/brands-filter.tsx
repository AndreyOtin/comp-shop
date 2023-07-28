import Button from 'common-ui/button/button';
import React from 'react';

function BrandsFilter() {
  return (
    <form action="">
      <h3>Brands</h3>
      <Button variant="grey">Reset all</Button>
      <div className="group">
        <input type="checkbox" id="1" />
        <label htmlFor="1">Desktops</label>
        <span className="count">33</span>
      </div>
    </form>
  );
}

export default BrandsFilter;
