import React from "react";
import './App.css';
import {Header} from "./components/header/Header";
import {AuthContextHOC} from "./context/Auth.context";
import { Provider } from 'react-redux'
import {store} from "./redux/store";
import {LoginModal} from "./components/modal/LoginModal";
import {Main} from "./Main";

function App() {

    return (
        <div>
            <Provider store={store}>
                    <AuthContextHOC>
                        <Header />
                        <Main />
                        <LoginModal />
                    </AuthContextHOC>
            </Provider>
        </div>
    )
}

export default App