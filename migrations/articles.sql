drop table if exists event_partenaire;
drop table if exists reponse;
drop table if exists postes;
drop table if exists media;
drop table if exists mediaType;
drop table if exists partenaire_user;
drop table if exists event_user;
drop table if exists categories;
drop table if exists evenements;
drop table if exists partenaires;
drop table if exists roles;
drop table if exists users;


create table roles(
id int primary key not null AUTO_INCREMENT,
nom varchar(10)
);
insert into roles(nom) values("admin"),("partenaire"),("user");

create table users(
id int primary key not null AUTO_INCREMENT,
nom varchar(10),
prenom varchar(10),
nomMoral varchar(30),
email varchar(30),
login varchar(10),
password varchar(30),
avatar varchar(20),
id_role int,
adresse varchar(50)
);

insert into users(nom,prenom,nomMoral,email,login,password,avatar,id_role,adresse) 
values ("admin","admin","","admin@mail.fr","admin","","",1,""),
("","","part1","part1@mail.fr","part1","","kabardock.png",2,""),
("","","part2","part2@mail.fr","part2","","evian.png",2,""),
("","","part3","part3@mail.fr","part3","","kabardock.png",2,""),
("","","part4","part4@mail.fr","part4","","kabardock.png",2,""),
("user","user","","user@mail.fr","user","user","",3,"");

CREATE TABLE evenements (
id int primary key not null AUTO_INCREMENT,
  nom varchar(45) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  dateDebut datetime DEFAULT NULL,
  dateFin datetime DEFAULT NULL,
  dateLimit datetime DEFAULT NULL,
  lieu  varchar(45) DEFAULT NULL,
  categorie varchar(30),
  isPublic int DEFAULT NULL,
  nbPlace int DEFAULT NULL,
  prix int DEFAULT NULL,
  affiche varchar(30) default null
);
CREATE TABLE partenaires(

id int primary key not null AUTO_INCREMENT,
  nom varchar(45) DEFAULT NULL,
adresse varchar(45) DEFAULT NULL

);

CREATE TABLE categories(
id int primary key not null AUTO_INCREMENT,
categorie varchar(30)
);
insert into categories(categorie) VALUES("theatre"),("music"),("exposition");

INSERT INTO evenements
(
nom,description,
dateDebut,
dateFin,
dateLimit,
lieu,
categorie,
isPublic,
nbPlace,
prix,affiche
)
VALUES(
'test1',
'event test',
CAST('2021-01-10 08:00:00' AS datetime),
CAST('2021-01-15 17:00:00' AS datetime),
CAST('2021-12-20 15:00:00' AS datetime),
"4 Rue Emile Hugot",
"music",
1,
200,
15,"5560.jpg"),
(
'test2',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit nulla eget tortor bibendum, ac suscipit eros consequat. Suspendisse molestie massa nec metus rhoncus, nec fermentum leo tempor. Pellentesque vitae luctus metus.',
CAST('2021-05-05 08:00:00' AS datetime),
CAST('2021-05-15 17:00:00' AS datetime),
CAST('2021-04-20 15:00:00' AS datetime),
"20 rue des praies",
"theatre",
1,
200,
15,"5560.jpg"),
(
'test3',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit nulla eget tortor bibendum, ac suscipit eros consequat.',
CAST('2022-10-05 08:00:00' AS datetime),
CAST('2022-10-15 17:00:00' AS datetime),
CAST('2022-09-20 15:00:00' AS datetime),
"4 Rue Emile Hugot",
"exposition",
1,
200,
15,"5560.jpg"),
(
'test4',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit nulla eget tortor bibendum, ac suscipit eros consequat.',
CAST('2022-10-05 08:00:00' AS datetime),
CAST('2022-10-15 17:00:00' AS datetime),
CAST('2022-09-20 15:00:00' AS datetime),
"20 rue des praies",
"theatre",
1,
200,
15,"5560.jpg");
CREATE TABLE event_partenaire(
id int primary key not null AUTO_INCREMENT,
id_event int not null,
id_user int not null,
CONSTRAINT fk_Events FOREIGN KEY (id_Event)
    REFERENCES evenements(id),
    CONSTRAINT fk_Partenaire FOREIGN KEY (id_user)
    REFERENCES users(id)
);
insert into event_partenaire (id_Event,id_user) VALUES(1,2),(1,3) ;
create table mediaType(
id int primary key not null AUTO_INCREMENT,
libelle varchar(10)
);

insert into mediaType(libelle) values ("gallerie"),("qrcode");

CREATE TABLE media(
id int primary key not null AUTO_INCREMENT,
nom varchar(30) default null,
id_event int not null,
id_user int ,
id_type int not null,
CONSTRAINT fk_Type_Media FOREIGN KEY (id_type)
    REFERENCES mediaType(id),
CONSTRAINT fk_Events_Media FOREIGN KEY (id_event)
    REFERENCES evenements(id),
    CONSTRAINT fk_User_Media FOREIGN KEY (id_user)
    REFERENCES users(id)
);
insert into media(nom,id_Event,id_type)
values("20759.jpg",1,1), ("20759.jpg",2,1),("5560.jpg",3,1),("5560.jpg",4,1),("5560.jpg",1,1);

create table event_user(
id int primary key not null AUTO_INCREMENT,
id_user int not null,
id_event int not null,
CONSTRAINT fk_Events_User FOREIGN KEY (id_user)
    REFERENCES users(id),
    CONSTRAINT fk_User_Event FOREIGN KEY (id_Event)
    REFERENCES evenements(id)
);

create table partenaire_user(
id int primary key not null AUTO_INCREMENT,
id_user int not null,
id_partenaire int not null,
CONSTRAINT fk_Partenaire_User FOREIGN KEY (id_user)
    REFERENCES users(id),
    CONSTRAINT fk_User_Partenaire FOREIGN KEY (id_partenaire)
    REFERENCES users(id)
);

create table postes(
id int primary key not null AUTO_INCREMENT,
titre varchar(20),
text varchar(255),
date_creation datetime,
id_user int,
CONSTRAINT fk_Posts_User FOREIGN KEY (id_user)
    REFERENCES users(id)
);

create table reponse(
id int primary key not null AUTO_INCREMENT,
date_creation datetime,
text varchar(30),
id_poste int,
id_user int,
CONSTRAINT fk_Reponse_Post FOREIGN KEY (id_poste)
    REFERENCES postes(id),
CONSTRAINT fk_Reponse_User FOREIGN KEY (id_user)
    REFERENCES users(id)
);
insert into postes(titre,date_creation,text,id_user) 
values ("titre1",CAST('2022-10-05 08:00:00' AS datetime),"sometexta  e e",3),
("titre2",CAST('2022-10-05 08:00:00' AS datetime),"sometexta  e e",3);

insert into reponse(date_creation,text,id_poste,id_user) VALUES
(CAST('2022-10-05 08:00:00' AS datetime),"ok",1,3),(CAST('2022-10-05 08:00:00' AS datetime),"essaye ça",1,3)