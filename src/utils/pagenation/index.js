import React from 'react'
import Pagination from 'rc-pagination'
import 'rc-pagination/dist/rc-pagination.min.css'
class RcPagination extends React.Component{
    constructor(props){
        super(props)
    }

    render () {
        return (
            <div className="row">
                <div className="col-md-12">
                    <Pagination
                        hideOnSinglePage
                        showQuickJumper
                        {...this.props}
                    />
                </div>
            </div>

        )
    }
}
export default RcPagination
