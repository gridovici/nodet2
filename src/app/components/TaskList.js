import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const TaskList = ({ tasks, name }) => (
    <div>
      <h3>{name}</h3>
      <div>
          {tasks.map(task => (
              <div key={task.id}>{task.name}</div>
          ))}
      </div>
    </div>
);

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  // id: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.id,
    name: ownProps.name,
    tasks: state.tasks.filter(task => task.group === ownProps.id)
  };
}

export default connect(mapStateToProps)(TaskList);
