


## Build database

This guide assumes that you have Postgresql installed locally listening on port 5432
a passwordless configuration please adjust to suit your environment.


```
$ cd data
$ psql -f variant_results.sql
```

This builds a database called "informatics" with a single table called "variants".

