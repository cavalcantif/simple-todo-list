import React from 'react';
import { ListGroupItem } from 'reactstrap';

function Task (props) {
    return (
        <ListGroupItem taskid={props.task.id}>{props.task.description}</ListGroupItem>
    )
}

export default Task;
