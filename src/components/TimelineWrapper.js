import React, { Component,  } from 'react';
import { IDataEventos } from "./SchedulerGrid";

import moment from 'moment';
import 'moment/locale/es';

import Timeline, {
    TimelineHeaders,
    DateHeader,
    SidebarHeader,
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
        
        // this.state = {};

        const _defaultTimeStart = moment().add(-2, 'day');
        const _defaultTimeEnd = moment().add(2, 'day');
        const _visibleTimeStart = moment().add(-25, 'day').valueOf();
        const _visibleTimeEnd = moment().add(25, 'day').valueOf();

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


    handleItemMove = (itemId, dragTime, newGroupOrder) => {
        
        if (dragTime + DRAG_SNAP < new Date().getTime()) return;
        
        const { items, groups } = this.state;

        const group = groups[newGroupOrder];
        // this.setState({
        //     items: items.map(item =>
        //         item.id === itemId
        //             ? Object.assign({}, item, {
        //                 start_time: dragTime,
        //                 end_time: dragTime + (item.end_time - item.start_time),
        //                 group: group.id
        //             })
        //             : item
        //     )
        // });


        // console.log("antes " + JSON.stringify(items));
        let devItems = [];
        for (let i = 0; i < items.length; i++) 
        {
            if (items[i].id === itemId) 
            {
                // items[i].start_time = dragTime;
                // items[i].end_time = dragTime + (items[i].end_time - items[i].start_time);
                // items[i].group = group.id;
                
                
                const fechaDestino = new Date(dragTime);
                
                // const endTimeConversion = new Date(items[i].end_time);
                // const startTimeConversion = new Date(items[i].start_time);
                const fechaDestinoStart = fechaDestino.setHours(0, 0, 0, 0);
                const fechaDestinoEnd = fechaDestino.setHours(23, 59, 59, 0);
                
                items[i].start_time = new Date(fechaDestinoStart);
                items[i].end_time = new Date(fechaDestinoEnd);
                items[i].group = group.id;
                
            }
            devItems.push(items[i]);
            
        }
        
        this.setState({ "items": devItems});
        // console.log("despues " + JSON.stringify(items));


        console.log(`Moved ${itemId} ${dragTime} ${newGroupOrder}`);
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

        // const { 
        //     groups,
        //     items,
        //     defaultTimeStart,
        //     defaultTimeEnd,
        //     visibleTimeStart,
        //     visibleTimeEnd
        // } = this.state;

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
                    stackItems
                    itemHeightRatio={0.75}
                    canMove={true}
                    canResize={"both"}
                    onItemMove={this.handleItemMove}
                    onTimeChange={this.handleTimeChange}
                    onItemResize={this.handleItemResize}
                    
                    // itemRenderer={this.itemRenderer}
                    useResizeHandle={true}
                >
                    <TimelineMarkers>
                        <TodayMarker>
                            {({ styles, date }) =>
                                <div style={{ ...styles, backgroundColor: "red", width: "4px" }} />
                            }
                        </TodayMarker>

                    </TimelineMarkers>

                    <TimelineHeaders className="sticky">
                        <DateHeader unit="primaryHeader" />
                        <DateHeader />
                    </TimelineHeaders>
                </Timeline>
            </div>
        );
    }



}