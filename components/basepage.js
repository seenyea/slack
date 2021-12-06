import React, { Component } from "react";
import { add, detory } from "@store";

export default class BasePage extends Component {
    componentDidMount(){
        const id = this.componentId;
        if(id){
            add(id, 'update', obj => {
                this.setState({
                    ...obj
                })
            })   
        }
    }

    componentWillUnmount(){
        const id = this.componentId;
        if(id){
            detory(id);
        }
    }
}
