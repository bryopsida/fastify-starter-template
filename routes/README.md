# Routes

## What is this?

This folder hold the REST API routes. The intent is this code should focus on the presentation/transport layer, meaning it should unpack a request from the wire and route it to the appropriate service calls but hold as little domain specific code as possible.

Routes should be grouped into macro routes that the top level app can attach, see [api.js](./api.js).
