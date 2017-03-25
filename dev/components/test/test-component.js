'use strict';

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SubTest1 from './subtest1-component';
import SubTest2 from './subtest2-component';

class Test extends React.Component {

    constructor(props){
        super(props);

    }

    render(){
        return(
            <div>

                Main test component
                <Switch>
                    <Route path='/test/sub1' component={ SubTest1 } />
                    <Route path='/test/sub2' component={ SubTest2 } />
                    <Route path='/test/:sub' component={ SubTest1 } />
                </Switch>
            </div>
        );
    }
}

export default Test;