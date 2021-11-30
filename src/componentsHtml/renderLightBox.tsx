export const htmlLightBox = `
<div class='dhx_cal_ltext contenedor_botones_lightbox' >
    <div class='primera_linea' >
        <div>
            <span>Nota de Reserva</span>
            <input class='texto_nota_reserva noselect input_numero_dias' id='notareserva' type='text' name='notareserva' value='' placeholder="000" maxlength="7" minlength="1" nonce="" autocomplete="off">
        </div>

        <div class="centrado_flex" >
            <span>Numero dias</span>
            <button id='boton_menos_lightbox' class='boton_ligthbox boton_menos_lightbox'>-</button> 
            <input id='numero_dias' class='noselect input_numero_dias' name='numero_dias' type='number' value='3' min='1' max='99999' autocomplete="off" maxlength="7" minlength="1">
            <button id='boton_mas_lightbox' class='boton_ligthbox boton_mas_lightbox'>+</button>
        </div>
        <div class="centrado_flex">
            <span>Estado:</span>
            <select id="status" class="status_select">
                <option value="reservado">Reservado</option>
                <option value="prepagado">Prepagdo</option>
                <option value="100pagado">100% Pagado</option>
            </select>
        </div>
    </div>
    <div class='seccion_colaboradores' >
        <div class='radiobotones_enlinea' >
            <input class='radio_boton' id='gianni' type='radio' name='persona' value='gianni' nonce="#c9dcff">
            <label class='texto_radio_boton' for='gianni'>Gianni</label>
        </div> 
        <div class='radiobotones_enlinea' >
            <input class='radio_boton' id='sven' type='radio' name='persona' value='sven' nonce="#38ff3f">
            <label class='texto_radio_boton' for='sven'>Sven</label>
        </div>
        <div class='radiobotones_enlinea' >
            <input class='radio_boton' id='llull' type='radio' name='persona' value='llull' nonce="#ffc738">
            <label class='texto_radio_boton' for='llull'>Llull</label>
        </div>
        <div class='radiobotones_enlinea' >
            <input class='radio_boton' id='thomas' type='radio' name='persona' value='thomas' nonce="#c5a9ff">
            <label class='texto_radio_boton' for='thomas'>Thomas</label>
        </div>
        <div class='radiobotones_enlinea' >
            <input class='radio_boton' id='belmi' type='radio' name='persona' value='belmi' nonce="#c8c8c8">
            <label class='texto_radio_boton' for='belmi'>Belmi</label>
        </div>
        <div class='radiobotones_enlinea' >
            <input class='radio_boton' id='lupe' type='radio' name='persona' value='persona6' nonce="#ffa3a3">
            <label class='texto_radio_boton' for='lupe'>Lupe</label>
        </div>
        <div class='radiobotones_enlinea' >
            <input class='radio_boton' id='fs' type='radio' name='persona' value='fs' nonce="#56c4ff">
            <label class='texto_radio_boton' for='fs'>Fuera Servicio</label>
        </div>
        <div class='radiobotones_enlinea' >
            <input class='radio_boton' id='dido' type='radio' name='persona' value='dido' nonce="#a3ffff">
            <label class='texto_radio_boton' for='dido'>Dido</label>
        </div>
        <div class='radiobotones_enlinea' >
            <input class='radio_boton' id='campa' type='radio' name='persona' value='campa' nonce="#B0ED66">
            <label class='texto_radio_boton' for='campa'>Campa</label>
        </div>

    </div>
   
    <div class='' >
        <span>Garajes</span>
        <div class='seccion_garajes' >
            <div class='radiobotones_enlinea' >
                <input class='radio_boton' id='belming' type='radio' name='garaje' value='belming' nonce="#c9dcff">
                <label class='texto_radio_boton' for='belming'>Belming</label>
            </div>
            <div class='radiobotones_enlinea' >
                <input class='radio_boton' id='st' type='radio' name='garaje' value='st' nonce="#38ff3f">
                <label class='texto_radio_boton' for='st'>ST</label>
            </div>
            <div class='radiobotones_enlinea' >
                <input class='radio_boton' id='v' type='radio' name='garaje' value='v' nonce="#ffc738">
                <label class='texto_radio_boton' for='v'>V</label>
            </div>
        </div>
    </div>
    
    <div class="">
        <span>Fecha Entrada</span>
        <span id="fechaentrada">XX-XX-2021</span>
    </div>
</div>

`;

