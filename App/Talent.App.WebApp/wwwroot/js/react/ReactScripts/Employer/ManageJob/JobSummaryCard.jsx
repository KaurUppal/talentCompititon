import React from 'react';
import Cookies from 'js-cookie';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';
import Paging from './Paging_.jsx';
import {
    Card, Button, ButtonGroup, CardTitle, CardBody, CardFooter, CardSubtitle, CardText, Row, Col } from 'reactstrap';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'http://localhost:51689/listing/listing/closeJob',
    }

    render() {
        let loadJobs = this.props.loadJobs;
        return (
            <div>
               
                <Row >
                    {loadJobs.map(job => <JobSummaryCardData key={job.id} job={job} closeJob={this.props.closeJob} />)}
                </Row>
                <Paging pageNumber={this.props.pageNumber} handlePaging={this.props.handlePaging}  />
            </div>
            )

    }
}


class JobSummaryCardData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    render() {
        let job = this.props.job;
        return (
            <Col sm="4" style={{ marginBottom: "15px" }}>
                <Card style={{ height: "300px" }}>
                    <CardBody>
                        <CardTitle><h3>{job.title}</h3></CardTitle>
                       <CardSubtitle><h4>{/*job.location[0].city*/}Auckland</h4></CardSubtitle>
                       <CardText>{job.summary}</CardText>
                    </CardBody>
                    <CardFooter className="text-muted">
                        <Button color="danger" size="sm">Expired</Button>
                        <ButtonGroup size="sm" style={{ float: "right" }} >
                            <Button className="btn btn-outline-primary" onClick={() =>this.props.closeJob(job.id)}>Close</Button>
                            <Button className="btn btn-outline-primary">Edit</Button>
                            <Button className="btn btn-outline-primary">Copy</Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            </Col>
           
)
    }
}