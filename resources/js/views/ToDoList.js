import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ToDoServiceProvider from '../service/ToDoServiceProvider';
import ErrorHandlingHelper from '../helpers/errorHandlingHelper';
import Task from '../components/Task';
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Button, Tooltip, Input, ListGroup, } from 'reactstrap'

/**
 * main page component
 */
function ToDoList (props) {
    // fields
    let service = ToDoServiceProvider.Service.getInstance();

    // state definitions
    const [firstRender] = useState(true);
    const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [tasksList, setTasksList] = useState([]);

    // controls refs
    const newTaskRef = useRef();

    /**
     * first render operations
     */
    useEffect(() => {
        // loads the task list
        loadTasks();
    }, [firstRender]);

    // methods
    /**
     * creates a new task object and calls the service insert method to store it in the database
     */
    function addTask () {
        if (newTask) {
            let inserting = service.insert({ description: newTask, is_done: false });

            Promise.all([inserting]).then(function (response) {
                // shows success message
                toast.success(response[0]['message']);

                // clears state variable
                setNewTask('');

                // reloads the tasks list
                loadTasks();

                newTaskRef.current.focus();
            }, function (error) {
                // handles the errors
                ErrorHandlingHelper.handleAll(error.responseJSON);
            });
        }
    }

    /**
     * calls the service list method to load the tasks from the database
     */
    function loadTasks() {
        // calls the service list method
        let searching = service.list();

        Promise.all([searching]).then(function (response) {
            // populates the result data to a state variable
            setTasksList(response[0]);
        }, function (error) {
            // handles the errors
            ErrorHandlingHelper.handleAll(error.responseJSON);
        });
    }

    /**
     * calls the service update method to update the task in the database
     * and reloads the task list
     * @param {object} task
     */
    function updateTask (task) {
        // calls the service update method
        let updating = service.update(task);

        Promise.all([updating]).then(function (response) {
            // shows success message
            toast.success(response[0]['message']);

            // reloads the tasks list
            loadTasks();
        }, function (error) {
            // handles the errors
            ErrorHandlingHelper.handleAll(error.responseJSON);
        });
    }

    /**
     * returns one task component for each loaded task
     */
    const tasks = tasksList.map(function (task, index) {
        return (
            <Task key={index} task={task} onCompletionChange={updateTask} />
        )
    });

    return (
        <>
            <ToastContainer />
            <Row className={'main-row'}>
                <Col sm={'4'} md={'4'} lg={'4'}></Col>
                <Col sm={'4'} md={'4'} lg={'4'}>
                    <Card outline color={'primary'}>
                        <CardHeader className={'bg-primary text-white'}>
                            <h5 className={'card-title'}>
                                <i className={'fas fa-tasks'}></i>&nbsp;
                                Todo List
                            </h5>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs={'10'} sm={'10'} md={'10'} lg={'10'}>
                                    <Input id={'new-task'}
                                        ref={newTaskRef}
                                        autoFocus={true}
                                        placeholder={'New Task'}
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)} />
                                </Col>
                                <Col xs={'2'} sm={'2'} md={'2'} lg={'2'} className={'text-right'}>
                                    <Button id={'buttonAdd'}
                                        color={'primary'}
                                        onClick={addTask}>
                                        <i className={'fas fa-plus'}></i>
                                    </Button>
                                    <Tooltip placement={'auto'}
                                        target={'buttonAdd'}
                                        isOpen={tooltipIsOpen}
                                        toggle={() => setTooltipIsOpen(!tooltipIsOpen)}>
                                        Add the Task
                                    </Tooltip>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <CardTitle tag={'h5'} className={'tasks-title'}>Tasks List</CardTitle>
                                    <ListGroup>
                                        {tasks}
                                    </ListGroup>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={'4'} md={'4'} lg={'4'}></Col>
            </Row>
        </>
    )
}

export default ToDoList;
