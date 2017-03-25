'use strict';

import React from 'react';
import { connect } from 'react-redux';
import User from './user';
import { getUsers } from '../../store/actions/users-actions';

import UsersMenu from '../../modules/menu/users-menu-module';

import users from './users.json';

class Users extends React.Component {

    constructor(props){
        super(props);
        this.getUsers = this.getUsers.bind(this);

        this.getUsers();
    }

    getUsers(){
        if(this.props.users.length === 0){
            this.props.getUsers(users);
        }
    }

    render(){

        return(
            <div>
                <UsersMenu />
                <div className='users-list'>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Avatar</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                            </tr>
                            {
                                this.props.users.map((user, n) => {
                                    return <User key={ n } user={ user }/>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>


        );
    }
}
function mapStateToProps(state){
    return {
        users: state.usersReducer.users
    }
}
export default connect(mapStateToProps, { getUsers })(Users);