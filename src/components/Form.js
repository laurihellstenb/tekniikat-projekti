import React, { Component } from 'react';

// renderöi input-kentän viestille ja lähetä-nappulan
class Form extends Component {

    constructor(props) {
        super(props)
        // stateen tyhjä newText
        this.state = {
            newText: ''
        }
    }

    // näyttää formiin kirjoitetun tekstin
    showText = (e) => {
        this.setState({ newText: e.target.value })
    }

    // ajaa addMsg ja tyhjentää newTextin
    writeMsg = () => {
        this.props.addMsg(this.state.newText)
        this.setState({ newText: '' })
    }

    render() {
        return (
            <div >
                <input value={this.state.newText} onChange={this.showText} />
                <button onClick={this.writeMsg}>Lähetä</button>
            </div>
        )
    }
}

export default Form