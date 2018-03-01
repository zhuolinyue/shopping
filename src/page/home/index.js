import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import PageHead from "../../component/page-head";
import Mutil     from "utils";
import Statistic      from "service/statistic-service";
const _mm        =  new Mutil() ;
const _statistic      = new Statistic();
import './index.scss'
class Home extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            userCount : '-',
            productCount:'-',
            orderCount:'-'
        }
    }
    componentDidMount(){
        this.loadCount()
    }
    loadCount() {
        _statistic.getHomeCount().then(res=>{
            this.setState(res)
        }, errMsg =>{
            _mm.errorTips(errMsg)
        })
    }
    render () {
        return (
           <div className='content-wrapper'>
               <Helmet>
                   <meta charSet="utf-8" />
                   <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
                   <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                   <meta name="description" content="学而思网校为3-18岁孩子提供小学、初中、高中全学科一站式课外教学。“直播+辅导”双师教学，实现了直播上课、实时互动、随堂测试、语音测评、及时答疑、作业作文批改、错题订正，大幅度提升学习效果。全国200多个城市，超过500万中小学生正在网校高效学习" />
                   <meta name="keywords" content="学而思网校,在线学习,在线辅导,直播授课,中小学辅导课程,视频课程,网络课程" />
                   <meta name="renderer" content="webkit" />
                   <title>首页</title>
                   <link rel="canonical"  />
               </Helmet>
               <PageHead title='首页' />
               <div className="content" style={{marginTop:'30px'}}>
                   <div className="row">
                       <div className="col-lg-4 col-xs-6">
                           {/* small box */}
                           <div className="small-box bg-aqua">
                               <div className="inner">
                                   <Link to='/user' className="color-box brown">
                                       <p className="count">{this.state.userCount}</p>
                                       <p className="desc">
                                           <i className="fa fa-user-o"></i>
                                           <span>用户数</span>
                                       </p>
                                   </Link>
                               </div>

                           </div>
                       </div>
                       <div className="col-lg-4 col-xs-6">
                           {/* small box */}
                           <div className="small-box bg-green">
                               <div className="inner">
                                   <Link to='/product' className="color-box green">
                                       <p className="count">{this.state.productCount}</p>
                                       <p className="desc">
                                           <i className="fa fa-list"></i>
                                           <span>商品总数</span>
                                       </p>
                                   </Link>
                               </div>

                           </div>
                       </div>
                       <div className="col-lg-4 col-xs-6">
                           {/* small box */}
                           <div className="small-box bg-yellow">
                               <div className="inner">
                                   <Link to='/order' className="color-box blue">
                                       <p className="count">{this.state.orderCount}</p>
                                       <p className="desc">
                                           <i className="fa fa-check-square-o"></i>
                                           <span>订单总数</span>
                                       </p>
                                   </Link>
                               </div>

                           </div>
                       </div>

                   </div>
               </div>

           </div>
        )
    }
}
export default Home ;