# INSTALATION

To install the app you need to go this link [Discord Developer Portal](https://discord.com/developers)<br/>
Then setup for application.. [Refer this one](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) <br/>
After you get the bot token, application id and guild id (server id) you need to create `.env` file. <br/>
copy this `.env` example:

```
BOT_TOKEN=MTM2LTkxOXIxMTYwMzMwXMYwZA.GZlDq5.uL2OR-UF0z8eyhric-F-3QqeQKcG7at71darfs
CLIENT_ID=1361918211603304600
GUILD_ID=1172760451604545536
DB_TYPE=your_database_driver
DB_HOST=localhost
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASS=
DB_NAME=your_database_name
```
<br/>

# Package installation
>Our current default RDBMS is mysql so you should install your own driver version 
you can install driver version by copy this
for MySQL or MariaDB <br/>

`npm install mysql --save (you can install mysql2 instead as well)`

for PostgreSQL or CockroachDB<br/>

`npm install pg --save`

for SQLite<br/>

`npm install sqlite3 --save`

for Microsoft SQL Server<br/>

`npm install mssql --save`

for sql.js<br/>

`npm install sql.js --save`

for Oracle<br/>

`npm install oracledb --save`

To make the Oracle driver work, you need to follow the installation instructions from their site.<br/>

for SAP Hana<br/>

`npm install @sap/hana-client`
`npm install hdb-pool`
SAP Hana support made possible by the sponsorship of Neptune Software.<br/>

`for Google Cloud Spanner`

`npm install @google-cloud/spanner --save`
Provide authentication credentials to your application code by setting the environment variable GOOGLE_APPLICATION_CREDENTIALS:<br/>

# Linux/macOS
`export GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"`

# Windows
`set GOOGLE_APPLICATION_CREDENTIALS=KEY_PATH`

# Replace KEY_PATH with the path of the JSON file that contains your service account key.
To use Spanner with the emulator you should set SPANNER_EMULATOR_HOST environment variable:

# Linux/macOS
`export SPANNER_EMULATOR_HOST=localhost:9010`

# Windows
`set SPANNER_EMULATOR_HOST=localhost:9010`
for MongoDB (experimental)

`npm install mongodb@^5.2.0 --save`

for NativeScript, react-native and Cordova

Check documentation of supported platforms

Install only one of them, depending on which database you use. <br/>
then install every package we required by running this
`npm install`