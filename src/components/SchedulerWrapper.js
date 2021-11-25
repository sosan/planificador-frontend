// https://www.codeproject.com/Articles/249921/How-to-Build-a-Room-Booking-Calendar-with-dhtmlxSc
// https://docs.dhtmlx.com/scheduler/custom_events_content.html
// https://docs.dhtmlx.com/scheduler/custom_lightbox_editor.html
// https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html


import React, { Component } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import 'dhtmlx-scheduler/codebase/locale/locale_es';
import "../css/Scheduler.css"
import {htmlLightBox} from "../componentsHtml/renderLightBox";

const scheduler = window.scheduler;

export const ENUM_TIPOS_EVENTOS = 
{
    "create": "create",
    "update": "update",
    "delete": "delete"

};

const reflejarDiasFinVisual = (cantidadDias) =>
{

    const [diaInicioElemento, diaFinElemento] = document.getElementsByClassName("dhx_lightbox_day_select");
    const [mesInicioElemento, mesFinElemento] = document.getElementsByClassName("dhx_lightbox_month_select");
    const [anyoInicioElemento, anyoFinElemento] = document.getElementsByClassName("dhx_lightbox_year_select");

    const diaInicio = diaInicioElemento.value;
    const mesInicio = mesInicioElemento.value;
    const anyoInicio = anyoInicioElemento.value;

    const fechaConversionFin = new Date(`${anyoInicio}-${mesInicio}-${diaInicio}`);
    fechaConversionFin.setDate(fechaConversionFin.getDate() + (cantidadDias - 1));

    diaFinElemento.value = fechaConversionFin.getDate();
    mesFinElemento.value = fechaConversionFin.getMonth() + 1;
    anyoFinElemento.value = fechaConversionFin.getFullYear();

};

function restarDias(evento) {

    let cantidadDias = document.getElementById("numero_dias").value - 0;
    if (cantidadDias > 1) 
    {
        cantidadDias--;
        if (cantidadDias <= 1)
        {
            document.getElementsByClassName("dhx_lightbox_time_select")[1].value = "1230";
        }

        document.getElementById("numero_dias").value = cantidadDias;
        
        reflejarDiasFinVisual(cantidadDias);
    }
}

function anadirDias(evento) {
    let cantidadDias = document.getElementById("numero_dias").value - 0;
    if (cantidadDias !== undefined) {
        cantidadDias++;
        document.getElementById("numero_dias").value = cantidadDias;
        reflejarDiasFinVisual(cantidadDias);
    }
}

export default class SchedulerWrapper extends Component {


    // setInitDates(cantidadDias)
    // {
    //     const [diaInicioElemento, diaFinElemento] = document.getElementsByClassName("dhx_lightbox_day_select");
    //     const [mesInicioElemento, mesFinElemento] = document.getElementsByClassName("dhx_lightbox_month_select");
    //     const [anyoInicioElemento, anyoFinElemento] = document.getElementsByClassName("dhx_lightbox_year_select");

    //     const diaInicio = diaInicioElemento.value;
    //     const mesInicio = mesInicioElemento.value;
    //     const anyoInicio = anyoInicioElemento.value;

    //     const fechaConversionFin = new Date(`${anyoInicio}-${mesInicio}-${diaInicio}`);
    //     fechaConversionFin.setDate(fechaConversionFin.getDate() + (cantidadDias - 1));

    //     diaFinElemento.value = fechaConversionFin.getDate();
    //     mesFinElemento.value = fechaConversionFin.getMonth() + 1;
    //     anyoFinElemento.value = fechaConversionFin.getFullYear();

    // }

    removeEventListener()
    {
        document.removeEventListener("click", restarDias(), true);
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

        scheduler.attachEvent("onLightbox", function (event_id) {
            console.log("onlightbox");

            const fechaAhora = new Date();
            const textoFecha = `${fechaAhora.getDate()}-${fechaAhora.getMonth() + 1}-${fechaAhora.getFullYear()}`;
            document.getElementById("fechaentrada").textContent = textoFecha;
        });

        scheduler.attachEvent("onTemplatesReady", function (id, ev) {
            console.log("ontemplatesready");
            
            

        });

        scheduler._$initialized = true;

        

    }

    // obtenerValoresLightBox() {
    //     let valoresLigBox = {};

    //     valoresLigBox["notareserva"] = document.getElementById("notareserva").value;
    //     valoresLigBox["numero_dias"] = document.getElementById("numero_dias").value;
    //     valoresLigBox["garaje"] = document.getElementById("garaje").value;

    //     const allRadios = document.querySelectorAll("persona");
    //     if (allRadios) {
    //         for (let i = 0; i < allRadios.length; i++) {
    //             if (allRadios[i].checked === true) {
    //                 valoresLigBox["personChoosed"] = allRadios[i].value;
    //                 valoresLigBox["color"] = allRadios[i].nonce;
    //                 valoresLigBox["textColor"] = "black";
    //                 break;
    //             }

    //         }
    //     }

    //     return valoresLigBox;
    // }

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
                // reset de la nota
                const allRadioButtons = document.getElementsByClassName("radio_boton");
                for (let i = 0; i < allRadioButtons.length; i++)
                {
                    allRadioButtons[i].checked = false;
                }

                // obtener los numeros de dias por defecto
                const [diaInicioElemento, diaFinElemento] = document.getElementsByClassName("dhx_lightbox_day_select");
                const [mesInicioElemento, mesFinElemento] = document.getElementsByClassName("dhx_lightbox_month_select");
                const [anyoInicioElemento, anyoFinElemento] = document.getElementsByClassName("dhx_lightbox_year_select");
                        
                
                const diaInicio = diaInicioElemento.value;
                const mesInicio = mesInicioElemento.value;
                const anyoInicio = anyoInicioElemento.value;

                const diaFin = diaFinElemento.value;
                const mesFin = mesFinElemento.value;
                const anyoFin = anyoFinElemento.value;

                const fechaConversionInicio = new Date(`${anyoInicio}-${mesInicio}-${diaInicio}`);
                const fechaConversionFin = new Date(`${anyoFin}-${mesFin}-${diaFin}`);

                let numero_diasHtml = 1;
                const fechaTotal = new Date( fechaConversionFin - fechaConversionInicio);
                if (fechaTotal.getDate() === 1)
                {
                    numero_diasHtml = ev.numero_dias || 1;
                }
                else
                {
                    numero_diasHtml = ev.numero_dias || 2;
                    
                }

                document.getElementById("numero_dias").value = numero_diasHtml;
                const personSelected = document.getElementById(ev.personChoosed);
                if (personSelected)
                {
                    personSelected.checked = true;
                }

                const garajeSelected = document.getElementById(ev.garaje);
                if (garajeSelected) {
                    garajeSelected.checked = true;
                }
                
                document.getElementById("notareserva").value = ev.notareserva || "";

                const boton_menos_lightbox = document.getElementById('boton_menos_lightbox');
                boton_menos_lightbox.addEventListener("click", restarDias, true);

                const boton_mas_lightbox = document.getElementById('boton_mas_lightbox');
                boton_mas_lightbox.addEventListener("click", anadirDias, true);

            },
            get_value: function (node, ev) {

                console.log("antes valores ev get=" + JSON.stringify(ev));
                // const valoresLigBox = this.obtenerValoresLightBox();

                ev["notareserva"] = document.getElementById("notareserva").value;
                ev["numero_dias"] = (document.getElementById("numero_dias").value - 0);
                const allGarajes = document.querySelectorAll("[name='garaje']");
                if (allGarajes)
                {
                    for (let i = 0; i < allGarajes.length; i++)
                    {
                        if (allGarajes[i].checked === true)
                        {
                            ev["garaje"] = allGarajes[i].value;
                            break;

                        }
                    }
                }

                const allRadios = document.querySelectorAll("[name='persona']");
                if (allRadios) {
                    for (let i = 0; i < allRadios.length; i++) {
                        if (allRadios[i].checked === true) {
                            ev["personChoosed"] = allRadios[i].value;
                            ev["color"] = allRadios[i].nonce;
                            ev["textColor"] = "black";
                            break;
                        }

                    }
                }

                // ev = {ev, ...valoresLigBox};
                console.log("despues valores ev get=" + JSON.stringify(ev));

            },
            focus: function (node) {
                // var input = node.querySelector("[name='text']");
                // input.select();
                // input.focus();

                console.log("focussss");


            }

        };


        scheduler.config.hour_date = '%g:%i %A';
        // auto terminar los eventos
        scheduler.config.event_duration = 60 * 24 * 1;
        scheduler.config.multi_day = true;
        scheduler.config.auto_end_date = true;
        scheduler.config.first_hour = 8;

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
            // { name: "time", height: 72, type: "calendar_time", map_to: "auto" },
            { name: "Rellenar", height: 300, type: "custom_lightbox"},
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