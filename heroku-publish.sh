# permet de se connecter au "Heroku Container Registry" (il faut préalablement avoir fait un 'heroku login')
heroku container:login
# pousse sur Heroku une image créée sur base du Dockerfile et spécifie que c'est une application web
heroku container:push web -a prid-2122-f02
# publie et active l'image précédemment poussée
heroku container:release web -a prid-2122-f02