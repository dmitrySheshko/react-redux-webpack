'use strict';

import * as types from './actions-type';

export function changeTestReducer(val){
    return {
        type: types.CHANGE_TEST,
        val
    }
}