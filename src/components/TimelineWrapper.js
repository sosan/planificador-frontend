import React, { Component,  } from 'react';
import {
    IonItem,
    IonFab,
    IonFabButton,
    IonLabel,
    IonButton


} from '@ionic/react';

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
    

    lastTouchTime = 0;
    DOUBLE_CLICK_THRESHOLD = 700;

    constructor(props) {
        super(props);
        
        const _defaultTimeStart = moment().add(-2, 'day');
        const _defaultTimeEnd = moment().add(2, 'day');
        // https://github.com/facebook/react/issues/6436
        // this.testing = this.testing.bind(this);
        // this.testing.options = { passive: false };

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

    itemRenderer = ({ item, itemContext, getItemProps, getResizeProps }) => {
        const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
        const obj = getItemProps();
        // 
        return (
            <div {...getItemProps(item.itemProps)} onTouchStart={(evento) => this.onItemDoubleTouch(evento, item)} onDoubleClick={ (evento) => { this.onItemDoubleClick(evento, item); } } >
                <div className="rct-item-content" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
                    {itemContext.title}
                </div>
            </div>
        )
    };

    onItemDoubleClick = (evento, item) => {

        this.props.onItemDoubleClick(item.id, evento, evento.timeStamp); 

    }

    onItemDoubleTouch = (evento, item) =>
    {

        const now = Date.now();

        if (Math.abs(now - this.lastTouchTime) <= this.DOUBLE_CLICK_THRESHOLD)
        {
            this.lastTouchTime = 0;
            console.log("doble click");
            this.props.onItemDoubleClick(item.id, evento, evento.timeStamp); 

        } else {
            this.lastTouchTime = now;
        }
        
    }

    onZoom = (timelineContext, unit) => {


    };


    groupRenderer = ( {group: elementGroup} ) => {

        return (
            <>
                <IonItem key={elementGroup.matricula} className="flex-izquierda">
                    <IonLabel className="custom-group">
                        <span className="title anchura_minimo alineacion-matricula">{elementGroup.matricula}</span>
                        <span className="title anchura_minimo alineacion-clasevehiculo">{elementGroup.clasevehiculo}</span>
                        <span className="title anchura_minimo anchura_minimo_modelo alineacion-modelo">{elementGroup.modelo}</span>
                    </IonLabel>
                </IonItem>
            </>
        )
    }


    handleTimeChange = (visibleTimeStart, visibleTimeEnd) => {

        this.setState({
            visibleTimeStart,
            visibleTimeEnd,
            scrolling: true
        });
    };



    componentDidMount() {

    }

    // testing(itemId, e, time)
    // {
    //     console.log("2clicked item")
    //     // e.stopPropagation();
    // }
    
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
                    sidebarWidth={240}
                    
                    itemHeightRatio={1}
                    canMove={false}
                    canResize={false}

                    itemRenderer={this.itemRenderer}

                    onTimeChange={this.handleTimeChange}
                    onCanvasClick={ () => { console.log("canvas click")} }
                    // onItemDoubleClick={this.testing}
                    // onItemClick={() => { console.log("clicked item") } }
                    // onItemDoubleClick={ () => { console.log("sdkfjksldf")} } 

                    // https://github.com/facebook/react/issues/6436
                    // onCanvasDoubleClick={(groupId, time, evento) => { this.props.onDoubleClicked(groupId, time, evento); } }
                    // onItemDoubleClick={(itemId, e, time) => { this.props.onItemDoubleClick(itemId, e, time); }  }
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
                                            <span className="title anchura_minimo alineacion-matricula">Matricula</span>
                                            <span className="title anchura_minimo alineacion-clasevehiculo">Clase</span>
                                            <span className="title anchura_minimo anchura_minimo_modelo alineacion-modelo">Modelo</span>
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