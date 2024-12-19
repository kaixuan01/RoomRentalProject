import { Row, Col, Input } from 'reactstrap';

export default function MyInputField ({ type = 'text', placeholder = '', label, ...props }) {


    return (
        <Row className='p-1'>
            {label &&
                <Col sm={3}>
                    {`${label} :`}
                </Col>}
            <Col sm={label ? 9 : 12}>
                <Input
                    type={type}
                    placeholder={placeholder}
                    {...props}
                >
                </Input>
            </Col>
        </Row>

    );
};

