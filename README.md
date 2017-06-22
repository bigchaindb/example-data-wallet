# BigchainDB + React + Redux boilerplate 

## Clone
Clone or fork this repo

```bash
git clone git@github.com:bigchaindb/bigchaindb-react-redux-boilerplate.git my-bigchaindb-project 
```

and

```bash
cd my-bigchaindb-project
```

Now you can set your remotes to your local app and so forth

## Server-side setup with Docker (Windows, OSX, lazy Linux)

> Supports BigchainDB Server v0.11

First things first. You'll need a (local) BigchainDB server to get going with the API.
If you haven't got access to a testnet or production net running BigchainDB, it's easy to spin up a local instance.

### Prequisites

You must have `docker`, `docker-compose` installed.
These versions or higher should work:

- `docker`: `v1.13.0`
- `docker-compose`: `v1.7.1`

#### Locally launch BigchainDB server

To spin up the services, simply run:

```bash
docker-compose up -d
```

This might take a few minutes, perfect moment for a :coffee:!

Once docker-compose has built and launched all services, have a look:

```bash
docker-compose ps
```

```
           Name                         Command               State            Ports
----------------------------------------------------------------------------------------------
mybigchaindbproject_bdb_1          bigchaindb start                 Up      0.0.0.0:49984->9984/tcp
mybigchaindbproject_mdb_1          docker-entrypoint.sh mongo ...   Up      0.0.0.0:32773->27017/tcp
```

Which means that the internal docker port for the API is `9984` 
and the external one is `49984`.

The external ports might change, so for the following use the ports as indicated by `docker-compose ps`.

You can simply check if it's running by going to `http://localhost:<external-docker-port-bdb-server>`.

Stop (and remove) the containers with

```bash
docker-compose stop
```

## Client-side Setup

### Prequisites

For the client you'll need `node` and `npm`: These versions or higher should work:

- `node`: `v6.2.2`
- `npm`: `v3.9.5`

### Install

```
npm install
```

### Launch

```
REACT_APP_BDB_SERVER_URL=<e.g. http://localhost:49984> npm start
```

Note that hot reloading is enabled and should pick up all the changes in the `js` and `scss` source.

The app should be running on [http://localhost:8000](http://localhost:8000)

## BigchainDB JavaScript Driver

see the [js-bigchaindb-driver](https://github.com/bigchaindb/js-bigchaindb-driver) for more details
