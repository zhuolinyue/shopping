import React from 'react'
import { Link , NavLink  } from 'react-router-dom'
import './index.scss'
class SideNav extends React.Component {
    render () {
        return (
            <aside className="main-sidebar">
                <section className="sidebar" style={{height: "auto"}}>
                    <ul className="sidebar-menu tree" data-widget="tree">
                        <li className="treeview">
                            <NavLink exact to="/" activeClassName='active'>
                                <i className="fa fa-dashboard"></i>
                                <span>首页</span>
                                <span className="pull-right-container">
                                  <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </NavLink>
                        </li>
                        <li className="treeview menu-open">
                            <Link to="/product">
                                <i className="fa fa-pie-chart"></i>
                                <span>商品管理</span>
                                <span className="pull-right-container">
                                     <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </Link>
                            <ul className="treeview-menu">
                                <li><NavLink to="/product" activeClassName='active'><i className="fa fa-circle-o"></i>商品管理</NavLink></li>
                                <li><NavLink to="/product-category" activeClassName='active'><i className="fa fa-circle-o"></i> 品类管理</NavLink></li>

                            </ul>
                        </li>
                        <li className="treeview  menu-open">
                            <Link to="/order">
                                <i className="fa fa-pie-chart"></i>
                                <span>订单</span>
                                <span className="pull-right-container">
                                     <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </Link>
                            <ul className="treeview-menu">
                                <li><NavLink to="/order" activeClassName='active'><i className="fa fa-circle-o"></i>订单管理</NavLink></li>

                            </ul>
                        </li>
                        <li className="treeview  menu-open">
                            <Link to="/product">
                                <i className="fa fa-pie-chart"></i>
                                <span>用户</span>
                                <span className="pull-right-container">
                                     <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </Link>
                            <ul className="treeview-menu">
                                <li><NavLink to="/" activeClassName='active'><i className="fa fa-circle-o"></i>用户管理</NavLink></li>

                            </ul>
                        </li>
                       </ul>
                </section>

            </aside>
        )
    }
}

export default SideNav