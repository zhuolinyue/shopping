import React from 'react'
class SearchList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderNumber    : '',

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
       this.props.onSearch( this.state.orderNumber )
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
                        <select className="form-control">
                            <option >按订单号查询</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text"
                               name ="orderNumber"
                               onChange={( e ) => { this.onChangeInputValue( e )}}
                               onKeyUp = { ( e )=> { this.onSearchKeywordKeyUp( e ) }}
                               className="form-control"
                               placeholder="请输入订单号" />
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