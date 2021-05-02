import React from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Button, Tooltip, Input, ListGroup, ListGroupItem } from 'reactstrap'

function ToDoList (props) {
    return (
        <>
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
                                    <Input id={'new-task'} placeholder={'New Task'} />
                                </Col>
                                <Col xs={'2'} sm={'2'} md={'2'} lg={'2'} className={'text-right'}>
                                    <Button id={'buttonAdd'} color={'primary'}><i className={'fas fa-plus'}></i></Button>
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
