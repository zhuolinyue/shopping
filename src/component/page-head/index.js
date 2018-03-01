import React from 'react'

class PageHead extends React.Component{
    constructor(props){
       super(props)
    }
    render () {

        return (
            <section className="content-header">
                <h1 className='pull-left'>
                    { this.props.title}
                  </h1>
                {this.props.children}
            </section>
        )
    }
}
export default PageHead