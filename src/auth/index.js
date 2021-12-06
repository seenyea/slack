import React, { Suspense, Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { detectAuthStatus } from './business/index';
import RouteMaps from '../routes';

export default class AuthPage extends Component {

    state = {
        isLogin: true,
        routeName: 'LoginPage'
    }

    componentDidMount(){
        detectAuthStatus();
    }

    render(){
        const { isLogin, routeName } = this.state;
        const maps = isLogin ? [...RouteMaps] : RouteMaps.filter(e => e.name === routeName);
        const { props } = this;
        return <Router>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            {
                                maps.map(route => {
                                    const { path, component, name } = route;
                                    return <Route key={name} exact path={path} component={component} />
                                })
                            }
                            {!isLogin ? <Redirect to={{ pathname: '/login', state: { from: props.location } }} /> : null}
                        </Switch>
                    </Suspense>
                </Router>
    }
}