GOOGLE_PROJECT_ID=endless-bolt-388502
CLOUD_RUN_SERVICE=endless-bolt-388502-service
INSTANCE_CONNECTION_NAME=endless-bolt-388502:southamerica-east1:formulario-database
DB_USER=root
DB_PASS=12345
DB_NAME=form

gcloud auth configure-docker \
    southamerica-east1-docker.pkg.dev

docker build -t gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE:v9 .

# Enviar la imagen al registro de Artifact Registry
docker push gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE:v9


gcloud run deploy $CLOUD_RUN_SERVICE \
   --image gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE:v9 \
   --platform managed \
   --region southamerica-east1 \
   --allow-unauthenticated \
   --add-cloudsql-instances=$INSTANCE_CONNECTION_NAME


gcloud run services update $CLOUD_RUN_SERVICE \
  --region southamerica-east1 \
  --platform managed \
  --update-env-vars INSTANCE_CONNECTION_NAME=$INSTANCE_CONNECTION_NAME,DB_PASS=$DB_PASS,DB_USER=$DB_USER,DB_NAME=$DB_NAME

gcloud run services update-traffic $CLOUD_RUN_SERVICE \
  --region southamerica-east1 \
  --to-latest

SERVICE_URL=$(gcloud run services describe $CLOUD_RUN_SERVICE --region southamerica-east1 --format 'value(status.url)')

echo "El servicio se ha desplegado correctamente en la siguiente URL:"
echo $SERVICE_URL

