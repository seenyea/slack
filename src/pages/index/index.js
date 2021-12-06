
import React from "react";
import BasePage from '@components/basepage';
import { Layout, Menu, Breadcrumb, Select, Input, Button } from '@components/uis';

import PraiseCard from './components/basic/praisecard';
import { initSocket, getpraiselists, getUserName, setUserName } from './business';

const { Header, Content, Footer } = Layout;
import "@static/pages/index.less";

export default class IndexPage extends BasePage {
    constructor(porps){
        super(porps);
        this.socket = null;
        this.state = {
            userName: getUserName(),
            userLists: [
                'admin'
            ],
            command: 'appenpraise',
            bottonText: 'To Wall',
            name: '',
            desc: '',
            lists: []
        }
    }

    componentDidMount(){
        getpraiselists().then(data => {
            const {
                lists
            } = data;
            this.socket = initSocket({
                url: 'http://127.0.0.1:3000', 
                context: this
            });
            this.setState({lists, userLists: ['admin', ...lists.map(e => e.name)]});
        })
    }

    render() {
        const { lists, command, bottonText, name, desc, userName, userLists } = this.state;
        return <Layout className="layout">
            <Header style={{ textAlign: 'center', position: 'fixed', top: 0, width: '100%', zIndex: 100 }}>
                <div style={{textAlign: 'center', color: '#fff', fontSize: 30}}>
                    Praise Wall
                </div>
            </Header>
            <Content style={{ padding: '90px 50px' }}>
                <div className="site-layout-content">
                    {lists.map((list, index) => {
                        const { name, desc, avatarSrc = null } = list;
                        return <PraiseCard key={index} name={name} desc={desc} avatarSrc={avatarSrc} />
                    })}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>
                <Input.Group compact>
                    <Select value={userName} style={{width: 100, marginRight: 30}} onChange={value => {
                        this.setState({
                            userName: value
                        }, () => {
                            setUserName(value);
                        });
                    }}>
                        {userLists.map((value, index) => {
                            return <Option key={index} value={value}>{value}</Option>
                        })}
                    </Select>
                    {userName === 'admin' ? <Select value={command} style={{width: 200}} onChange={value => {
                        this.setState({
                            command: value,
                            bottonText: value === 'appenpraise' ? 'To Wall' : 'Praise'
                        });
                    }}> 
                        <Option value="appenpraise">Appenpraise</Option>
                        <Option value="praise">Praise</Option>
                    </Select> : null}
                    {userName === 'admin' ? <Input style={{width: 100}} value={name} placeholder="input name" onChange={e => {
                        this.setState({
                            name: e.target.value
                        });
                    }} /> : null}
                    {userName === 'admin' ? <Input style={{width: 400}} value={desc} placeholder="did something great! Congratulations to him!" onChange={e => {
                        this.setState({
                            desc: e.target.value
                        });
                    }} /> : null}
                    {userName === 'admin' ? <Button type="primary" onClick={() => {
                        if(this.socket){
                            if(name){
                                const evtName = command === 'appenpraise' ? 'add somebody' : 'praise somebody';
                                const data = {command, name, desc};
                                this.socket.emit(evtName, {data});
                            }
                        }
                    }}>{bottonText}</Button> : null}
                </Input.Group>
            </Footer>
        </Layout>
    }
}
