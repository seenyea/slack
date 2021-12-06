import { hgRequest } from '@libs/request';
import { io } from "socket.io-client";
import { success } from '@components/notice'

export const initSocket = ({url = 'http://127.0.0.1:3000', context}) => {
    const socket = io(url);
    socket.on('open', () => {
        console.log('socket io is open !');
    });

    socket.on('notify somebody', d => {
        console.log('notify somebody =>', d)
        success(d.msg);
    });

    socket.on('praise somebody', d => {
        console.log('praise somebody =>', d)
        if(context){
            getpraiselists().then(data => {
                const {
                    lists
                } = data;
                context.setState({lists});
            });
        }
    });

    socket.on('add somebody', d => {
        console.log('add somebody =>', d)
        if(context){
            if(context){
                getpraiselists().then(data => {
                    const {
                        lists
                    } = data;
                    context.setState({lists, userLists: ['admin',...lists.map(e => e.name)]});
                });
            }
        }
    });

    socket.emit('online', {userName: getUserName()})
    return socket;
}

export const getUserName = () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("userName");
    return name || 'admin'
}

export const setUserName = userName => {
    location.href = `http://localhost:9000/?userName=${userName}`
}

export const getpraiselists = () => {
    return hgRequest('/api/getpraiselists');
}