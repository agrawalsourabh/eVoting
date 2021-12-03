import React from "react";

class Button extends React.Component{
    render(){
        const participant_name = this.props.participant;
        return (
            <div>
                <a className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-gray" href="#0" onClick={() => this.props.onClick(String(participant_name))}>{participant_name}</a>
            </div>
        );
    }
}

export default Button;