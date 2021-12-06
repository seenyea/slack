import message from '@components/uis/message';

export const info = (msg) => {
    message.info(msg);
}

export const warn = (msg) => {
    message.warn(msg);
}

export const fail = (msg) => {
    message.error(msg);
}

export const success = (msg) => {
    message.success(msg);
}

export const loading = (msg) => {
    message.loading(msg);
}