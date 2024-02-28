const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers/index-routes');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

const router = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers })

const sess = {
    cookie: {
        maxAge: 86400000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    sttore: new sequelizeStore({
        db: sequelize
    })
};

router.use(session(sess));

router.engine('handlebars', hbs.engine);
router.set('view engine', 'handlebars');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(_dirname, 'public')));

router.use(routes);

sequelize.sync({ force: false }).then(() => {
    router.listen(PORT, () => console.log('Now listening!'))
});
