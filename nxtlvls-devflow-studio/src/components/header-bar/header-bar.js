import FlowList from '../../modules/flow-list/flow-list';
import { NavLink } from 'react-router-dom';

const HeaderBar = () => {
  const HoverMenu = () => {
    return (
      <>
        <NavLink
          to="/terminal"
          activeclassname="active"
          className="no-underline"
        >
          {' '}
          <h2 className="menu-item">Terminal</h2>
        </NavLink>
      </>
    );
  };

  return (
    <div className="menu-wrapper">
      <HoverMenu></HoverMenu>
      <FlowList></FlowList>
    </div>
  );
};

export default HeaderBar;
