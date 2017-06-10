const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()


// Destinamtion Route
routes.add('destination', '/destination/:destID', 'destination')


// Experience Route
routes.add('experience', '/experience/:expID', 'experience')

// Trips Route

// Trip Route
routes.add('trip', '/trip/:tripID', 'trip')
