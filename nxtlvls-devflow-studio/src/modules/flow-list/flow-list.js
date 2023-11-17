import React, {useState, useEffect, useRef} from 'react';
import { ControlledMenu, MenuItem, useHover } from '@szhsin/react-menu';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {fetchFlows, loadFlow, selectFlow, selectFlows} from "../../flowSlice";

const FlowList = () => {
  const flows = useSelector(selectFlows);
  const dispatch = useDispatch();

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const { anchorProps, hoverProps } = useHover(isOpen, setOpen);

  useEffect(() => {
    dispatch(fetchFlows());
    dispatch(loadFlow(localStorage.getItem('lastSelectedFlow')));
  }, [dispatch]);

  const loadFlowDispatch = (flowName) => {
    dispatch(loadFlow(flowName));
    localStorage.setItem('lastSelectedFlow', flowName);
  }
   return (
    <>
      <NavLink
        to="/"
        activeclassname="active"
        className="no-underline"
      >
        {' '}
        <h2 className="menu-item" ref={ref} {...anchorProps}>
          Flows
        </h2>
      </NavLink>

      <ControlledMenu
        {...hoverProps}
        state={isOpen ? 'open' : 'closed'}
        anchorRef={ref}
        onClose={() => setOpen(false)}
      >
         {flows.map((flow, index) => (
          <MenuItem  onClick={() => loadFlowDispatch(flow)}>{flow}</MenuItem>
        ))}
      </ControlledMenu>
    </>
  );
};

export default FlowList;
