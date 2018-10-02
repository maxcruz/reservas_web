# README

MVP of a sport center booking system. Built using Rails, React.

## System dependencies
- Rails 5.2.1
- Ruby 2.5.1
- PostgreSQL 10.5 (similar versions also works)
- Foreman 0.85.0 (gem install foreman)

## Database initialization

Install PostgreSQL
```
# Linux
sudo apt-get install postgresql

# OSX
brew install postgresql
```

Create a role
```
# Linux
sudo su - postgres

#OSX
psql postgres
```
```
postgres=# CREATE ROLE "reservas-app" WITH LOGIN PASSWORD 'My Secret Password';
postgres=# ALTER ROLE "reservas-app" CREATEDB;
postgres=# \q
```
Setup environment variable
```
export RESERVAS_WEB_DATABASE_PASSWORD="My Secret Password"
```

## Setup project

Clone respository
```
git clone git@github.com:maxcruz/reservas_web.git
cd reservas_web
```

Setup
```
bundle install
yarn install
rake db:create
rake db:migrate
rake db:seed
```

Run project
```
foreman start -f Procfile.dev -p 3000
```
