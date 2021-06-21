import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from "./pages/AuthPage";
import {BoardPage} from "./pages/BoardPage";
import {GuidePage} from "./pages/GuidePage";
import {ViewPage} from "./pages/ViewPage";
import {AdminPage} from "./pages/AdminPage";
// import { ViewPage2 } from "./pages/ViewPage2";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/main' exact>
                    <BoardPage/>
                </Route>
                <Route path='/view/:id' >
                    <ViewPage/>
                </Route>
                <Route path='/guide' >
                    <GuidePage/>
                </Route>
                <Route path='/admin' >
                    <AdminPage/>
                </Route>
                <Redirect to='/main' />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage/>
            </Route>
            <Redirect to='/'/>
        </Switch>
    )
}