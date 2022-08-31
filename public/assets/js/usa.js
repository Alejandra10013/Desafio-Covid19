import {login, getData, token} from "./usaRequests.js";

// let email = "Sincere@april.biz"; let password = "123";

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    let email = document
        .getElementById("email")
        .value;
    let password = document
        .getElementById("password")
        .value;

    login(email, password).then((token) => {
        getData(token).then((data) => {
            console.log(data);
            // data.forEach((registro) => {});
        })
    });

    habilitaBtn();
    grafico();
});

const habilitaBtn = () => {
    if (token) {
        $("#formContainer").hide();
        $("#cerrarSesion").show();
        $("#chartContainer").show();
    } else {
        alert("Nombre de usuario o contraseña inválidos, por favor intente nuevamente");
    }
};

const grafico = async () => {
    const data = await getData(token);

    let positive = [];
    let negative = [];
    let deaths = [];

    data.forEach(e => {
        positive.push({x:new Date(e.date), y:e.positive});
        negative.push({x:new Date(e.date), y:e.negative});
        deaths.push({x:new Date(e.date), y:e.deaths});
    })

    // let fecha = data[0]     .data     .map((item) => item.date); let confirmados
    // = data     .filter((item) => item.type === "confirmed")[0]     .data
    // .map((item) => item.total); let muertos = data     .filter((item) =>
    // item.type === "deaths")[0]     .data     .map((item) => item.total); let
    // recuperados = data     .filter((item) => item.type === "recovered")[0] .data
    // .map((item) => item.total);

    let chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Covid-19 stats USA"
        },
        data: [
            {
                type: "line",
                name: "Confirmados",
                showInLegend: true,
                dataPoints: positive
            }, {
                type: "line",
                name: "Negativo",
                showInLegend: true,
                dataPoints: negative
            }, {
                type: "line",
                name: "Muertes",
                showInLegend: true,
                dataPoints: deaths
            },
        ]
    });
    chart.render();
}


$("#cerrarSesion").on("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window
        .location
        .reload();
    $("#cerrarSesion").hide();
    $("#formContainer").show();

    document
        .getElementById("email")
        .value = "";
    document
        .getElementById("password")
        .value = "";
})