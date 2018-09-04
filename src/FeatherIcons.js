import React from 'react';
import { Eye, MessageCircle, Heart } from 'react-feather';

const style = {
    width: 14,
    paddingRight: 4
};

export class ViewsIcon extends React.Component {
    render() {
        return <Eye style={style} />
    }
}

export class CommentsIcon extends React.Component {
    render() {
        return <MessageCircle style={style} />
    }
}

export class LikesIcon extends React.Component {
    render() {
        return <Heart style={style} />
    }
}