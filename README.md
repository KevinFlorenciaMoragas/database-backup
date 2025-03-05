📌 Database Backup Script

Este proyecto es un script en Node.js que permite realizar backups automáticos de bases de datos MySQL, PostgreSQL, MongoDB y SQLite.

🚀 Características

Soporte para MySQL, PostgreSQL, MongoDB y SQLite

Exportación de estructura y datos

Generación de archivos .sql o .json según el tipo de base de datos

Comprimido en formato .zip

📦 Instalación

Clonar el repositorio:

git clone https://github.com/tuusuario/database-backup.git
cd database-backup

Instalar dependencias:

npm install

Configurar las variables de entorno en un archivo .env:

DB_TYPE=mysql  # mysql, postgresql, mongodb, sqlite
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_contraseña
DB_NAME=tu_base_de_datos
DB_URI=mongodb://localhost:27017/tu_base
DB_FILE=database.sqlite

🛠 Uso

Ejecuta el comando para realizar un backup:

npx ts-node ./src/index.ts backup --type mysql

Reemplaza mysql con el tipo de base de datos que deseas respaldar.

📜 Estructura del Proyecto

/database-backup
│── src/
│   ├── commands/
│   │   ├── backup.ts      # Lógica para realizar backup
│   ├── services/
│   │   ├── database.ts    # Conexión con la base de datos
│   ├── index.ts          # Punto de entrada del script
│── .env                  # Variables de entorno
│── package.json          # Dependencias del proyecto
│── README.md             # Documentación

📌 Tecnologías Usadas

Node.js

TypeScript

MySQL2 para MySQL

pg para PostgreSQL

mongodb para MongoDB

sqlite3 y sqlite para SQLite

dotenv para configuración

archiver para comprimir backups

🔄 Restauración del Backup

MySQL / PostgreSQL:

mysql -u root -p tu_base_de_datos < backup.sql

MongoDB:

mongorestore --db tu_base_de_datos --archive=backup.gz

SQLite:

Simplemente reemplaza el archivo .sqlite con el backup.

🛠 Contribuir

Haz un fork del repositorio.

Crea una rama para tu cambio:

git checkout -b mi-nueva-feature

Realiza tus cambios y haz commit:

git commit -m "Agregada nueva funcionalidad"

Sube tus cambios:

git push origin mi-nueva-feature

Abre un Pull Request en GitHub.

📄 Licencia

Este proyecto está bajo la licencia MIT.
