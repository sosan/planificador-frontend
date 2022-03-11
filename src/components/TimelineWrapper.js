import React, { Component,  } from 'react';
import {
    IonItem,
    IonFab,
    IonFabButton,
    IonLabel


} from '@ionic/react';

import Sticky from 'react-stickynode';

import { LISTADO_IMAGENES_COCHES } from "../datos/imagenescoches";

// import { IDataEventos } from "./SchedulerGrid";

import moment from 'moment';
import 'moment/locale/es';

import Timeline, {
    TimelineHeaders,
    DateHeader,
    SidebarHeader,
    TodayMarker,
    TimelineMarkers,
    
} from "react-calendar-timeline";
import containerResizeDetector from "react-calendar-timeline/lib/resize-detector/container";

import "react-calendar-timeline/lib/Timeline.css";
import "../css/TimelineCustom.css";

moment().locale('es');

const DRAG_SNAP = 60 * 60 * 24 * 1000;

// https://www.robinwieruch.de/react-pass-props-to-component/

export default class TimelineWrapper extends Component {
    
    // _visibleTimeStart = 0;
    // _visibleTimeEnd = 0;

    constructor(props) {
        super(props);
        
        const _defaultTimeStart = moment().add(-2, 'day');
        const _defaultTimeEnd = moment().add(2, 'day');
        // this._visibleTimeStart = moment().add(-5, 'day').valueOf();
        // this._visibleTimeEnd = moment().add(15, 'day').valueOf();

        this.state = { 
            groups: this.props.groups,
            items: this.props.items,
            onDoubleClicked: this.props.onDoubleClicked,
            subalquileres: this.props.subalquileres,
            defaultTimeStart: _defaultTimeStart,
            defaultTimeEnd: _defaultTimeEnd,
            visibleTimeStart: this.props.visibleTimeStartProp,
            visibleTimeEnd: this.props.visibleTimeEndProp
        };
        
        // console.log('estado primigenio: ', JSON.stringify(this.state));

    }

    
    // itemRenderer = ({ item, timelineContext, itemContext, getItemProps, getResizeProps }) => {
    //     // const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    //     // const backgroundColor = itemContext.selected ? (itemContext.dragging ? "red" : item.selectedBgColor) : item.bgColor;
    //     // const borderColor = itemContext.resizing ? "red" : item.color;
    //     const titulo = `${itemContext.title} ID: ${ item.id } GROUP: ${item.group}`;
    
    //     return (
    //         <>
    //             {itemContext.title}
    //             {/* <div>{titulo}</div> */}
                
    //         </>
    //     );



    // };

    groupRenderer = ( {group: elementGroup} ) => {

        // const key = elementGroup.vehiculo;
        // elementGroup["srcImage"] = LISTADO_IMAGENES_COCHES[key];

        return (
            <>
                <IonItem key={elementGroup.matricula} className="flex-izquierda">
                    <IonLabel className="custom-group">
                        <span className="title anchura_minimo alineacion-matricula">{elementGroup.matricula}</span>
                        <span className="title anchura_minimo alineacion-clasevehiculo">{elementGroup.clasevehiculo.toUpperCase()}</span>
                        <span className="title anchura_minimo anchura_minimo_modelo alineacion-modelo">{elementGroup.modelo}</span>
                    </IonLabel>
                </IonItem>
            </>
        )
    }


    handleItemMove = (itemId, dragTime, newGroupOrder) => {
        
        if (dragTime + DRAG_SNAP < new Date().getTime()) return;
        
        const { items, groups } = this.state;

        const group = groups[newGroupOrder];

        if (group === undefined || group.id === undefined) return;

        let devItems = [];
        for (let i = 0; i < items.length; i++) 
        {
            if (items[i].id === itemId) 
            {
                const fechaDestino = new Date(dragTime);
                const fechaDestinoStart = fechaDestino.setHours(0, 0, 0, 0);
                const fechaDestinoEnd = fechaDestino.setHours(23, 59, 59, 0);
                
                items[i].start_time = moment(fechaDestinoStart);
                items[i].end_time = moment(fechaDestinoEnd);
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

        // this._visibleTimeStart = visibleTimeStart;
        // this._visibleTimeEnd = visibleTimeEnd;
        // this.forceUpdate();

        this.setState({
            visibleTimeStart,
            visibleTimeEnd,
            scrolling: true
        });
    };

    onZoom = (timelineContext, unit) =>
    {


    };

    componentDidMount() {

    }
    
    render() {

        const { groups, items } = this.props;

        return (
            <div style={{ marginTop: `${this.props.marginTop}px`, marginBottom: `${this.props.marginBottom}px` }}>
                
                <Timeline
                    scrollableContainer={this.state.scrollableContainer}
                    groups={groups}
                    items={items}
                    resizeDetector={containerResizeDetector}
                    
                    
                    defaultTimeStart={this.state.defaultTimeStart}
                    defaultTimeEnd={this.state.defaultTimeEnd}
                    visibleTimeStart={this.state.visibleTimeStart}
                    visibleTimeEnd={this.state.visibleTimeEnd}
                    
                    useResizeHandle={true}
                    fullUpdate

                    dragSnap={DRAG_SNAP}
                    itemTouchSendsClick={false}
                    groupRenderer={this.groupRenderer}
                    
                    stackItems={true}
                    sidebarWidth={300}
                    
                    itemHeightRatio={1}
                    canMove={false}
                    canResize={false}

                    
                    
                    onTimeChange={this.handleTimeChange}
                    onCanvasDoubleClick={(groupId, time, evento) => { this.props.onDoubleClicked(groupId, time, evento); } }
                    onItemDoubleClick={(itemId, e, time) => { this.props.onItemDoubleClick(itemId, e, time ); }  }
                    minZoom={60 * 60 * 1000 * 24 * 16}
                    maxZoom={60 * 60 * 1000 * 24 * 16}
                    onZoom={this.onZoom}

                >
                    <TimelineMarkers>
                        <TodayMarker>
                            {({ styles, date }) =>
                                <div style={{ ...styles, backgroundColor: "red", width: "4px", zIndex: "100" }} />
                            }
                        </TodayMarker>
                    </TimelineMarkers>
                    
                    <TimelineHeaders className={ (this.props.stickyHeader === true) ? "sticky-header"  : "" } >
                        <SidebarHeader>
                            {({ getRootProps }) => {
                                
                                return <div {...getRootProps()}>
                                    <IonItem key="matriculas" className="flex-izquierda">
                                        <IonLabel className="custom-group margen-group">
                                            <span className="title anchura_minimo alineacion-matricula">MATRICULA</span>
                                            <span className="title anchura_minimo alineacion-clasevehiculo">CLASE</span>
                                            <span className="title anchura_minimo anchura_minimo_modelo alineacion-modelo">MODELO</span>
                                        </IonLabel>
                                    </IonItem>
                                    {
                                        (this.props.anadirBotonPreservar === false) ? null:
                                            <IonFab className="poscion-fija-anadir-reserva" slot="fixed" vertical="top" horizontal="start" >
                                                <IonFabButton onClick={this.props.onClickAnadirPreReserva } className="boton-anadir-prereserva">+ Añadir</IonFabButton>
                                            </IonFab>
                                    }
                                </div>
                            }}
                        </SidebarHeader>
                        <DateHeader 
                            {...{
                                intervalRenderer: ({ getIntervalProps, intervalContext }) => {
                                    const { style, onClick, key } = getIntervalProps();

                                    const itemHeader = <>
                                        <div key={key} style={style} className="rct-dateHeader" onClick={() => null } >
                                            <span className='espaciado-header'>
                                                <b className='margen-izquierda-timeline-header texto-primer-header-timeline'>{intervalContext.intervalText}</b>
                                                <b className='texto-primer-header-timeline'>{intervalContext.intervalText}</b>
                                                <b className='texto-primer-header-timeline'>{intervalContext.intervalText}</b>
                                                <b className='margen-derecha-timeline-header texto-primer-header-timeline'>{intervalContext.intervalText}</b>

                                            </span>

                                        </div>
                                    </>
                                    return itemHeader;
                                },
                            }}
                        unit="month" />
                        <DateHeader unit="day" 
                            {...{
                                intervalRenderer: ({ getIntervalProps, intervalContext }) => {
                                    const { style, onClick, key } = getIntervalProps();
                                    let dia = intervalContext.intervalText.toString().split(" ")[1];
                                    if (dia === undefined)
                                    {
                                        dia = intervalContext.intervalText;
                                    }
                                    const itemHeader = <>
                                        <div key={key} style={style} className="rct-dateHeader" onClick={() => null} >
                                            <span className='sub-header'>
                                                <b className='noselect'>{dia}</b>
                                            </span>

                                        </div>
                                    </>
                                    return itemHeader;
                                },
                            }}
                        />
                    </TimelineHeaders>

                </Timeline>
            </div>
        );
    }



}