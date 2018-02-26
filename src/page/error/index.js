import React from 'react'
import { Link } from 'react-router-dom'

import PageTitle from 'component/page-head'

class ErrorPage extends React.Component {
    constructor(props) {
        super(props)
    }
    render(){
        return (
            <div className="content-wrapper">
                <PageTitle title="出错啦" />
                <div className="row pull-left">
                    <div className="col-md-12">
                        <span>出错了，</span>
                        <Link to={'/'}>请返回首页</Link>
                    </div>

                </div>

            </div>
        )
    }
}
export default ErrorPage