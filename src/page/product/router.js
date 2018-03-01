import React           from 'react'
import {  Route , Switch ,Link ,Redirect } from 'react-router-dom'
import ProductList from 'page/product/index'
import ProductDetail from "page/product/index/detail";
import ProductSave from "page/product/index/save";

class ProductRoute extends React.Component {
    render ( ) {

        return (
            <Switch>
                    <Route path='/product/index' component={ ProductList } />
                     <Route path='/product/save/:pid?' component={ ProductSave } />
                     <Route path='/product/detail/:pid' component={ ProductDetail } />
                    <Redirect exact form='/product' to='/product/index'  />
            </Switch>
        )
    }
}
export default ProductRoute
