import React         from 'react'
import { Helmet }   from "react-helmet";
import { Link }     from 'react-router-dom'
import PageTitle    from 'component/page-head'
import RcPagination from "utils/pagenation";
import SearchList   from "page/product/index/index-list-search";
import TableList    from "utils/table-list";
import Mutil        from "utils";
import Product      from "service/product-service";
const _mm        =  new Mutil() ;
const _product      = new Product();
import './index.scss'

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list       : [],
            pageNum    : 1,
            listType   : 'list',
        };
       
    }
    componentDidMount(){
        this.loadProductList()
    }
    loadProductList(){
        let listParam = {} ;
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        if ( this.state.listType === 'search') {
            listParam.searchType = this.state.searchType;
            listParam.keyword = this.state.searchKeyWord;
        }
        _product.getProductList(listParam).then(res => {
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
            this.loadProductList()
        })
    }
    onSetProductStatus( e, productId , status ) {
        let newStatus = status === 1 ? 2 :1 ,
            confirmTips = status === 1
                ? "确定要下架该商品？"
                : "确定要上架该商品？";
        if ( window.confirm(confirmTips)){
            _product.setProductStatus({
                productId,
                status : newStatus
            }).then( res => {
                _mm.scusessTips( res );
                this.loadProductList()
            }, errMsg => {
                _mm.errorTips( errMsg )
            })
        }
    }
    onSearch ( searchType , searchKeyWord ) {
        let listType = searchKeyWord === '' ? 'list' : 'search';
        this.setState({
            listType     : listType,
            pageNum       : 1,
            searchType    : searchType,
            searchKeyWord : searchKeyWord
        }, () => {
            this.loadProductList()
        });

    }
    render(){
        let tableHeads = [
            {
                name :'商品ID',
                width:'10%',
            },
            {
                name :'商品信息',
                width:'50%',
            },
            {
                name :'价格',
                width:'10%',
            },
            {
                name :'状态',
                width:'15%',
            },
            {
                name :'操作',
                width:'15%',
            }
        ];
        let listBody = this.state.list.map((product,index) =>{
            return (
                <tr key={index}>
                    <td>{product.id}</td>
                    <td>
                        <p>{product.name}</p>
                        <p>{product.subtitle}</p>

                        </td>
                    <td>￥{product.price}</td>
                    <td><span>{
                       product.status === 1 ? '在售' :'已下架'
                    }</span>
                        <button className='btn btn-warning btn-xs btn-mr' onClick={( e ) => {this.onSetProductStatus(e , product.id , product.status )}}>{product.status === 1 ? '上架' :'下架'}</button>
                    </td>
                    <td>
                        <p><Link className='oprea' to={`/product/detail/${product.id}`}>查看详情</Link></p>
                        <p><Link className='oprea' to={`/product/save/${product.id}`}>编辑</Link></p>
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
                    <title>商品管理</title>
                    <link rel="canonical"  />
                </Helmet>
                <PageTitle title="商品管理" >
                   <div className="page-header-right pull-right">

                       <Link to={`/product/save`} className='btn btn-primary'>
                           <i className="fa fa-plus"></i>
                           <span> 添加商品</span>

                       </Link>
                   </div>
                </PageTitle>
                <div className="content" style={{marginTop:"30px"}}>

                    <div className="row">
                        <SearchList onSearch={( searchType , searchKeyWord ) => { this.onSearch( searchType , searchKeyWord )} } />
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
export default ProductList