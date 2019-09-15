import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

const CollapseCheckbox = props => {
  const [state, setState] = useState({
    open: false,
    checked: []
  });

  useEffect(() => {
    if (props.initState) {
      setState({
        ...state,
        open: props.initState
      });
    }
  }, []);

  const handleClick = () => {
    setState({
      ...state,
      open: !state.open
    });
  };

  const handleCollapseIcon = () =>
    state.open ? (
      <ListItemSecondaryAction style={{marginRight: '5px'}}>
        <FontAwesomeIcon icon={faAngleUp} className="icon" />
      </ListItemSecondaryAction>
    ) : (
      <ListItemSecondaryAction style={{marginRight: '5px'}}>
        <FontAwesomeIcon icon={faAngleDown} className="icon" />
      </ListItemSecondaryAction>
    );

  const renderList = () =>
    props.list &&
    props.list.map(item => (
      <ListItem key={item._id} style={{ padding: '10px 0' }}>
        <ListItemText primary={item.name} />
        <ListItemSecondaryAction>
          <Checkbox
            edge="end"
            color="primary"
            onChange={handleToggle(item._id)}
            checked={state.checked.indexOf(item._id) !== -1}
          />
        </ListItemSecondaryAction>
      </ListItem>
    ));

  const handleToggle = item => () => {
    const { checked } = state;
    const currentIndex = checked.indexOf(item);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setState({
      ...state,
      checked: newChecked
    });

    props.handleFilters(newChecked);
  };

  return (
    <div className="collapse_items_wraper">
      <List style={{ borderBottom: '1px solid #dbdbdb' }}>
        <ListItem onClick={handleClick} style={{ padding: '10px 23px 10px 0' }}>
          <ListItemText primary={props.title} className="collapse_title" />
          {handleCollapseIcon()}
        </ListItem>
        <Collapse in={state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {renderList()}
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default CollapseCheckbox;
