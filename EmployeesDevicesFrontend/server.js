const express=require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/EmployeesDevicesFrontend'));

app.get('/*', (req, res) =>
        res.sendFile('index.html', { root: './dist/EmployeesDevicesFrontend/' }),
        );

app.listen(process.env.PORT || 8080);
