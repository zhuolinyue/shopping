import React  from 'react'
import TopNav from "component/top-nav";
import SideNav from "component/side-nav";
import './res/skin.css'

class Layout extends React.Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <div className="wrapper" style={{height:'auto',minHeight:'100%'}}>
               <TopNav />
               <SideNav />
                { this.props.children }
            </div>
        )
    }
}
export default Layout