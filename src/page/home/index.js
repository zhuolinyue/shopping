import React from 'react'
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