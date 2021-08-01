// DATOS DE INGRESO
const ingresos = [
  new Ingreso("Sueldo", 10000),
  new Ingreso("Venta de auto", 30000),
  new Ingreso("Inversiones", 15000),
  new Ingreso("Mercado pago", 5000)
];

// DATOS DE EGRESO
const egresos = [
  new Egreso("Alquiler", 4000),
  new Egreso("Ropa", 1000),
  new Egreso("Crossfit", 1500),
  new Egreso("Supermercado", 9000)
];

// CARGAR APLICACIÓN
let cargarApp = () => {
  // CARGAR Y ACTUALIZAR PRESUPUESTO
  cargarCabecero();
  // CARGAR Y ACTUALIZAR INGRESOS
  cargarIngresos();
  // CARGAR Y ACTUALIZAR EGRESOS
  cargarEgresos();
};

// CALCULAR TOTAL DE INGRESOS
let totalIngresos = () => {
  let totalIngresos = 0;
  // RECORRER ARRAY DE INGRESOS
  for (let ingreso of ingresos) {
    //GUARDAR EN totalIngresos VALORES DEL ARRAY
    totalIngresos += ingreso.valor;
  }
  // RETORNAR VALOR DE INGRESOS TOTALES
  return totalIngresos;
};

// CALCULAR TOTAL DE EGRESOS
let totalEgresos = () => {
  let totalEgresos = 0;
  // RECORRER ARRAY DE EGRESOS
  for (let egreso of egresos) {
    // GUARDAR EN totalEgresos VALORES DEL ARRAY
    totalEgresos += egreso.valor;
  }
  // RETORNAR VALOR DE EGRESOS TOTALES
  return totalEgresos;
};

// INFORMACION - CABECERO / HEADER
let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();
  // CAPTURAR ELEMENTOS HTML Y MOSTRAR VALORES
  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

// FORMATEAR VALOR DE MONEDA
const formatoMoneda = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};

// FORMATEAR VALOR PORCENTAJE
const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
  });
};

// CARGAR INGRESOS
const cargarIngresos = () => {
  // ITERAR PLANTILLA HTML DE INGRESOS
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresosHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

// CREAR INGRESO HTML
const crearIngresosHTML = (ingreso) => {
  // PLANTILLA HTML DE INGRESOS
  let ingresosHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
  return ingresosHTML;
};

// ELIMINAR INGRESO
const eliminarIngreso = (id) => {
    // BUSCAR INDICE EN EL ARRAY DE INGRESOS
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    // ELIMINAR UN SOLO ELEMENTO 
    ingresos.splice(indiceEliminar, 1);
    // CARGAR Y ACTUALIZAR HEADER E INGRESOS
    cargarCabecero();
    cargarIngresos();
}

// CARGAR EGRESOS
const cargarEgresos = () => {
    // ITERAR PLANTILLA HTML DE EGRESOS
    let egresosHTML = "";
    for(let egreso of egresos){
        egresosHTML += crearEgresosHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}

// CREAR EGRESOS HTML
const crearEgresosHTML = (egreso) => {
    // PLANTILLA HTML DE EGRESOS
    let egresosHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return egresosHTML;
}

// ELIMINAR EGRESO 
const eliminarEgreso = (id) => {
    // BUSCAR INDICE A ELIMINAR EN EL ARRAY DE EGRESOS
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    // ELIMINAR UN SOLO ELEMENTO
    egresos.splice(indiceEliminar, 1);
    // CARGAR Y ACTUALIZAR HEADER Y EGRESOS
    cargarCabecero();
    cargarEgresos();
}

// AGREGAR INGRESO O EGRESO
let agregarDato = () => {
    // CAPTURAR FORMULARIO
    let forma = document.forms['forma'];
    // GUARDAR DATOS DEL FORMULARIO
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    // COMPROBAR QUE LOS CAMPOS DEL FORMULARIO NO ESTEN VACIOS
    if(descripcion.value !== '' && valor.value !== ''){
        // COMPROBAR TIPO DE DATO
        if(tipo.value === "ingreso"){
            // GUARDAR NUEVO OBJETO EN EL ARRAY DE INGRESOS_HTML
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
            // CARGAR Y ACTUALIZAR HEADER E INGRESOS
            cargarCabecero();
            cargarIngresos();
        } else if(tipo.value === "egreso"){
            egresos.push(new Egreso(descripcion.value, Number(valor.value)));
            // CARGAR Y ACTUALIZAR HEADER Y EGRESOS
            cargarCabecero();
            cargarEgresos();
        }
    }
}