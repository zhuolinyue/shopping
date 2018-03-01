import React from 'react'
import { Helmet }      from "react-helmet";
import { Link }        from 'react-router-dom'
import PageTitle        from 'component/page-head'
import CategorySelector from "page/product/index/category-selector";
import FileUploader     from "utils/file-upload";
import RichEditor       from "utils/rich-editor";
import Mutil            from "utils";
import Product          from "service/product-service";

const _mm               =  new Mutil() ;
const _product          = new Product();
import './index.scss'


class ProductSave extends React.Component {
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
                 })
                res.defaultDetail = res.detail
                this.setState(res)
            }, errMsg =>{
                _mm.errorTips( errMsg )
            })
        }
    }
    onCategoryChangeValue( categoryId , parentCategoryId ){
       this.setState({
           categoryId     :   categoryId ,
           parentCategoryId :  parentCategoryId
       })
    }
    onErrorUpload( err ){
      _mm.errorTips(err)
    }
    onSuccessUpload( res ){
        let { subImages } = this.state ;
        subImages.push(res) ;
        this.setState({
            subImages: subImages
        })
    }
    onDeleteImage(e){
        let index = parseInt(e.target.getAttribute('index')),
            subImages = this.state.subImages;
        subImages.splice( index , 1 );
        this.setState({
            subImages : subImages
        })
    }
    onRichEditorChange( value ){
        this.setState({
            detail : value
        })
    }
    onInputChange( e ) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        })
    }
    getSubImagesString (  ) {
        return this.state.subImages.map((image)=>image.uri).join(',')
    }
    onSubmit( e ) {
        let product = {
            name             : this.state.name,
            subtitle         : this.state.subtitle,
            categoryId        :  parseInt(this.state.categoryId),
            subImages        :  this.getSubImagesString(),
            detail            : this.state.detail,
            price             : parseFloat(this.state.price),
            stock             : parseInt(this.state.stock),
            status            : this.state.status,

        },
            productCheckResult = _product.checkProduct(product);
        if ( this.state. id ) {
             product.id = this.state. id
        }
        if ( productCheckResult.status ) {
            _product.saveProduct(product).then( res=>{
                _mm.scusessTips( res );
                this.props.history.push('/product/index');
            }, errMsg => {
                _mm.errorTips( errMsg );
            })
        } else {
            _mm.errorTips( productCheckResult.msg );
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
                                    <input type="text"
                                           name='name'
                                           value={this.state.id ? this.state.name : ''}
                                           onChange = { e => {this.onInputChange(e)}}
                                           className="form-control"
                                           placeholder="请输入商品名称" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品描述</label>
                                <div className="col-md-5">
                                    <input type="text"
                                           name='subtitle'
                                           onChange = { e => {this.onInputChange(e)}}
                                           value={this.state.id ? this.state.subtitle : ''}
                                           className="form-control"
                                           placeholder="请输入商品描述" />
                                </div>
                            </div>
                            <CategorySelector
                                categoryId={this.state.categoryId}
                                parentCategoryId={this.state.parentCategoryId}
                                onCategoryChange={( categoryId , parentCategoryId )=> this.onCategoryChangeValue( categoryId , parentCategoryId) } />
                            <div className="form-group">
                                <label  className="col-md-2 control-label">商品价格</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number"
                                               name='price'
                                               onChange = { e => {this.onInputChange(e)}}
                                               value={this.state.id ? this.state.price : ''}
                                               className="form-control"
                                               placeholder='价格' />
                                        <span className="input-group-addon">元</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label  className="col-md-2 control-label">商品库存</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number"
                                               name='stock'
                                               onChange = { e => {this.onInputChange(e)}}
                                               className="form-control"
                                               value={this.state.id ? this.state.stock : ''}
                                               placeholder='库存'  />
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
                                                    <i className="fa fa-close" index={index} onClick={(e) =>this.onDeleteImage(e)}></i>
                                                </div>
                                            ))
                                            :"请上传图片"
                                        }


                                </div>
                                <div className="col-md-10 col-md-offset-2">
                                    <FileUploader
                                        onError = { ( err ) => {this.onErrorUpload( err ) }}
                                        onSuccess={ ( res ) => {this.onSuccessUpload( res ) }} />
                                </div>

                            </div>
                            <div className="form-group">
                                <label  className="col-md-2 control-label">商品描述</label>
                                <div className="col-md-10">
                                    <RichEditor
                                        detail = { this.state.detail }
                                        defaultDetail={ this.state.defaultDetail }
                                        onValueChange = { ( value ) => {this.onRichEditorChange( value ) }} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-5">
                                    <button type="button" className="btn btn-primary" onClick={ (e) => {this.onSubmit(e)}}>提交</button>
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
export default ProductSave