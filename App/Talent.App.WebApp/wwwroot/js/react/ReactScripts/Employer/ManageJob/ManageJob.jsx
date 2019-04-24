import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment } from 'semantic-ui-react';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""

        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        this.handlePaging = this.handlePaging.bind(this);
        this.pagingReload = this.pagingReload.bind(this);
    };

    pagingReload(currentPage) {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
        //set loaderData.isLoading to false after getting data
        this.loadData(currentPage, () => {
            loaderData.isLoading = false;
            this.setState({ loaderData })
        });
    }

    handlePaging(name) {
        debugger;
        let totalPages = this.state.totalPages;
        let currentPage = this.state.activePage;
        console.log("before setting page:" + this.state.activePage);
        if (name == "previous" && currentPage != 1) {
            console.log("before setting page:" + this.state.activePage);
            currentPage = currentPage-1;
            this.setState({
                activePage: currentPage
            })
            this.pagingReload(currentPage);
           }
        else if (name == "first" && currentPage != 1) {
            console.log("before setting page:" + this.state.activePage);
            currentPage = 1;
            this.setState({
                activePage: currentPage
            })
            this.pagingReload(currentPage);
        }
        else if (name == "next" && currentPage < totalPages) {
            console.log("before setting page:" + this.state.activePage);
            currentPage ++;
            this.setState({
                activePage: currentPage
            })
            this.pagingReload(currentPage);
        }
        else if (name == "last" && currentPage < totalPages) {
            console.log("before setting page:" + this.state.activePage);
            currentPage = totalPages;
            this.setState({
                activePage: currentPage
            })
            this.pagingReload(currentPage);
        }
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
        console.log("in init:" + this.state.activePage);
        //set loaderData.isLoading to false after getting data
        this.loadData(this.state.activePage, () => {
            loaderData.isLoading = false;
            this.setState({ loaderData })
        })
        }

    componentDidMount() {
        console.log("did mount");
       this.init();
    };

    closeJob(id) {
        const link = 'http://localhost:51689/listing/listing/closeJob';
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            url: link,
            type: "POST",
            data: { id: id },
            success: function (res) {
                console.log(res);
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }

        })
    }

    

    loadData(currentPage, callback) {
        const link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        // your ajax call and other logic goes here
        let activePage = currentPage;
        let sortbyDate = this.state.sortBy;
        let showActive = this.state.filter.showActive
        let showClosed = this.state.filter.showClosed;
        let showDraft = this.state.filter.showDraft;
        let showExpired = this.state.filter.showExpired;
        let showUnexpired = this.state.filter.showUnexpired;
       // debugger;
        $.ajax({
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                        'Content-Type': 'application/json'
            },
                url: link,
                type: "GET",
                data: {
                    sortbyDate: sortbyDate, showActive: showActive, showClosed: showClosed,
                    showDraft: showDraft, showExpired: showExpired, activePage: activePage,
                showUnexpired: showUnexpired
             },
            success: function (res) {
                let totalPages =0;
                if (res) {
                    if (res.totalCount % 6 != 0) totalPages = Math.floor(res.totalCount / 6) + 1;
                    else totalPages = Math.floor(res.totalCount / 6) ;
                    this.setState({
                        loadJobs: res.myJobs,
                        totalPages: totalPages
                    })
                    console.log(res);
                }
                console.log("hee title");
                //console.log(this.res);
                }.bind(this),
                error: function (res) {
                    console.log(res.status)
                }
        });
      
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    render() {
       // let activePage = this.state.activePage; 
        console.log("in render " + this.state.activePage);
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData} >
                
                <div className="ui container"><h1>List of Jobs</h1>
                    <JobSummaryCard loadJobs={this.state.loadJobs} closeJob={this.closeJob} pageNumber={this.state.activePage}
                        handlePaging={this.handlePaging}
                    />
                </div>
               
            </BodyWrapper>
        )
    }
}