"use strict";

const calculo = document.querySelector("section.calculo");
const writeMessage = (message) => {
  calculo.innerHTML = `<p>${message}</p>`;
};
const text = document.querySelector("p.horno");
const horno = (message) => {
  text.innerHTML = `<p>${message}</p>`;
};
const text1 = document.querySelector("p.microondas");
const microondas = (message) => {
  text1.innerHTML = `<p>${message}</p>`;
};
const text2 = document.querySelector("p.tv");
const tv = (message) => {
  text2.innerHTML = `<p>${message}</p>`;
};
const text3 = document.querySelector("p.pc");
const pc = (message) => {
  text3.innerHTML = `<p>${message}</p>`;
};
const text4 = document.querySelector("p.lavadora");
const lavadora = (message) => {
  text4.innerHTML = `<p>${message}</p>`;
};
const text5 = document.querySelector("p.batidora");
const batidora = (message) => {
  text5.innerHTML = `<p>${message}</p>`;
};
const today = new Date();
const hour = today.getHours().toString();

const url =
  "https://api.allorigins.win/get?url=https://api.preciodelaluz.org/v1/prices/all?zone=PCB";
function consultaDatos() {
  try {
    const datosrecup = JSON.parse(localStorage.getItem("precioguardado"));
    let horarecup = JSON.parse(localStorage.getItem("horaguardada"));
    let seg = new Date(horarecup);
    let a = today;
    let b = seg;

    if (a - b < 300000) {
      const horaActual = JSON.stringify(today + 1);
      localStorage.setItem("horaguardada", horaActual);
      const precioActual = JSON.stringify(datosrecup);
      localStorage.setItem("precioguardado", precioActual);
      const precioElectro = datosrecup;
      const precioLavadora = (precioElectro / 1000000) * 2000;
      lavadora(
        `Ahora mismo, el consumo energético de una lavadora es ${precioLavadora.toFixed(
          3
        )} €/h `
      );
      const precioHorno = (precioElectro / 1000000) * 1000;
      horno(
        `Ahora mismo, el consumo energético de un horno es ${precioHorno.toFixed(
          3
        )} €/h `
      );
      const precioMicroondas = (precioElectro / 1000000) * 900;
      microondas(
        `Ahora mismo, el consumo energético de un microondas es ${precioMicroondas.toFixed(
          3
        )} €/h `
      );
      const precioTelevision = (precioElectro / 1000000) * 300;
      tv(
        `Ahora mismo, el consumo energético de una televisión es ${precioTelevision.toFixed(
          3
        )} €/h `
      );
      const precioOrdenador = (precioElectro / 1000000) * 250;
      pc(
        `Ahora mismo, el consumo energético de un ordenador es ${precioOrdenador.toFixed(
          3
        )} €/h `
      );

      const precioBatidora = (precioElectro / 1000000) * 400;
      batidora(
        `Ahora mismo, el consumo energético de una batidora es ${precioBatidora.toFixed(
          3
        )} €/h `
      );
    } else {
      tomaDatos();
    }
  } catch (error) {
    writeMessage(error.message);
  }
}
consultaDatos();

async function tomaDatos() {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const precio = await response.json();

      const prHora = JSON.parse(precio.contents);

      const hoursData = Object.values(prHora);

      const horaActual = JSON.stringify(today + 1);
      localStorage.setItem("horaguardada", horaActual);
      const precioActual = JSON.stringify(hoursData[hour].price);
      localStorage.setItem("precioguardado", precioActual);

      const precioElectro = hoursData[hour].price;
      const precioLavadora = (precioElectro / 1000000) * 2000;
      lavadora(
        `Ahora mismo, el consumo energético de una lavadora es ${precioLavadora.toFixed(
          3
        )} €/h `
      );
      const precioHorno = (precioElectro / 1000000) * 1000;
      horno(
        `Ahora mismo, el consumo energético de un horno es ${precioHorno.toFixed(
          3
        )} €/h `
      );
      const precioMicroondas = (precioElectro / 1000000) * 900;
      microondas(
        `Ahora mismo, el consumo energético de un microondases ${precioMicroondas.toFixed(
          3
        )} €/h `
      );
      const precioTelevision = (precioElectro / 1000000) * 300;
      tv(
        `Ahora mismo, el consumo de una televisión es ${precioTelevision.toFixed(
          3
        )} €/h `
      );
      const precioOrdenador = (precioElectro / 1000000) * 250;
      pc(
        `Ahora msmo, el consumo energético de un ordenador es ${precioOrdenador.toFixed(
          3
        )} €/h `
      );
      const precioBatidora = (precioElectro / 1000000) * 400;
      batidora(
        `Ahora mismo, el consumo energético de una batidora es ${precioBatidora.toFixed(
          3
        )} €/h `
      );
    } else {
      writeMessage("Hubo un error");
    }
  } catch (error) {
    writeMessage(error.message);
  }
}

//document.body.innerHTML
