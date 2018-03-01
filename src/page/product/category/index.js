import React         from 'react'
import { Helmet }   from "react-helmet";
import { Link }     from 'react-router-dom'
import PageTitle    from 'component/page-head'
import TableList    from "utils/table-list";
import Mutil        from "utils";
import Product      from "service/product-service";
const _mm        =  new Mutil() ;
const _product      = new Product();
class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list              : [],
           parentCategoryId  : this.props.match.params.pid || 0
        };

    }
    componentDidMount(){
        this.loadCategoryList()
    }
    componentDidUpdate( prevProps, prevState ) {
         let oldPath = prevProps.location.pathname ,
             newPath = this.props.location.pathname ,
             newId   = this.props.match.params.pid;
         if ( oldPath !== newPath ) {
             this.setState({
                 parentCategoryId : newId
             }, ( ) => {
                 this.loadCategoryList();
             })
         }
    }
    loadCategoryList(){
        _product.getCategoryList(this.state.parentCategoryId).then(res => {
            this.setState({
                list : res
            })
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips( errMsg )
        })
    }
    onUpdateName( id , name ) {
       let newName = window.prompt("请输入新的品类名称",name)
        if ( newName ) {
           _product.updateCategoryName({
               categoryId   :   id,
               categoryName : name
           }).then( res =>{
               _mm.scusessTips( res );
               this.loadCategoryList(  )
           }, errMsg =>{
               _mm.errorTips( errMsg )
           })
        }
    }
    render(){
        let tableHeads = ['品类ID', '品类名称', '操作',];
        let listBody = this.state.list.map((cate,index) =>{
            return (
                <tr key={index}>
                    <td>{cate.id}</td>
                    <td><p>{cate.name}</p>
                    </td>
                    <td>
                        <a href="javascript:" className='opear' onClick={(e) => this.onUpdateName(cate.id,cate.name)}>{cate.name}</a>
                        {   cate.parentId ===0
                            ? <Link style={{marginLeft:'20px'}} to={`/category/index/${cate.id}`}>查看子品类</Link>
                            : null
                        }
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
                    <title>品类列表</title>
                    <link rel="canonical"  />
                </Helmet>
                <PageTitle title="品类列表" >
                    <div className="page-header-right pull-right">

                        <Link to={`/category/add`} className='btn btn-primary'>
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>

                        </Link>
                    </div>
                </PageTitle>
                <div className="content" style={{marginTop:"30px"}}>
                    <div className="row">
                        <p>父品类ID: { this.state.parentCategoryId }</p>
                        <TableList tableHeads={tableHeads}>
                            {listBody}
                        </TableList>

                    </div>


                </div>


            </div>
        )
    }
}
export default CategoryList