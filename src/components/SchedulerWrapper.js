// https://www.codeproject.com/Articles/249921/How-to-Build-a-Room-Booking-Calendar-with-dhtmlxSc
// https://docs.dhtmlx.com/scheduler/custom_events_content.html
// https://docs.dhtmlx.com/scheduler/custom_lightbox_editor.html
// https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html


import React, { Component } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import 'dhtmlx-scheduler/codebase/locale/locale_es';
import "../css/Scheduler.css"
import {htmlLightBox} from "../componentsHtml/renderLightBox.js";

const scheduler = window.scheduler;



export const ENUM_TIPOS_EVENTOS = 
{
    "create": "create",
    "update": "update",
    "delete": "delete"

};

function restarDias(event) {

    let cantidadDias = document.getElementById("numero_dias").value - 0;
    if (cantidadDias) {
        cantidadDias--;
        document.getElementById("numero_dias").value = cantidadDias;
    }
}

function anadirDias(event) {
    let cantidadDias = document.getElementById("numero_dias").value - 0;
    if (cantidadDias !== undefined) {
        cantidadDias++;
        document.getElementById("numero_dias").value = cantidadDias;
    }
}

export default class SchedulerWrapper extends Component {


    // constructor()
    // {
    //     super();
        

    // }

    removeEventListener()
    {

        // const menosBoton = document.getElementById('boton_menos_lightbox');
        document.removeEventListener("click", restarDias(), true);

        // const masBoton = document.getElementById('boton_mas_lightbox');
        document.removeEventListener("click", anadirDias(), true);
    }

    initSchedulerEvents() {
        if (scheduler._$initialized) {
            return;
        }

        const onDataUpdated = this.props.onDataUpdated;

        scheduler.attachEvent('onEventAdded', (id, ev) => {
            console.log("create");
            if (onDataUpdated) {
                onDataUpdated(ENUM_TIPOS_EVENTOS.create, ev, id);
            }

            
        });

        scheduler.attachEvent('onEventChanged', (id, ev) => {
            console.log("update");
            if (onDataUpdated) {
                onDataUpdated(ENUM_TIPOS_EVENTOS.update, ev, id);
            }

            this.removeEventListener();

        });

        scheduler.attachEvent('onEventDeleted', (id, ev) => {
            console.log("delete");
            if (onDataUpdated) {
                onDataUpdated(ENUM_TIPOS_EVENTOS.delete, ev, id);
            }
            this.removeEventListener();
        });

        scheduler.attachEvent("onTemplatesReady", function (id, ev) {
            console.log("ontemplatesready");

        });

        scheduler._$initialized = true;
    }

    

   

    componentDidMount() 
    {

        scheduler.skin = 'material';
        scheduler.config.header = [
            'day',
            'week',
            'month',
            'date',
            'prev',
            'today',
            'next'
        ];

        scheduler.form_blocks["custom_lightbox"] = 
        {
            render: function (sns) {
                return htmlLightBox;
            },
            set_value: function (node, value, ev) {
                // console.log("ev=" + JSON.stringify(ev) + " node" + JSON.stringify( node) + " value=" + value) ;
                node.querySelector("[name='numero_dias']").value = ev.numero_dias || "3";

                const radioSelected = document.getElementById(ev.personChoosed);
                if (radioSelected)
                {
                    radioSelected.checked = true;
                }

                const boton_menos_lightbox = document.getElementById('boton_menos_lightbox');
                boton_menos_lightbox.addEventListener("click", restarDias, true);

                const boton_mas_lightbox = document.getElementById('boton_mas_lightbox');
                boton_mas_lightbox.addEventListener("click", anadirDias, true);

            },
            get_value: function (node, ev) {
                // ev.numerodiasEv = node.querySelector("[name='numero_dias']").value;
                // ev.timeLightboxEv = node.querySelector("[name='timeLightbox']").value;
                // const seleccion = node.querySelector("[name='persona']").value;
                // console.log("selccion=" + seleccion  );
                // ev.personChoosed = node.querySelector("[name='persona']").value;

                const allRadios = document.querySelectorAll("[name='persona']");
                if (allRadios)
                {
                    for (let i = 0; i < allRadios.length; i++)
                    {
                        if (allRadios[i].checked === true)
                        {
                            ev.personChoosed = allRadios[i].value;
                            break;
                        }

                    }
                }

                ev.numero_dias = node.querySelector("[name='numero_dias']").value;
                // return node.querySelector("[name='numero_dias']").value;
            },
            focus: function (node) {
                // var input = node.querySelector("[name='text']");
                // input.select();
                // input.focus();
            }
        };

        

        scheduler.config.hour_date = '%g:%i %A';
        // auto terminar los eventos
        scheduler.config.event_duration = 60 * 24 * 3;
        scheduler.config.multi_day = true;
        scheduler.config.auto_end_date = true;

        scheduler.xy.scale_width = 70;
        scheduler.config.details_on_dblclick = true;
        scheduler.config.details_on_create = true;

        scheduler.config.show_loading = true;
        
        scheduler.templates.lightbox_header = function (start, end, event) {
            return "Detalles de " + event.text;
        }

        scheduler.config.lightbox.sections = [
            { name: "description", height: 50, type: "textarea", map_to: "text", focus: true },
            { name: "time", height: 72, type: "time", map_to: "auto" },
            { name: "Numero dias", height: 300, type: "custom_lightbox"},
        ];

        this.initSchedulerEvents();

        const { events } = this.props;
        scheduler.init(this.schedulerContainer, new Date(), "week");
        
        scheduler.clearAll();
        scheduler.parse(events);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.timeFormatState !== nextProps.timeFormatState;
    }

    componentDidUpdate() {
        scheduler.render();
    }

    setHoursScaleFormat(state) {
        scheduler.config.hour_date = state ? '%H:%i' : '%g:%i %A';
        scheduler.templates.hour_scale = scheduler.date.date_to_str(scheduler.config.hour_date);
    }

    render() {
        const { timeFormatState } = this.props;
        this.setHoursScaleFormat(timeFormatState);
        return (
            <div
                ref={(input) => { this.schedulerContainer = input }}
                style={{ width: '100%', height: '100%' }}
            ></div>
        );
    }
}