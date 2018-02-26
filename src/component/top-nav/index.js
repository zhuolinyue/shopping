import React          from 'react'
import { Link , withRouter }       from 'react-router-dom'
import Mutil          from "utils";
import User           from "service/user-service";
const _mm        =  new Mutil( ) ;
const _user      = new User( );

import './index.scss'
@withRouter
class TopNav extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            username : _mm.getLocalStorage('userInfo').username || ''
        }
        this.logout = this.logout.bind(this)
    }
    logout(){
        _user.logout().then(res => {
            _mm.removeLocalStorage('userInfo');
            this.props.history.push('/login')
        }, errMsg => {
            _mm.errorTips( errMsg )
        })
    }
    render () {
        return (
            <header className="main-header">

                <Link to="/" className="logo">
                    <span className="logo-mini"><b>W</b>ANG</span>
                    <span className="logo-lg"><b>lin</b>zai</span>
                </Link>
                <nav className="navbar navbar-static-top">
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown messages-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-envelope-o"></i>
                                    <span className="label label-success">4</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="header">You have 4 messages</li>
                                    <li>
                                        {/* inner menu: contains the actual data */}
                                        <ul className="menu">
                                            <li>{/* start message */}
                                                <a href="#">
                                                    <div className="pull-left">
                                                        <img src="https://adminlte.io/themes/AdminLTE/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                                                    </div>
                                                    <h4>
                                                        Support Team
                                                        <small><i className="fa fa-clock-o"></i> 5 mins</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </a>
                                            </li>
                                            {/* end message */}
                                            <li>
                                                <a href="#">
                                                    <div className="pull-left">
                                                        <img src="https://adminlte.io/themes/AdminLTE/dist/img/user3-128x128.jpg" className="img-circle" alt="User Image" />
                                                    </div>
                                                    <h4>
                                                        AdminLTE Design Team
                                                        <small><i className="fa fa-clock-o"></i> 2 hours</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <div className="pull-left">
                                                        <img src="https://adminlte.io/themes/AdminLTE/dist/img/user4-128x128.jpg" className="img-circle" alt="User Image" />
                                                    </div>
                                                    <h4>
                                                        Developers
                                                        <small><i className="fa fa-clock-o"></i> Today</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <div className="pull-left">
                                                        <img src="https://adminlte.io/themes/AdminLTE/dist/img/user3-128x128.jpg" className="img-circle" alt="User Image" />
                                                    </div>
                                                    <h4>
                                                        Sales Department
                                                        <small><i className="fa fa-clock-o"></i> Yesterday</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <div className="pull-left">
                                                        <img src="https://adminlte.io/themes/AdminLTE/dist/img/user4-128x128.jpg" className="img-circle" alt="User Image" />
                                                    </div>
                                                    <h4>
                                                        Reviewers
                                                        <small><i className="fa fa-clock-o"></i> 2 days</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="footer"><a href="#">See All Messages</a></li>
                                </ul>
                            </li>

                            <li className="dropdown notifications-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-bell-o"></i>
                                    <span className="label label-warning">10</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="header">You have 10 notifications</li>
                                    <li>

                                        <ul className="menu">
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-users text-aqua"></i> 5 new members joined today
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-warning text-yellow"></i> Very long description here that may not fit into the
                                                    page and may cause design problems
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-users text-red"></i> 5 new members joined
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-shopping-cart text-green"></i> 25 sales made
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-user text-red"></i> You changed your username
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="footer"><a href="#">View all</a></li>
                                </ul>
                            </li>

                            <li className="dropdown tasks-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-flag-o"></i>
                                    <span className="label label-danger">9</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="header">You have 9 tasks</li>
                                    <li>
                                        {/* inner menu: contains the actual data */}
                                        <ul className="menu">
                                            <li>{/* Task item */}
                                                <a href="#">
                                                    <h3>
                                                        Design some buttons
                                                        <small className="pull-right">20%</small>
                                                    </h3>
                                                    <div className="progress xs">
                                                        <div className="progress-bar progress-bar-aqua" style={{width: "20%"}}>
                                                            <span className="sr-only">20% Complete</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>

                                            <li>
                                                <a href="#">
                                                    <h3>
                                                        Create a nice theme
                                                        <small className="pull-right">40%</small>
                                                    </h3>
                                                    <div className="progress xs">
                                                        <div className="progress-bar progress-bar-green" style={{width: "40%"}}>
                                                            <span className="sr-only">40% Complete</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            {/* end task item */}
                                            <li>{/* Task item */}
                                                <a href="#">
                                                    <h3>
                                                        Some task I need to do
                                                        <small className="pull-right">60%</small>
                                                    </h3>
                                                    <div className="progress xs">
                                                        <div className="progress-bar progress-bar-red" style={{width: "60%"}}>
                                                            <span className="sr-only">60% Complete</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>

                                            <li>
                                                <a href="#">
                                                    <h3>
                                                        Make beautiful transitions
                                                        <small className="pull-right">80%</small>
                                                    </h3>
                                                    <div className="progress xs">
                                                        <div className="progress-bar progress-bar-yellow" style={{width: "80%"}}>
                                                            <span className="sr-only">80% Complete</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li className="footer">
                                        <a href="#">View all tasks</a>
                                    </li>
                                </ul>
                            </li>

                            <li className="dropdown user user-menu">
                                <a href="javascript:" className="dropdown-toggle" >
                                    <img src="https://adminlte.io/themes/AdminLTE/dist/img/user2-160x160.jpg" className="user-image" alt="User Image" />
                                    {this.state.username
                                        ? <span><span className="hidden-xs">欢迎，</span>
                                            <span className="hidden-xs">{this.state.username || 'admin'}</span>
                                            </span>
                                        :<span className="hidden-xs">欢迎您</span>
                                    }

                                </a>
                                <ul className="dropdown-menu">


                                    <li className="user-footer">
                                        <div className="pull-right">
                                            <a href="javascript:" onClick = { this.logout} className="btn btn-default btn-flat">退出登录</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default TopNav