import React from "react";
import Card from '@components/uis/card';
import Avatar from '@components/uis/avatar';

const { Meta } = Card;

const Description = ({name, desc}) => <div>
    <span style={{color: 'orange', fontWeight: 'bold'}}>@{name}</span> {desc}
</div>

export default ({name = '', avatarSrc='', desc = ''}) => {
    const description = <Description name={name} desc={desc} />
    const props = { title: name,  description };
    if(avatarSrc){
        props.avatar = <Avatar src={avatarSrc} />;
    }
    return <Card style={{ width: 300, marginTop: 16 }}>
        <Meta {...props} />
    </Card>
}