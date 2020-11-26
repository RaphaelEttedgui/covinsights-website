import React, {Component} from 'react';

class Gathering extends Component{
    constructor(props){
        super(props);
        this.state={people:{},}
    }

    render = () => {
        return (
            <div id="Gatherer_container">
                Bonjour
            </div>
        )
    }
}

export default Gathering;