import Mutil from "utils";

const _mm    =  new Mutil() ;
class Product {
    getProductList(listParam) {
        let  url                   = '',
             data                    = {} ;
        if ( listParam.listType === 'list' ) {
            url                      = '/manage/product/list.do';
            data.pageNum             = listParam.pageNum;
        } else if ( listParam.listType === 'search' ){
            url                        = '/manage/product/search.do';
            data.pageNum               = listParam.pageNum;
            data[listParam.searchType] = listParam.keyword;
        }

        return _mm.request({
            type  :'post',
            url   :url,
            data  : data
        })
    }
    setProductStatus(productStatus){
        return _mm.request({
            type  :'post',
            url   :'/manage/product/set_sale_status.do',
            data  : productStatus
        })
    }
    getCategoryList(parentCategoryId){
        return _mm.request({
            type  :'post',
            url   :'/manage/category/get_category.do',
            data  : {
                categoryId : parentCategoryId || 0
            }
        })
    }
    checkProduct( product ){
       let result = {
           status : true,
           msg :'验证通过'
       }
        let  name  = product.name.trim() ,
            subtitle  = product.subtitle.trim(),
            price = product.price,
            stock =  product.stock,
            categoryId = product.categoryId;
       if ( typeof name !=='string' || name.length ===0){
            return {
                status : false ,
                msg     : '商品名不能为空'
            }
        }
        if ( typeof subtitle !=='string' || subtitle.length ===0){
            return {
                status : false ,
                msg     : '商品描述不能为空'
            }
        }
        if ( typeof categoryId !=='number' || !( categoryId > 0 )){
            return {
                status : false ,
                msg     : '请选择商品品类'
            }
        }
        if ( typeof price !=='number' || !( price >= 0 )){
            return {
                status : false ,
                msg     : '请输入正确的商品价格'
            }
        }
        if ( typeof stock !=='number' || !( stock >= 0 )){
            return {
                status : false ,
                msg     : '请输入正确的商品库存'
            }
        }

        return result;


    }
    saveProduct( product ){
        return _mm.request({
            type  :'post',
            url   :'/manage/product/save.do',
            data  : product
        })
    }
    getProduct( id ) {
        return _mm.request({
            type  :'post',
            url   :'/manage/product/detail.do',
            data  : {
                productId : id || 0
            }
        })
    }
}
export default Product