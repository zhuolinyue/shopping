import React         from 'react'
import { Helmet }   from "react-helmet";
import { Link }     from 'react-router-dom'
import PageTitle    from 'component/page-head'
import RcPagination from "utils/pagenation";
import SearchList   from "./index-list-search";
import TableList    from "utils/table-list";
import Mutil        from "utils";
import Order      from "service/order-service";
const _mm        =  new Mutil() ;
const _order      = new Order();


class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list       : [],
            pageNum    : 1,
            listType   : 'list',
            orderNumber   : ''
        };

    }
    componentDidMount(){
        this.loadOrderList()
    }
    loadOrderList(){
        let listParam = {} ;
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        if ( this.state.listType === 'search') {
            listParam.orderNo = this.state.orderNumber;
            }
        _order.getOrderList(listParam).then(res => {
            this.setState(res)
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips( errMsg )
        })
    }
    onChangePageNum(pageNum) {
        this.setState({
            pageNum : parseInt(pageNum) || 1
        }, () => {
            this.loadOrderList()
        })
    }
    onSearch (orderNumber ) {
        let listType = orderNumber === '' ? 'list' : 'search';
        this.setState({
            listType     : listType,
            pageNum       : 1,
            orderNumber       : orderNumber
        }, () => {
            this.loadOrderList()
        });

    }
    render(){
        let tableHeads = ['订单号','收件人','订单状态','订单总价','创建时间','操作'];
        let listBody = this.state.list.map((order,index) =>{
            return (
                <tr key={index}>
                    <td><Link to={`/order/detail/${order.orderNo}`} >{order.orderNo}</Link></td>
                    <td>
                        <p>{order.receiverName}</p>
                    </td>
                    <td>{order.statusDesc}</td>
                    <td>{order.payment}</td>
                    <td>{order.createTime}</td>
                    <td>
                        <p><Link  to={`/order/detail/${order.orderNo}`}>详情</Link></p>
                    </td>
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
                    <title>订单列表</title>
                    <link rel="canonical"  />
                </Helmet>
                <PageTitle title="订单列表" />
                <div className="content" style={{marginTop:"30px"}}>

                    <div className="row">
                        <SearchList onSearch={( orderNumber ) => { this.onSearch( orderNumber )} } />
                        <TableList tableHeads={tableHeads}>
                            {listBody}
                        </TableList>

                    </div>
                    <RcPagination
                        current={this.state.pageNum}
                        total={this.state.total}
                        onChange={(pageNum) => this.onChangePageNum(pageNum)}
                    />

                </div>


            </div>
        )
    }
}
export default OrderList