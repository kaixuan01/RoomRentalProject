import React, { useEffect, useState } from "react";
import { useFuncHTTPReq } from "../../../Hook/FuncHttpReq";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../../Redux/actions";
import {
  Form,
  FormGroup,
  Label,
  Row,
  Col,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import RDInput from "../../../Control/ReduxRelated/RDInput";

export default function UserEdit() {
    const source = "userEditData";
    const { FuncHTTPReq } = useFuncHTTPReq();
    const { userId } = useParams();
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.userEditData);
    console.log(formData)
    useEffect(() => {
        const fetchData = async () => {
            FuncHTTPReq({
                url: `/User/ViewUser?id=${userId}`,
                method: 'GET',
                onSuccess: (data) => {
                    dispatch(updateData('userEditData', data));
                }
            });
        };
        fetchData();
    }, [FuncHTTPReq, userId, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

    };


    return (
        <Card>
          <CardBody>
            <h2>Edit Profile</h2>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md="6">
                  <RDInput source={source} name="name" label="Last Name" placeholder="Enter last name" />
                </Col>
                <Col md="6">
                  <RDInput source={source} name="username" disabled  label="Username" placeholder="Enter username" />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <RDInput source={source} name="email" type="email" label="Email" placeholder="Enter email" />
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <RDInput source={source} name="phone" label="phone number" placeholder="Enter phone number" />
                </Col>
                <Col md="6">
                  <RDInput name="state" label="State" placeholder="Enter state" />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <RDInput name="password" type="password" label="Password" placeholder="Enter password" />
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Button color="secondary" block>
                    Cancel
                  </Button>
                </Col>
                <Col md="6">
                  <Button color="primary" block type="submit">
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      );
}
