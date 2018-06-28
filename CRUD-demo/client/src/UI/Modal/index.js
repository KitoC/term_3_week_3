import React, { Component } from 'react';
import './Modal.css'

class Modal extends Component {
    constructor(){
        super()
        this.state = {
            cssId: 'hide' 
        }
    }


    setId() {
        this.setState({ cssId: this.props.showContactForm})

    }

    componentDidMount() {
        this.setId()
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.showContactForm !== prevProps.showContactForm) {
            this.setId()
        }
    }

    render(){
        const {cssId} = this.state
        let modalContent = this.props.content
      
        return (
            <div id={cssId} className="modal">
                <div onClick={this.props.onClick} className="clickableUnderlay"></div>
                <div className="bringToFore">
                    {this.props.children}
                </div>
            </div>
    
        )
    }
}
export default Modal