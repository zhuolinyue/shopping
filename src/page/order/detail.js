import React from 'react'
import { Helmet }      from "react-helmet";
import PageTitle        from 'component/page-head'
import TableList        from "utils/table-list";
import Mutil            from "utils";
import Order            from "service/order-service";
import './detail.scss'
const _mm               =  new Mutil() ;
const _order            = new Order();

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber     : this.props.match.params.orderNumber,
            orderInfo       : {}

        }
    }
    componentDidMount(){
        console.log(this.state.orderNumber)
        this.loadOrder();

    }
    loadOrder(){
        let { orderNumber } = this.state;
        _order.getOrderDetail(orderNumber).then(res => {
            this.setState({
                orderInfo : res
            })
            }, errMsg =>{
                _mm.errorTips( errMsg )
            })

    }
    onSendGoods(){
        if ( window.confirm( '是否确认该订单已经发货？' ) ){
            _order.sendGoods(this.state.orderNumber).then( res => {
                _mm.scusessTips("发货成功");
                this.loadOrder();
                }, errMsg =>{
                _mm.errorTips( errMsg )
            })
        }
    }
    render(){
        let receiverInfo = this.state.orderInfo.shippingVo || '';
        let productList = this.state.orderInfo.orderItemVoList || [];
        let tableHeads = ['商品图片','商品信息','单价','数量','合计'];
        let listBody = productList.map((product,index) =>{
            return (
                <tr key={index}>
                    <td><img className='p-img' src={`${this.state.orderInfo.imageHost}${product.productImage}`} alt={product.productImage}/></td>
                    <td>
                        <p>{product.productName}</p>
                    </td>
                    <td>￥{product.currentUnitPrice}</td>
                    <td>{product.quantity}</td>
                    <td>￥{product.totalPrice}</td>

                </tr>
            )
        });
        return (
            <div className='content-wrapper'>
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <meta name="description" content="学而思网校为3-18岁孩子提供小学、初中、高中全学科一站式课外教学。“直播+辅导”双师教学，实现了直播上课、实时互动、随堂测试、语音测评、及时答疑、作业作文批改、错题订正，大幅度提升学习效果。全国200多个城市，超过500万中小学生正在网校高效学习" />
                    <meta name="keywords" content="学而思网校,在线学习,在线辅导,直播授课,中小学辅导课程,视频课程,网络课程" />
                    <meta name="renderer" content="webkit" />
                    <title>订单详情</title>
                    <link rel="canonical"  />
                </Helmet>
                <PageTitle title="订单详情" />
                <div className="content" style={{marginTop:"30px"}}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-md-2 control-label">订单号</label>
                                    <div className="col-md-5">
                                        <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-md-2 control-label">创建时间</label>
                                    <div className="col-md-5">
                                        <p className="form-control-static">{this.state.orderInfo.createTime}</p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-md-2 control-label">收件人</label>
                                    <div className="col-md-5">
                                        <p className="form-control-static">
                                            姓名：{receiverInfo.receiverName}
                                            地址：{receiverInfo.receiverProvince}，
                                            {receiverInfo.receiverCity}，
                                            {receiverInfo.receiverAdrress}
                                            电话：{receiverInfo.receiverPhone || receiverInfo.receiverMobile }
                                            </p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-md-2 control-label">订单状态</label>
                                    <div className="col-md-5">
                                        <p className="form-control-static">
                                            {this.state.orderInfo.statusDesc}
                                            {this.state.orderInfo.status === 20 ? <button className='btn btn-danger btn-xs btn-send-goods' onClick={(e)=>this.onSendGoods(e)}>立即发货</button>: ""}
                                        </p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-md-2 control-label">支付方式</label>
                                    <div className="col-md-5" >
                                        <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-md-2 control-label">订单金额</label>
                                    <div className="col-md-5" >
                                        <p className="form-control-static">￥{this.state.orderInfo.payment}</p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-md-2 control-label">商品列表</label>
                                    <div className="col-md-10" >
                                        <TableList tableHeads={tableHeads}>
                                            {listBody}
                                        </TableList>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>


            </div>
        )
    }
}
export default OrderDetail