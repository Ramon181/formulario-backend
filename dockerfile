# Define la imagen base
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

COPY . .
# Expone el puerto en el que la aplicación estará escuchando
EXPOSE 8080

# Define el comando para ejecutar la aplicación
CMD [ "npm", "start" ]