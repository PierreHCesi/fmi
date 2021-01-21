# Projet web FMI

Dans le cadre de la validation des technologies Web,
une application permettant de gérer les feuilles de match des équipes de ligue 1 est mis en place 

### Requirements
---

- MySQL 5.7
- Node JS (12.18 ou supérieur)
- NPM (6.14 ou supérieur)

### Installation
---

```
git clone https://github.com/PierreHCesi/fmi.git
cd fmi
```

### Installation des dépendances
---

```
# Installer les dépendances des Frameworks NODE JS et VUE JS
./install.sh
```

### Mise en place de la base de données
---

```
# Aller dans le dossier "Script" et récupérer le fichier fmi.sql 
cd Script

# Importer le script dans votre base de données locale
# /!\ si votre BDD n'est pas en locale, veuillez modifier le fichier db.config
cd ../back_API/config/db.config
```

### Lancement de la solution
---

```
# Lancer la solution
cd back_API
npm run start
```

### Accès a l'application Web
---

```
# URL de connexion
http://localhost/8081

# Comptes Utilisateurs de l'application Web
----------------------------------------
|   User  |    MDP    |      Rôles     |
|---------|-----------|----------------|
| thierry | titi1234  | Présentateur   |
|---------|-----------|----------------|
| om      | om1234    | Entraineur     |
|---------|-----------|----------------|
| psg     | psg1234   | Entraineur     |
----------------------------------------
```

### Auteurs 
---
Benjamin OLIVEIRA - Pierre HERRER\
CESI 2020-2021 : Responsable en ingénierie des logiciels
