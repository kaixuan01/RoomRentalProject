import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initData } from '../Redux/actions';
import { Row, Col } from 'reactstrap';
const Dashboard = () => {
  const dispatch = useDispatch();
  // useSelector((state) => {console.log(state)});

  
  useEffect(() => {
    // Example of initializing data
    dispatch(initData('user', [{ id: 1, name: 'John Doe' }]));
  }, [dispatch]);

  // const handleUpdateUser = (id, name) => {
  //   dispatch(updateData('user', id, { name }));
  // };

  // const handleDeleteUser = (id) => {
  //   dispatch(deleteData('user', id));
  // };



  return (<>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>


    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>
    <Row><Col>123</Col></Row>

    </>
  );
};

export default Dashboard;
