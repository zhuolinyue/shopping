import React from 'react'
import { Helmet }      from "react-helmet";
import PageTitle        from 'component/page-head'
import CategorySelector from "page/product/index/category-selector";
import Mutil            from "utils";
import Product          from "service/product-service";

const _mm               =  new Mutil() ;
const _product          = new Product();
import './index.scss'
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id               : this.props.match.params.pid,
            categoryId       : 0,
            parentCategoryId : 0,
            subImages         : [],
            detail             : '',
            name               :'',
            subtitle           :'',
            price               :'',
            stock               :'',
            status               :1
        }
    }
    componentDidMount(){
        this.loadProduct();

    }
    loadProduct(){
        let { id } = this.state;
        if ( id ) {
            _product.getProduct(id).then(res => {
                let images = res.subImages.split(',');
                res.subImages = images.map((img) => {
                    return {
                        uri : img,
                        url: res.imageHost + img
                    }
                });
                this.setState(res)
            }, errMsg =>{
                _mm.errorTips( errMsg )
            })
        }
    }
    render(){
        return (
            <div className='content-wrapper'>
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <meta name="description" content="学而思网校为3-18岁孩子提供小学、初中、高中全学科一站式课外教学。“直播+辅导”双师教学，实现了直播上课、实时互动、随堂测试、语音测评、及时答疑、作业作文批改、错题订正，大幅度提升学习效果。全国200多个城市，超过500万中小学生正在网校高效学习" />
                    <meta name="keywords" content="学而思网校,在线学习,在线辅导,直播授课,中小学辅导课程,视频课程,网络课程" />
                    <meta name="renderer" content="webkit" />
                    <title>添加商品</title>
                    <link rel="canonical"  />
                </Helmet>
                <PageTitle title="添加商品" />
                <div className="content" style={{marginTop:"30px"}}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label  className="col-md-2 control-label">商品名称</label>
                                    <div className="col-md-5">
                                        <p className="form-control-static">{this.state.name}</p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-2 control-label">商品描述</label>
                                    <div className="col-md-5">
                                        <p className="form-control-static">{this.state.subtitle}</p>
                                    </div>
                                </div>
                                <CategorySelector
                                    readOnly
                                    categoryId={this.state.categoryId}
                                    parentCategoryId={this.state.parentCategoryId} />
                                <div className="form-group">
                                    <label  className="col-md-2 control-label">商品价格</label>
                                    <div className="col-md-3">
                                        <div className="input-group">
                                            <input type="number"
                                                   readOnly={true}
                                                   value={this.state.price}
                                                   className="form-control"/>
                                            <span className="input-group-addon">元</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-md-2 control-label">商品库存</label>
                                    <div className="col-md-3">
                                        <div className="input-group">
                                            <input type="number"
                                                   readOnly={true}
                                                   value={this.state.stock}
                                                   className="form-control"/>
                                            <span className="input-group-addon">件</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-md-2 control-label">商品图片</label>
                                    <div className="col-md-10">

                                        {this.state.subImages.length > 0
                                            ? this.state.subImages.map((image,index) =>(

                                                <div className='img-content' key={index}>
                                                    <img src={image.url} alt={image.url}/>

                                                </div>
                                            ))
                                            :"暂无图片"
                                        }
                                        </div>
                                </div>
                                <div className="form-group">
                                        <label  className="col-md-2 control-label">商品详情</label>
                                        <div className="col-md-10" dangerouslySetInnerHTML={{__html:this.state.detail}}>
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
export default ProductDetail