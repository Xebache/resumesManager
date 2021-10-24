# supprime le conteneur s'il existe déjà
docker rm -f prid-2122-f02
# crée l'image en utilisant le fichier Dockerfile
docker build . -t prid-2122-f02
# crée un conteneur du même nom en démarrant l'image prid-2122-f02 et rend le port 80 du conteneur accessible 
docker run -d --name prid-2122-f02 -p 80:80 prid-2122-f02