import React from 'react';
import PropTypes from 'prop-types';

export default function NavbarMenu(props) {

  let menuItems = [];
  var menuRight = props.menus[props.menuName];
	for (var i in menuRight){
      const href = menuRight[i].values[0].href;
			const innerHTML = menuRight[i].values[0].value;
      let children = "";
      if (menuRight[i].children != null) {
        //  menuItems.push(<ul className="sub"/>);
          children = addSubMenu(menuRight[i].children);
      }
      menuItems.push(<li key={menuRight[i].menuId}><a id={menuRight[i].code} className="page-scroll" href={'#' + menuRight[i].code} onClick={props.navClick}>{innerHTML}</a>{children}</li>);

	}

  return (
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            {menuItems}
          </ul>
      </div>
  );
}

function addSubMenu(child){
}

NavbarMenu.propTypes = {
  menuName: PropTypes.string.isRequired,
	menus: PropTypes.object.isRequired,
	navClick: PropTypes.func.isRequired
};
