import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Button, Tooltip, Input, ListGroup, ListGroupItem, Alert } from 'reactstrap'
import ToDoServiceProvider from '../service/ToDoServiceProvider';

function ToDoList (props) {
    // fields
    let service = ToDoServiceProvider.Service.getInstance();

    // state definitions
    const [newTask, setNewTask] = useState('');

    // controls refs
    const newTaskRef = useRef();

    // methods
    function addTask () {
        if (newTask) {
            let inserting = service.insert({ description: newTask/*, is_done: false*/ });

            Promise.all([inserting]).then(function (response) {
                toast.success(response[0]['message']);
                setNewTask('');

                newTaskRef.current.focus();
            }, function (error) {
                let errors = error.responseJSON['errors'];

                if (errors.length) {
                    errors.forEach(message => {
                        toast.error(message);
                    });
                }
            })
        }
    }

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
                                        target={'buttonAdd'}>
                                        Add the Task
                                    </Tooltip>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <CardTitle tag={'h5'} className={'tasks-title'}>Tasks List</CardTitle>
                                    <ListGroup>

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
