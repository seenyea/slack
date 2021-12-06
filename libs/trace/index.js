export const logError = (o) => {
    if(console && console.error){
        console.error(o);
    }
}

export const logInfo = (o) => {
    if(console && console.info){
        console.info(o);
    }
}