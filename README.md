# 📌 Database Backup Script

Este proyecto es un script en **Node.js** que permite realizar backups automáticos de bases de datos **MySQL, PostgreSQL, MongoDB y SQLite**.

---

## 🚀 Características
✅ Soporte para **MySQL, PostgreSQL, MongoDB y SQLite**
✅ Exportación de **estructura y datos**
✅ Generación de archivos **.sql** o **.json** según el tipo de base de datos
✅ Comprimido en formato **.zip**

---

## 📦 Instalación
### 1️⃣ Clonar el repositorio:
```sh
git clone https://github.com/tuusuario/database-backup.git
cd database-backup
```

### 2️⃣ Instalar dependencias:
```sh
npm install
```

### 3️⃣ Configurar las variables de entorno en un archivo `.env`:
```ini
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_contraseña
DB_NAME=tu_base_de_datos
DB_URI=mongodb://localhost:27017/tu_base
DB_FILE=database.sqlite
```

---

## 🛠 Uso
Ejecuta el comando para realizar un **backup**:
```sh
npx ts-node ./src/index.ts backup --type mysql
Reemplaza `mysql` con el tipo de base de datos que deseas respaldar.

---

## 📜 Estructura del Proyecto
``
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
``

---

## 📌 Tecnologías Usadas
🛠 **Node.js**
🛠 **TypeScript**
🛠 **MySQL2** para MySQL
🛠 **pg** para PostgreSQL
🛠 **mongodb** para MongoDB
🛠 **sqlite3** y **sqlite** para SQLite
🛠 **dotenv** para configuración
🛠 **archiver** para comprimir backups

---

## 🔄 Restauración del Backup
### 🔹 MySQL / PostgreSQL:
```sh
mysql -u root -p tu_base_de_datos < backup.sql
```

### 🔹 MongoDB:
```sh
mongorestore --db tu_base_de_datos --archive=backup.gz
```

### 🔹 SQLite:
Simplemente reemplaza el archivo `.sqlite` con el backup.

---

## 🛠 Contribuir
1. **Haz un fork** del repositorio.
2. **Crea una rama** para tu cambio:
   ```sh
   git checkout -b mi-nueva-feature
   ```
3. **Realiza tus cambios** y haz commit:
   ```sh
   git commit -m "Agregada nueva funcionalidad"
   ```
4. **Sube tus cambios**:
   ```sh
   git push origin mi-nueva-feature
   ```
5. **Abre un Pull Request** en GitHub.

---

## 📄 Licencia
Este proyecto está bajo la licencia **MIT**.

---
