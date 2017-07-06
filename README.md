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

## Quickstart with Docker (Windows, OSX, lazy Linux)

> Supports BigchainDB Server v1.0

### Prequisites

You must have `docker`, `docker-compose` (and `make`) installed.
These versions or higher should work:

- `docker`: `v1.13.0`
- `docker-compose`: `v1.7.1`

### Make or docker-compose

To spin up the services, simple run the make command, which will orchestrate `docker-compose`

```bash
make
```

This might take a few minutes, perfect moment for a :coffee:!

Once docker-compose has built and launched all services, have a look:

```bash
docker-compose ps
```

```
            Name                          Command               State                        Ports                       
------------------------------------------------------------------------------------------------------------------------
mybigchaindbproject_bdb_1      bigchaindb start                 Up      0.0.0.0:49984->9984/tcp, 0.0.0.0:49985->9985/tcp 
mybigchaindbproject_client_1   npm start                        Up      0.0.0.0:3000->3000/tcp   
mybigchaindbproject_mdb_1      docker-entrypoint.sh mongo ...   Up      0.0.0.0:32797->27017/tcp                        
```

Which means that the internal docker port for the API is `9984` 
and the external one is `49984`.

The external ports might change, so for the following use the ports as indicated by `docker-compose ps`.

You can simply check if it's running by going to [`http://localhost:3000`](http://localhost:3000).

If you already built the images and want to `restart`:

```bash
make restart
```

Stop (and remove) the containers with

```bash
make stop
```

### Launch docker-compose services manually

No make? Launch the services manually:

Launch MongoDB:

```bash
docker-compose up -d mdb
```

Wait about 10 seconds and then launch the server & client:

```bash
docker-compose up -d bdb
docker-compose up -d client
```

## BigchainDB JavaScript Driver

see the [js-bigchaindb-driver](https://github.com/bigchaindb/js-bigchaindb-driver) for more details
