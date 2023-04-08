# Utiliza una imagen base de Python
FROM python:3.9-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de requisitos
COPY requirements.txt .

# Instala los paquetes necesarios
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código fuente de la aplicación al contenedor
COPY . .

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 5001

VOLUME ["/app/instance"]

# Define la variable de entorno para Flask
ENV FLASK_APP=app.py

# Ejecuta la aplicación de Flask
#CMD ["flask", "run", "--host", "0.0.0.0"]
CMD ["python", "./app.py",]
