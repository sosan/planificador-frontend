import React, { Component,  } from 'react';
import { IDataEventos } from "./SchedulerGrid";

import moment from 'moment';
import 'moment/locale/es';

import Timeline, {
    TimelineHeaders,
    DateHeader,
    SidebarHeader,
    CustomHeader,
    TodayMarker,
    TimelineMarkers,
    CustomMarker
} from "react-calendar-timeline";
import containerResizeDetector from "react-calendar-timeline/lib/resize-detector/container";

import "react-calendar-timeline/lib/Timeline.css";
import "../css/Timeline.css";

moment().locale('es');

const DRAG_SNAP = 60 * 60 * 24 * 1000;

// https://www.robinwieruch.de/react-pass-props-to-component/

export const ENUM_TIPOS_EVENTOS =
{
    "create": "create",
    "update": "update",
    "delete": "delete"

};




export default class TimelineWrapper extends Component {
    

    constructor(props) {
        super(props);
        
        const _defaultTimeStart = moment().add(-2, 'day');
        const _defaultTimeEnd = moment().add(2, 'day');
        const _visibleTimeStart = moment().add(-5, 'day').valueOf();
        const _visibleTimeEnd = moment().add(15, 'day').valueOf();

        this.state = { 
            groups: this.props.groups,
            items: this.props.items,
            defaultTimeStart: _defaultTimeStart,
            defaultTimeEnd: _defaultTimeEnd,
            visibleTimeStart: _visibleTimeStart,
            visibleTimeEnd: _visibleTimeEnd
        };
        
        console.log('State: ', JSON.stringify(this.state));

    }

    componentDidMount() {
        
    }

    itemRenderer = ({ item, timelineContext, itemContext, getItemProps, getResizeProps }) => {
        const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
        // const backgroundColor = itemContext.selected ? (itemContext.dragging ? "red" : item.selectedBgColor) : item.bgColor;
        // const borderColor = itemContext.resizing ? "red" : item.color;
        return (
            <>
                {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}
                <>
                    {itemContext.title}
                </>
                {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
            </>
        );



    };

    groupRenderer = ({ group }) => {
        return (
            <div className="custom-group">
                <span className="title anchura_minimo">{group.title}</span>
                <span className="title anchura_minimo">{group.clasevehiculo}</span>
                <span className="title anchura_minimo anchura_minimo_modelo">{group.modelo}</span>
            </div>
        )
    }


    handleItemMove = (itemId, dragTime, newGroupOrder) => {
        
        if (dragTime + DRAG_SNAP < new Date().getTime()) return;
        
        const { items, groups } = this.state;

        const group = groups[newGroupOrder];

        let devItems = [];
        for (let i = 0; i < items.length; i++) 
        {
            if (items[i].id === itemId) 
            {
                const fechaDestino = new Date(dragTime);
                const fechaDestinoStart = fechaDestino.setHours(0, 0, 0, 0);
                const fechaDestinoEnd = fechaDestino.setHours(23, 59, 59, 0);
                
                items[i].start_time = moment(fechaDestinoStart); //new Date(fechaDestinoStart);
                items[i].end_time = moment(fechaDestinoEnd); //new Date(fechaDestinoEnd);
                items[i].group = group.id;
                
            }
            devItems.push(items[i]);
            
        }
        
        this.setState({ "items": devItems});
        
    };

    handleItemResize = (itemId, time, edge) => {
        const { items } = this.state;
        console.log('handleItemResize', edge)

        this.setState({
            items: items.map(item =>
                item.id === itemId
                    ? Object.assign({}, item, {
                        start: edge === "left" ? time : item.start_time,
                        end: edge === "rigt" ? time : item.end_time,
                    })
                    : item
            )
        });

        console.log("Resized", itemId, time, edge);
    };

    handleTimeChange = (visibleTimeStart, visibleTimeEnd) => {
        console.log(
            "time change",
            moment(visibleTimeStart, "x").format(),
            moment(visibleTimeEnd, "x").format()
        );
        this.setState({
            visibleTimeStart,
            visibleTimeEnd,
            scrolling: true
        });
    };


    
    render() {

        return (
            <div>
                <Timeline
                    groups={this.state.groups}
                    items={this.state.items}
                    resizeDetector={containerResizeDetector}
                    defaultTimeStart={this.state.defaultTimeStart}
                    defaultTimeEnd={this.state.defaultTimeEnd}
                    visibleTimeStart={this.state.visibleTimeStart}
                    visibleTimeEnd={this.state.visibleTimeEnd}
                    fullUpdate
                    dragSnap={DRAG_SNAP}
                    itemTouchSendsClick={false}
                    groupRenderer={this.groupRenderer}
                    stackItems={true}
                    sidebarWidth={270}
                    itemHeightRatio={1}
                    canMove={true}
                    canResize={"both"}
                    onItemMove={this.handleItemMove}
                    onItemResize={this.handleItemResize}
                    useResizeHandle={true}
                    onTimeChange={this.handleTimeChange}
                    // minZoom={10 * 24 * 60 * 60 * 1000}
                    // maxZoom={10 * 24 * 60 * 60 * 1000}
                    // itemRenderer={this.itemRenderer}
                >
                    <TimelineMarkers>
                        <TodayMarker>
                            {({ styles, date }) =>
                                <div style={{ ...styles, backgroundColor: "red", width: "4px" }} />
                            }
                        </TodayMarker>
                    </TimelineMarkers>

                    <TimelineHeaders>
                        <SidebarHeader>
                            {({ getRootProps }) => {
                                return <div {...getRootProps()}>Left</div>
                            }}
                        </SidebarHeader>
                        <DateHeader unit="month" />
                        <DateHeader unit="day" style={{ height: 50 }} />
                        {/* <CustomHeader height={50} headerData={{ someData: 'data' }} unit="year">
                            {({
                                headerContext: { intervals },
                                getRootProps,
                                getIntervalProps,
                                showPeriod,
                                data,
                            }) => {
                                return (
                                    <div {...getRootProps()}>
                                        {intervals.map(interval => {
                                            const intervalStyle = {
                                                lineHeight: '30px',
                                                textAlign: 'center',
                                                borderLeft: '1px solid black',
                                                cursor: 'pointer',
                                                backgroundColor: 'gray',
                                                color: 'white'
                                            }
                                            return (
                                                <div
                                                    onClick={() => {
                                                        showPeriod(interval.startTime, interval.endTime)
                                                    }}
                                                    {...getIntervalProps({
                                                        interval,
                                                        style: intervalStyle
                                                    })}
                                                >
                                                    <div className="sticky">
                                                        {interval.startTime.format('YYYY')}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            }}
                        </CustomHeader> */}
                        
                       
                    </TimelineHeaders>
                </Timeline>
            </div>
        );
    }



}