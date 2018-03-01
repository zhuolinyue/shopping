import React                            from 'react'
import {  Route , Switch , Redirect } from 'react-router-dom'
import ProductList                      from 'page/product/index'
import ProductDetail                    from "page/product/index/detail";
import ProductSave                      from "page/product/index/save";
import CategoryList                     from "page/product/category";
import CategoryAdd                      from "page/product/category/add";

class ProductRoute extends React.Component {
    render ( ) {

        return (
            <Switch>
                    <Route path='/product/index' component={ ProductList } />
                     <Route path='/product/save/:pid?' component={ ProductSave } />
                     <Route path='/product/detail/:pid?' component={ ProductDetail } />
                     <Route path='/category/index/:pid?' component={ CategoryList } />
                     <Route path='/category/add/:pid?' component={ CategoryAdd } />
                     <Redirect exact from='/product' to='/product/index'  />
                     <Redirect exact from='/category' to='/category/index'  />
            </Switch>
        )
    }
}
export default ProductRoute
