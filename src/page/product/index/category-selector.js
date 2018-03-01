import React from 'react'
import { withRouter } from 'react-router-dom'
import Mutil     from "utils";
import Product      from "service/product-service";
const _mm        =  new Mutil() ;
const _product      = new Product();
@withRouter
class CategorySelector extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            firstCategoryList : [],
            firstCategoryId : 0,
            secondCategoryList :[],
            secondCategoryId :0
        }
    }
    componentDidMount( ) {
        this.loadFirstCategory()
    }
    componentWillReceiveProps(nextProps){
        let categoryIdChange       = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
        if ( !categoryIdChange && !parentCategoryIdChange ){
            return ;
        }
        if ( nextProps.parentCategoryId ===0){
            this.setState({
                firstCategoryId : nextProps.categoryId,
                secondCategoryId : 0
            })
        }else {
            this.setState({
                firstCategoryId : nextProps.parentCategoryId,
                secondCategoryId : nextProps.categoryId
            }, () => {
                parentCategoryIdChange && this.loadSecondCategory()
            })
        }

    }
    loadFirstCategory(){
        _product.getCategoryList().then( res =>{
            this.setState({
                firstCategoryList : res
            })
        }, errMsg => {
            _mm.errorTips( errMsg)
        })
    }
    loadSecondCategory(){
        _product.getCategoryList(this.state.firstCategoryId).then( res =>{
            this.setState({
                secondCategoryList : res
            })
        }, errMsg => {
            _mm.errorTips( errMsg)
        })
    }
    onFirstCategoryChange( e ) {
        if ( this.props.readOnly ) {
            return;
        }
        let newValue = e.target.value || 0 ;
        this.setState({
            firstCategoryId    : newValue,
            secondCategoryId   : 0,
            secondCategoryList : [],
        },() => {
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        })
    }
    onSecondCategoryChange( e ) {
        if ( this.props.readOnly ) {
            return;
        }
        let newValue = e.target.value || 0 ;
        this.setState({
            secondCategoryId    : newValue,
        },() => {
            this.onPropsCategoryChange();
        })
    }
    onPropsCategoryChange(){
        let categoryChangeable = typeof this.props.onCategoryChange === 'function';
        if ( this.state.secondCategoryId){
            categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId)
        } else {
            categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId,0)
        }
    }
    render(){
        return(
            <div className="form-group">
                <label htmlFor="inputPassword3" className="col-md-2 control-label">所属分类</label>
                <div className="col-md-5 cate-select">
                    <select value={this.state.firstCategoryId}
                            readOnly={this.props.readOnly}
                           onChange = { ( e ) => { this.onFirstCategoryChange( e )}}
                            className="form-control col-md-5">
                        <option value="">请选择一级分类</option>
                        { this.state.firstCategoryList.map((cate,index)=>(
                            <option key={index} value={cate.id}>{cate.name}</option>
                        ))}
                    </select>
                    { this.state.secondCategoryList.length > 0
                        ? (<select  className="form-control col-md-5"
                                    readOnly={this.props.readOnly}
                                    value={this.state.secondCategoryId}
                                    onChange = { ( e ) => { this.onSecondCategoryChange( e )}}
                        >

                            <option value="">请选择二级分类</option>
                            { this.state.secondCategoryList.map((cate,index)=>(
                                <option key={index} value={cate.id}>{cate.name}</option>
                            ))}
                        </select>)
                        : null }


                </div>
            </div>
        )
    }
}
export default CategorySelector