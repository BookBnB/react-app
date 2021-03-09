import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import sessionExpired from "../util/sessionExpired";
import FormControl from "@material-ui/core/FormControl";
import Cookie from "js-cookie";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField/TextField";
import "./metricsPage.css";

export default function MetricsPage({expired}) {

    const [currentMetric, setCurrentMetric] = useState(null);
    const [metricType, setMetricType] = useState('');
    const [metricDateFrom, setMetricDateFrom] = useState('');
    const [metricDateTo, setMetricDateTo] = useState('');

    const sExpired = !expired ? expired : sessionExpired();

    function mapParams() {
        let queryParams = "";
        if (metricDateTo !== '' || metricDateFrom !== '') {
            queryParams += "?";
            if (metricDateFrom !== '') {
                queryParams += "fechaInicio=" + metricDateFrom + "&";
            }
            if (metricDateTo !== '') {
                queryParams += "fechaFin=" + metricDateTo;
            }
        }

        return queryParams;

    }

    const handleTypeChange = (event) => {
        setMetricType(event.target.value);
    };

    const handleDateFromChange = (event) => {
        setMetricDateFrom(event.target.value);
    };

    const handleDateToChange = (event) => {
        setMetricDateTo(event.target.value);
    };

    function showCurrentMetric() {

        if (metricType === '') {
            alert("El tipo de métrica es un campo obligatorio")
        } else if (metricType === "reservasActivas" && (metricDateFrom === '' || metricDateTo === '')) {
            alert("Los campos correspondientes a fecha de inicio y fecha de fin son obligatorios para esta métrica")
        } else {
            fetch(process.env.REACT_APP_BACKEND_URL + '/v1/reportes/' + metricType + mapParams(), {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': Cookie.get("token")
                },
            })
                .then((res) => res.json())
                .catch((error) => console.error('Error:', error))
                .then((response) => {
                    mapAndSortData(response.datos);
                });
        }
    }

    Date.prototype.addDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    function getValueFromData(data, key) {
        for (let i=0; i < data.length; i++) {
            if (data[i].clave === key) {
                return data[i].valor;
            }
        }
        return 0;
    }

    function formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    function fillData(data) {
        if (data.length === 0) return data;
        let dates = [];
        let firstDate = new Date((metricDateFrom !== '') ? metricDateFrom : data[0].clave).addDays(1);
        let lastDate = new Date((metricDateTo !== '') ? metricDateTo : data[data.length - 1].clave).addDays(1);
        while (firstDate <= lastDate) {
            dates.push({clave: formatDate(new Date (firstDate).toDateString()), valor: getValueFromData(data, formatDate(firstDate.toDateString()))});
            firstDate = firstDate.addDays(1);
        }
        return dates;
    }

    function mapAndSortData(data) {
        let newData = data.map(d => ({ clave: d.clave.split('T')[0], valor: d.valor }));
        newData.sort((a,b) => (a.clave > b.clave) ? 1 : ((b.clave > a.clave) ? -1 : 0));
        let dataWithAllDates = fillData(newData);
        setCurrentMetric(dataWithAllDates);
    }

    function showMetric() {
        if (!currentMetric || metricType === '') return null;

        let metric;
        switch (metricType) {
            case "publicaciones":
                metric =
                    <LineChart width={1000} height={400} data={currentMetric}
                               margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
                        <Line dataKey="valor"
                              stroke="#8884d8"
                              strokeWidth={3}/>
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="clave" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                break;
            case "reservas":
                metric =
                    <LineChart width={1000} height={400} data={currentMetric}
                               margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
                        <Line dataKey="valor"
                              stroke="#8884d8"
                              strokeWidth={3}/>
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="clave" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                break;
            case "reservasActivas":
                metric =
                    <LineChart width={1000} height={400} data={currentMetric}
                               margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
                        <Line dataKey="valor"
                              stroke="#8884d8"
                              strokeWidth={3}/>
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="clave" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                break;
            default:
                break;
        }
        return metric;
    }

    return (

        (sExpired) ?
            <Redirect to="/login" /> :
            <div className='metrics'>
                <FormControl className='metric-type'>
                    <InputLabel id="metric-type-label">Tipo</InputLabel>
                    <Select
                        labelId="metric-type-label"
                        id="metric-type"
                        value={metricType}
                        onChange={handleTypeChange}>
                        <MenuItem value={"publicaciones"}>Cantidad de publicaciones nuevas por día</MenuItem>
                        <MenuItem value={"reservas"}>Cantidad de reservas creadas por día</MenuItem>
                        <MenuItem value={"reservasActivas"}>Cantidad de reservas activas por día</MenuItem>
                    </Select>
                </FormControl>
                <div className="input-params">
                    <div className="date-from-input">
                        <TextField id="date-from" label="Fecha de inicio" variant="outlined"
                                   onChange={handleDateFromChange} type="date"
                                   InputLabelProps={{
                                       shrink: true,
                                   }}/>
                    </div>
                    <div className="date-to-input">
                        <TextField id="date-to" label="Fecha de fin" variant="outlined"
                                   onChange={handleDateToChange} type="date"
                                   InputLabelProps={{
                                       shrink: true,
                                   }}/>
                    </div>
                </div>
                <Button className="accept-button" variant="contained" onClick={showCurrentMetric}>Ver resultados</Button>
                <div className="plot">
                    {showMetric()}
                </div>
            </div>
    );
}