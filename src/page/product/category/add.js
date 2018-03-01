import React         from 'react';
import { Link }      from 'react-router-dom';
import { Helmet }   from "react-helmet";
import PageTitle    from 'component/page-head';
import Mutil        from "utils";
import Product      from "service/product-service";
const _mm           =  new Mutil() ;
const _product      = new Product();
class CategoryAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList : [],
            parentId      :  0,
            categoryName  : ''
        };

    }
    componentDidMount(){
        this.loadCategoryList()
    }
    loadCategoryList(){
        _product.getCategoryList( ).then(res => {
            this.setState({
                categoryList : res
            })
        }, errMsg => {
            _mm.errorTips( errMsg )
        })
    }
    onInputChange ( e ) {
        let name  = e.target.name,
            value = e.target.value ;
        this.setState({
            [name] : value
        })
    }
    onSubmit ( e ) {
        let categoryName = this.state.categoryName.trim();
        if ( categoryName ) {
            _product.saveCategory({
                parentId     : this.state.parentId,
                categoryName : categoryName
            }).then( res =>{
                _mm.scusessTips( res );
                this.props.history.push('/category/index')
            }, errMsg =>{
                _mm.errorTips( errMsg )
            })
        } else {
            _mm.errorTips( '请输入品类名称' )
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
                    <title>添加品类</title>
                    <link rel="canonical"  />
                </Helmet>
                <PageTitle title="添加品类" />
                <div className="content" style={{marginTop:"30px"}}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label  className="col-md-2 control-label">所属品类</label>
                                    <div className="col-md-5">
                                        <select name="parentId"
                                                onChange = { e => this.onInputChange( e )}
                                                className="form-control">
                                            <option value="0">根品类/</option>
                                            { this.state.categoryList.map((cate,index)=>{
                                                return (
                                                    <option key={index} value={cate.id}>根品类/{cate.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-2 control-label">品类名称</label>
                                    <div className="col-md-5">
                                        <input type="text"
                                               name='categoryName'
                                               onChange = { e => this.onInputChange( e )}
                                               className="form-control"
                                               placeholder="请输入品类名称" />
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
export default CategoryAdd