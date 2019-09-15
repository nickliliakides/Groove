import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

const CollapseRadio = props => {

  const [state, setState] = useState({
    open: false,
    value: '0'
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

    const handleChange = e => {
      props.handleFilters(e.target.value)
      setState({
        ...state,
        value: e.target.value
      })
    }

    const renderList = () => (
      props.list &&
        props.list.map(item => (
          <FormControlLabel
            key={item._id}
            value={`${item._id}`}
            control={<Radio/>}
            label={item.name}
          />
        ))
    )

  return (
    <div>
      <List style={{ borderBottom: '1px solid #dbdbdb' }}>
        <ListItem onClick={handleClick} style={{ padding: '10px 23px 10px 0' }}>
          <ListItemText primary={props.title} className="collapse_title" />
          {handleCollapseIcon()}
        </ListItem>
        <Collapse in={state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <RadioGroup
              aria-label="prices"
              name="prices"
              value={state.value}
              onChange={handleChange}
            >
              {renderList()}
            </RadioGroup>
          </List>
        </Collapse>
      </List>
    </div>
  )
}

export default CollapseRadio
