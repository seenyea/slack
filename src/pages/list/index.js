import React from "react";
import BasePage from '@components/basepage';
import '@static/app.css';
import app from '@static/app.m.css';

export default class ListPage extends BasePage {
    render() {
        return <div className="title">
            <span className={app.title}>List Page</span>
        </div>
    }
}
