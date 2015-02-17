#Fluxible variants
A isomorphic webapp to search for genetic variants using Yahoo's [Fluxible](http://fluxible.io/) library 
and [React](http://facebook.github.io/react/) view components. This application is rendered
on the server and exported to the client as a Single Page App. 

### Screenshots

![Alt text](/screenshots/results.png?raw=true)


**Note: this is a _work in progress_**
### Features
- has basic typeahead functionality where a select field is populated with gene names after 2 key strokes
- fetches variant data from the database and displays to the user
- has links to pubmed resources


###Planned features

- true typeahead (once I fix the jsx webpack build issues)
- database security

## Build database

This guide assumes that you have Postgresql installed locally listening on port 5432
a passwordless configuration please adjust to suit your environment.


```
$ cd data
$ psql -f variant_results.sql
```

This builds a database called "informatics" with a single table called "variants".

## Get dependencies
Requires [NODE.JS](http://nodejs.org/) and npm to be installed.

From the project root:
```
$ npm install 
```

## Run development server
Note you may need to change database configurations for your database. These are currently
located in the service classes and haven't been designed for security-- As this is an 
isomorphic app that is rendered on the server and exported to the client, the database
configuration will also be exported to the client. 

```
$ grunt
```

## Process notes
This application was scaffolded using the [Fluxible generator](https://github.com/yahoo/generator-fluxible)
for [Yeoman](http://yeoman.io/).

This scaffolding tool uses [Grunt](http://gruntjs.com/) as a process runner and the [Webpack](http://webpack.github.io/) 
module bundler to package the application. This was the first time I had used Webpack so there was a bit of a learning
curve.

The choice of databases went through several iterations including:

- the [Postgresql docker container](https://registry.hub.docker.com/_/postgres/) -- Althought this should work fine with 
a linux environment, I was having difficulty accessing the container running in boot2docker VM on OSX.
- SQLite3 - this was working well in tests but Webpack was choking on the native binary -- BTW later found out that you
can excempt packages from Webpack in the package.json or in the Webpack options
- Firebase - briefly tried but it choked on the web based upload of the JSON file I made from the data and the poor query
support also dissuaded me
- Postgresql - settled on this, although it was not without challenges. When using the "Copy ... From ..." syntax Postgresql
complained about data past the last column. This happened in the psql CLI and using PGadmin. I tried to convert the data
to csv without luck and re-exporting the tsv to a text without luck. As a last ditch effort I imported the file into an 
R dataframe (it also complained but made a new blank extra column "X") and then loaded it into Postgresql using RPostgresql
(which is a handy trick). Webpack didn't want to load the node pg package dispite using the pure JS and not the native
version of the library. This was fixed by adding :
 
 ```
  "browser": {
    "pg": false
  }
```
to the package.json file.
 
Webpack - This build tool seems really nice (like browserify). Was a bit challenging when it broke on binary files. There
were also 3rd party React components (React-typeahead, React-autocomplete) that it wasn't building correctly dispite
indicating that I wanted all '.js' files tobe parsed as JSX.
 
Fluxible - Was really interesting to see how the isomorphic rendering was occurring. The application flow seemed really
understandable however the FetchR plugin isn't currently working for me in the browser. I added an [issue](https://github.com/yahoo/fluxible-plugin-fetchr/issues/17)
on their Github Site so hopefully this can be fixed soon. Otherwise may need to use something like superagent on the frontend
and regular old express routes on the back end, which is totally doable. 


