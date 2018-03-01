import React from 'react'

class SearchList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchType    : 'productId',
            searchKeyWord : ''
        }
    }
    onChangeInputValue( e ) {
        let target   = e.target,
             name    = target.name,
            value    = target.value.trim();
        this.setState({
            [name] : value
        })
    }
    onSearch( e ) {
       this.props.onSearch( this.state.searchType, this.state.searchKeyWord )
    }
    onSearchKeywordKeyUp( e ){
        if ( e.keyCode === 13 ) {
            this.onSearch( e )
        }

    }
    render(){
        return (
            <div className="col-md-12 search-wrap">
                <div className="form-inline">
                    <div className="form-group">
                        <select
                            className="form-control"
                            name ="searchType"
                            onKeyUp = { ( e )=> { this.onSearchKeywordKeyUp( e ) }}
                            onChange={( e ) => { this.onChangeInputValue( e )}}
                        >
                            <option value="productId">按商品id查询</option>
                            <option value="productName">按商品名称查询</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text"
                               name ="searchKeyWord"
                               onChange={( e ) => { this.onChangeInputValue( e )}}
                               onKeyUp = { ( e )=> { this.onSearchKeywordKeyUp( e ) }}
                               className="form-control"
                               placeholder="请输入关键词" />
                    </div>
                    <button type="button"
                            onClick = { ( e ) => { this.onSearch ( e )}}
                            className="btn btn-primary"
                    >搜索</button>
                </div>
            </div>
            )

    }
}

export default SearchList