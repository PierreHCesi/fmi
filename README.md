# Projet web FMI

Dans le cadre de la validation des technologies Web,
une application permettant de gérer les feuilles de match des équipes de ligue 1 est mis en place 

### Requirements
---

- MySQL 5.7
- NPM

### Installation
---

```
https://github.com/PierreHCesi/fmi.git
cd fmi
```

### Mise en place du BACK-END
---

```
# Aller dans le dossier "back_API" et installer les dépendance de l'application Node JS
cd back_API
npm install

# Démarrer le serveur BACK-END
npm start
```

### Mise en place du FRONT-END
---

```
# Aller dans le dossier "back_API" et installer les dépendance de l'application Node JS
cd front
npm install

# Démarrer le serveur FRONT-END
npm run serve -- --port 8081
```

### Accès a l'application Web
---

```
# URL de connexion
http://localhost/8081

# Comptes Utilisateur de l'application Web
-------------------------------------
| User |    MDP    |      Rôles     |
|------|-----------|----------------|
| titi | titi1234  | Administration |
|------|-----------|----------------|
| om   | om1234    | User           |
|------|-----------|----------------|
| psg  | psg1234   | User           |
-------------------------------------
```

### Auteurs 
---
Benjamin OLIVEIRA - Pierre HERRER\
CESI 2020-2021 : Responsable en ingénierie des logiciels
