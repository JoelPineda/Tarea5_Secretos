listar();
listarUser();

$("#txtFecha").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeMonth: true
    }
);

function listar() {
    $.get("Secretos/listarSecretos", function (data) {
        listarAlumno(["ID", "Titulo", "Descripcion", "Valor Monetario", "Lugar", "Fecha","Latitud", "Longitud"], data);
    });
}

function listarUser() {
    $.get("Secretos/listarUser", function (data) {
        var nombre = document.getElementById("nombre");
        nombre.innerHTML = data[0].nombre + " " + data[0].apellido;

        document.getElementById("foto").src = data[0].foto;
        
    });
}



function listarAlumno(ArrayColumna, data) {
    var contenido = "";

    contenido += "<table id='tablas' class='table table-bordered table-hover'>";
    contenido += "<thead>";
    contenido += "<tr>";
    for (var i = 0; i < ArrayColumna.length; i++) {
        contenido += "<td  class='p-3 mb-2 bg-primary text-white'>";
        contenido += ArrayColumna[i];
        contenido += "</td>";
    }
    contenido += "<td class='p-3 mb-2 bg-primary text-white'>ACCCIONES</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    var llaves = Object.keys(data[0])
    contenido += "<tbody>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            var valorLlaves = llaves[j];
            contenido += "<td class='text-primary'>"
            contenido += data[i][valorLlaves];
            contenido += "</td>"
        }
        var llavesId = llaves[0];
        contenido += "<td>";
        contenido += "<button class='btn btn-primary' onclick='abrirModal(" + data[i][llavesId] + ")' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> ";
        contenido += "<button class='btn btn-danger' onclick='eliminar(" + data[i][llavesId] + ")'><i class='glyphicon glyphicon-trash'></i></button>";
        contenido += "</td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>";

    contenido += "</table>";
    document.getElementById("secretos").innerHTML = contenido;
    $("#tablas").dataTable({
        searching: false

    });
}

function abrirModal(Id) {
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var nControles = controlesObligatorio.length;

    for (var i = 0; i < nControles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    }

    if (Id == 0) {
        limpiarDatos();
    } else {
        $.get("Secretos/recuperarInformacion/?id=" + Id, function (data) {

            document.getElementById("txtId").value = data[0].Id;
            document.getElementById("txtTitulo").value = data[0].Titulo;
            document.getElementById("txtDescripcion").value = data[0].Descripcion;
            document.getElementById("valorMonetario").value = data[0].Valor_Monetario;
            document.getElementById("txtLugar").value = data[0].Lugar;
            document.getElementById("txtFecha").value = data[0].Fecha;
            document.getElementById("txtLat").value = data[0].Lat;
            document.getElementById("txtLot").value = data[0].Lot;

        });
    }
}

function Agregar() {
    if (DatosObligatorio() == true) {
        var frm = new FormData();
        var Id = document.getElementById("txtId").value;
        var titulo = document.getElementById("txtTitulo").value;
        var descripcion = document.getElementById("txtDescripcion").value;

        var valor = document.getElementById("valorMonetario").value;
        var lugar = document.getElementById("txtLugar").value;
        var fecha = document.getElementById("txtFecha").value;

        var lat = document.getElementById("txtLat").value;
        var lot = document.getElementById("txtLot").value;
        var usuario = document.getElementById("txtUsuario").value;

        frm.append("Id", Id);
        frm.append("Titulo", titulo);
        frm.append("Descripcion", descripcion);
        frm.append("Usuario", usuario);
        frm.append("Valor_Monetario", valor);
        frm.append("Lugar", lugar);
        frm.append("Fecha", fecha);

        frm.append("Lat", lat);
        frm.append("Lot", lot);
    
        frm.append("DBHABILATO", 1);

        if (confirm("Estas seguros que quieres agregar?") == 1) {
            $.ajax({
                type: "POST",
                url: "Secretos/guardarDatos",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        alert("Ha ocurrido un error");
                    } else {
                        alert("Se agrego correctamente");
                        listar();
                        document.getElementById("btnCancelar").click();
                    }
                }
            })
        }
    }
}

$.get("Secretos/listarRegitro", function (data) {
    llenarCombox(data, document.getElementById("txtUsuario"), true);
});
function llenarCombox(data, control, primerElemento) {
    var contenido = "";
    if (primerElemento == true) {
        contenido += "<option value=''>--seleccione--</option>";

    }
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value = '" + data[i].Email + "'>";
        contenido += data[i].nombre
        contenido += "</option>";
    }
    control.innerHTML = contenido;
}

function DatosObligatorio() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var nControles = controlesObligatorio.length;
    for (var i = 0; i < nControles; i++) {
        if (controlesObligatorio[i].value == "") {
            exito = false;
            controlesObligatorio[i].parentNode.classList.add("error");
        } else {
            controlesObligatorio[i].parentNode.classList.remove("error");
        }
    }
    return exito;
}
function limpiarDatos() {
    var controles = document.getElementsByClassName("borrar");
    var nControles = controles.length;
    for (var i = 0; i < nControles; i++) {
        controles[i].value = "";
    }
}

function eliminar(id) {
    var frm = new FormData();
    frm.append("Id", id);
    if (confirm("¿Realmente deseas eliminar el curso") == 1) {
        $.ajax({
            type: "POST",
            url: "Secretos/eliminar",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data == 0) {
                    alert("Ocurrio un error");
                } else {
                    listar();
                    alert("Se elimino correctamente");
                    document.getElementById("btnCancelar").click();
                }
            }
        });
    }
}