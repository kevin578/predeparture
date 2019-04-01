import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { history } from '@material-ui/icons';
import moment from 'moment';
import {setContent} from '../state/actions'



const Container = styled.div`
    display: ${props=> props.showHistory ? 'block':'none'};
    position: absolute;
    top: 65px;
    right: 15px;
    width: 250px;
    height: 400px;
    padding-top: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    background: #fff;
    z-index: 103;
    overflow: scroll;
    cursor: pointer;
`

const Title = styled.div`
    text-align: center;
    font-weight: bold;
    border-bottom: 1px solid #4c4c4c;
    padding-bottom: 10px;
`

const HistoryContainer = styled.div`
    font-size: 12px;
`

const HistoryItemContainer = styled.div`
    padding: 5px;
    border-bottom: 1px solid #4c4c4c;
`

const History = (props)=> {

    const [currentVersion, setCurrentVersion ] = useState([]);
    useEffect(()=> {
        setCurrentVersion(props.content.contentArray)
    }, [props.showHistory])

    const getHistoryItems = ()=> {
        const convertTime = (timestamp) => {
            return moment(timestamp).format('MMMM Do YYYY, h:mm A');
        }

        return props.content.history.map((item)=> {
            convertTime(item.time)
            return (
                <HistoryItemContainer onClick = {()=> props.setContent(item.content)} key = {item.time}>
                <div>Edit by: {item.user}</div>
                <div>at: {convertTime(item.time)}</div>
                </HistoryItemContainer>
            )
        })
    }

    return (
        <Container showHistory = {props.showHistory}>
            <Title>History</Title>
            <HistoryContainer>
            <HistoryItemContainer onClick = {()=> props.setContent(currentVersion)}>
                Current Version
            </HistoryItemContainer>
                {getHistoryItems()}
            </HistoryContainer>
        </Container>
    )
}

const mapStateToProps = (state)=> ({
    content: state.content
})

export default connect(mapStateToProps, {setContent})(History)
