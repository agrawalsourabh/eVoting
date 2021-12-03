import React from "react";
import Button from "./Button";

class Participant extends React.Component{
    render(){
        const participant = this.props.participant;
        const vote = this.props.vote;
        return(
            <div className= 'center w-25 pa3 mr2'>
                <p> Votes: {vote} </p>
                <Button participant={participant} onClick={this.props.onClick}/>
            </div>
        );
    }
}

export default Participant;