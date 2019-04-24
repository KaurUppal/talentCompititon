import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class Paging_ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number:1
        }
    };

    handlePaging1(name) {
        console.log("clicking");
        };
    

    render() {
        //let init = this.props.init();

            return (
                <div >
                    <Pagination size="lg" aria-label="Page navigation example" >
                        <PaginationItem>
                            <PaginationLink first href="#" onClick={() => this.props.handlePaging("first")} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink previous href="#" onClick={() => this.props.handlePaging("previous")}/>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                {this.props.pageNumber}
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink next href="#" onClick={() => this.props.handlePaging("next")} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink last href="#" onClick={() => this.props.handlePaging("last")} />
                        </PaginationItem>
                    </Pagination>
                </div>
            );
        }
    }