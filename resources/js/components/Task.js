import React, { useEffect, useState } from 'react';
import { Row, Col, Button, ListGroupItem } from 'reactstrap';

/**
 * Task component to show task informations and features
 */
function Task (props) {
    // constants
    const CHECKED_ICON = 'far fa-check-square';
    const UNCHECKED_ICON = 'far fa-square';

    // state definitions
    const [isDone, setIsDone] = useState(props.task.is_done);

    // configures the color of the listgroup item
    let color = props.task && props.task.is_done ? 'success' : 'info';
    let icon = props.task && props.task.is_done ? CHECKED_ICON : UNCHECKED_ICON;

    // events handlers
    /**
     * changes the is_done task attribute and calls the onCompletionChange
     * parent callback function
     * @param {eventArgs} e
     */
    function changeTaskCompletion (e) {
        let task = props.task;

        task.is_done = !task.is_done;

        if (typeof props.onCompletionChange == 'function') {
            props.onCompletionChange(task);
        }
    }

    return (
        <ListGroupItem taskid={props.task.id}
            color={color}>
            <Row>
                <Col xs={'8'} sm={'8'} md={'8'} lg={'8'} className={'task-item-text'}>
                    {props.task.description}
                </Col>
                <Col xs={'4'} sm={'4'} md={'4'} lg={'4'} className={'text-right'}>
                    <Button id={'buttonCompletion' + props.task.id} taskid={props.task.id} color={color} icon={icon} onClick={changeTaskCompletion}>
                        <i taskid={props.task.id} className={icon}></i>
                    </Button>
                </Col>
            </Row>
        </ListGroupItem>
    )
}

export default Task;
