import React, { useState } from 'react';
import MyTableWithModal from './MyTableWithModal'
import AddCheckList from './Add-Check-List'
import { ADMIN_DASHBOARD_STRINGS } from '../../../utils/constants'


function CheckList() {
    return (
        <>
            <div class="d-flex justify-content-end m-2">
                <button type="button" class="btn btn-primary me-4" data-bs-toggle="modal" data-bs-target="#addprojectmanager">{ADMIN_DASHBOARD_STRINGS.ADD_CHECK_LIST} </button>
            </div>
            <MyTableWithModal />
            <div class="modal fade" id="addprojectmanager" tabindex="-1" aria-hidden="true">
                <AddCheckList />
            </div>
        </>
    )


}

export default CheckList