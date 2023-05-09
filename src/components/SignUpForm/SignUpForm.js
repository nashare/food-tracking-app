import { Component } from 'react';

/*
1) Creation phase - when the component first mounts to the DOM
2) Update phase - when state changes and the component needs to be re-rendered
3) Destruction Phase - when the UI needs to be replaced with a newer version

*/

export default class SignUpForm extends Component {
    render() {
        return (
            <div>
                SignUpForm
            </div>
        );
    }
}