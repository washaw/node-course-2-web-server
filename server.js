const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//const port = process.env.PORT || 3000;
let app = express();

app.set('port', (process.env.PORT || 3000));

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    let now = new Date().toString();
    console.log(`now: ${now} ${req.method}`);

    fs.appendFile('server.log', now + '\n', (err) => {
        console.log('error happened');
    });
    next();
});

//  app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         Rightback: 'We will be right back!'
//     });
// });


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        userName: 'Guest'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad call'
    })
});


//  app.listen(port, () => {
//      console.log(`Server started at port ${port}`);
//  });

app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});