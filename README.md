# Dashboard

Le but de ce projet est d'implémenté une application web style dashboard

## Qu'est ce que c'est

Le tableau de bord (le dashboard) est une représentation visuelle des informations les plus importantes, regroupées sur un écran afin de pouvoir être facilement comprises.
Nous avons ici trois services: 
        - La méteo
        - La recherche d'une vidéo Youtube
        - Steam 

### Qu'offre ces services

```
Il y a deux widgets pour la météo :
        - L'affichage de la température, l'humidité dans l'aire, les températures maximal et minimal ainsi que l'état du ciel de la journée courrante.
        - L'affichage de la température, l'humidité dans l'aire, les températures maximal et minimal ainsi que l'état du ciel des cing prochains jours.

Il y a un widget pour Youtube:
        - Recherche et lecture de vidéo youtube.
        
Il y a trois widgets pour Steam:
        - Affichage du login, de l'avatar et de l'état de connection d'une personne.
        - Affichage de la liste des deerniers jeux joué d'une personne.
        - Affichage de la liste de l'ID des amis d'une personne.
          
```

### Comment utiliser ces services

```
Météo :
    - Entrer le nom d'une ville et valider avec Get weather.

Youtube;
    - Entrer le nom d'une vidéo et valider.

Steam:
    - Entrer l'ID d'un utilisateur et valider. 
```


### Installing

```
Installer le module npm

```

```
Lancer : npm install

Cela installera toute les dépendences mise dans le fichier package.json

Rendez vous sur https:://localhost:8080
```

### Mise en route

```
Lancer : node server.js
```

### Mise en route avec Docker

```
Lancer : docker-compose build

Puis : docker-compose up

Rendez vous sur https:://localhost:8080
```

## Built With

* [NodeJS](https://nodejs.org/en/)
* [Passport](http://www.passportjs.org/)
* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)


## Authors

* **Maximilien Desnos**
* **Lejeune Simon**

## License

This project is licensed to Epitech