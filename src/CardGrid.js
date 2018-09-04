import React from 'react';
import * as Utils from './Utils';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { ViewsIcon, CommentsIcon, LikesIcon } from './FeatherIcons';
import { Motion, spring } from 'react-motion';

//////////////////////////////////////////////

const CardGridDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2px;

  ${breakpoint('tablet')`
    padding: 0 39px;
  `}
`;

const CardDiv = styled.div`
  display: block;
  width: calc(100% / 2 - 2px);
  padding: 1px;

  ${breakpoint('tablet')`
    width: calc(100% / 3 - 2px);
  `}
  ${breakpoint('desktop')`
    width: calc(100% / 4 - 2px);
  `}
`;

const ContentDiv = styled.div`
    background: white;
    padding: 16px;
`;

const StatsDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-top: 16px;
`;

const StatsDivItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;
    color: #aaaaaa;
    padding-left: 12px;
`;

const PreviewImg = styled.img`
    width: 100%;
`;

const DescriptionDiv = styled.div`
    position: absolute;
    background: rgba(255,255,255,.96);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    #title {
        color: #444;
        font-size: 14px;
        font-weight: 600;
        padding-bottom: .75em;
    }
    #description {
        color: #777;
        font-size: 11px;
        line-height: 1.5em;
    }
    #created-at {
        color: #777;
        font-size: 12px;
        position: absolute;
        bottom: 0;
    }
`;

const ImageShotDiv = styled.div`
    position: relative;
    overflow: hidden;
    cursor: pointer;
`;

const GifTargetDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 50%;
    top: 0;
    left: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
    >div {
        font-size: 8px;
        padding: 2px 3px;
        border: 1px solid #333;
        background: white;
        font-weight: 600;
    }
`;

const DescriptionTargetDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 50%;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
`;

//////////////////////////////////////////////

const Description = ({ title, description, createdAt, style }) => (
    <DescriptionDiv style={style}>
        <div id='title'>{title}</div>
        <div id='description'>{Utils.cleanse(description)}</div>
        <div id='created-at'>{Utils.formatDate(createdAt)}</div>
    </DescriptionDiv>
);

const PreviewImage = ({ url }) => (
    <PreviewImg src={url} />
);

const DescriptionOverlay = ({ shot, visible }) => (
    <Motion style={{ opacity: spring(visible ? 1 : 0) }}>
        {
            ({ opacity }) => (
                <Description
                    title={shot.title}
                    description={shot.description}
                    createdAt={shot.created_at}
                    style={{ opacity }}
                />
            )
        }
    </Motion>
);

const GifTarget = ({ onMouseEnter, onMouseLeave }) => (
    <GifTargetDiv onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div>GIF</div>
    </GifTargetDiv>
);

const DescriptionTarget = ({ onMouseEnter, onMouseLeave }) => (
    <DescriptionTargetDiv onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
)

class ImageShot extends React.Component {
    state = {
        previewMode: 'teaser'
    }
    handleMouseEnterGifTarget = () => this.setState({ previewMode: 'animated' });
    handleMouseEnterDescTarget = () => this.setState({ previewMode: 'description' });
    handleMouseLeave = () => this.setState({ previewMode: 'teaser' });
    render() {
        const { shot } = this.props;
        const gifImg = this.state.previewMode === 'animated' ? shot.images.hidpi : shot.images.teaser;
        return (
            <ImageShotDiv>
                <PreviewImage url={gifImg} />
                <DescriptionOverlay
                    shot={shot}
                    visible={this.state.previewMode === 'description'}
                />
                <DescriptionTarget
                    onMouseEnter={this.handleMouseEnterDescTarget}
                    onMouseLeave={this.handleMouseLeave}
                />
                {shot.animated && (
                    <GifTarget
                        onMouseEnter={this.handleMouseEnterGifTarget}
                        onMouseLeave={this.handleMouseLeave}
                    />
                )}

            </ImageShotDiv>
        );
    }
};

const Stats = ({ shot }) => (
    <StatsDiv>
        <StatsDivItem><ViewsIcon />{shot.views_count}</StatsDivItem>
        <StatsDivItem><CommentsIcon />{shot.comments_count}</StatsDivItem>
        <StatsDivItem><LikesIcon />{shot.likes_count}</StatsDivItem>
    </StatsDiv>
);

const Content = ({ shot }) => (
    <ContentDiv >
        <ImageShot shot={shot} />
        <Stats shot={shot} />
    </ContentDiv >
);

const Card = ({ shot }) => (
    <CardDiv>
        <Content shot={shot} />
    </CardDiv>
);

const CardGrid = ({ shots }) => (
    <CardGridDiv>
        {shots.map(shot => (
            <Card shot={shot} key={shot.id} />
        ))}
    </CardGridDiv>
);

export default CardGrid;