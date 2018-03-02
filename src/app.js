import React           from 'react'
import { Helmet }      from "react-helmet";
import { BrowserRouter as Router, Route , Switch ,Link ,Redirect } from 'react-router-dom'
import ReactDOM         from 'react-dom'
import Home             from    "page/home";
import Layout           from    "component/layout";
import  Login           from "page/login";
import ErrorPage        from "page/error";
import UserList         from "page/user";
import ProductRoute      from "page/product/router";
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import OrderList from "page/order";
import OrderDetail from "page/order/detail";



class App extends React.Component {
    render ( ) {
        const Layouter = (
        <Layout >
            <Switch>
                <Route exact path='/' component={ Home } />
                <Route  path='/product' component={ ProductRoute } />
                <Route  path='/category' component={ ProductRoute } />
                <Route  path='/order/index' component={ OrderList } />
                <Route  path='/order/detail/:orderNumber' component={ OrderDetail } />
                <Route  path='/user/index' component={ UserList }/>
                <Redirect exact from='/order' to='/order/index' />
                <Redirect exact from='/user' to='/user/index' />
                <Route  component={ErrorPage} />
            </Switch>
        </Layout>
    )
        return (
            <Router>
                    <Switch>
                        <Route path='/login' component={ Login } />
                        <Route path='/' render = { props => Layouter}  />

                    </Switch>
                </Router>



        )
    }
}
ReactDOM.render(
    <div>
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
             <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <meta name="description" content="学而思网校为3-18岁孩子提供小学、初中、高中全学科一站式课外教学。“直播+辅导”双师教学，实现了直播上课、实时互动、随堂测试、语音测评、及时答疑、作业作文批改、错题订正，大幅度提升学习效果。全国200多个城市，超过500万中小学生正在网校高效学习" />
            <meta name="keywords" content="学而思网校,在线学习,在线辅导,直播授课,中小学辅导课程,视频课程,网络课程" />
            <meta name="renderer" content="webkit" />
             <title>台管理系统</title>
            <link rel="canonical"  />
        </Helmet>
        <App />
    </div>,
    document.getElementById('app')
);