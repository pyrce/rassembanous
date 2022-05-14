drop table if exists partenaire_user;
drop table if exists event_partenaire;
drop table if exists question_user;
drop table if exists questions;
drop table if exists questionnaire;
drop table if exists partenaires;
drop table if exists media;
drop table if exists event_stand;
drop table if exists stands;
drop table if exists lieu;
drop table if exists mediaType;
drop table if exists event_user;
drop table if exists evenements;
drop table if exists categories;
drop table if exists partenaires;
drop table if exists users;
drop table if exists roles;

create table roles(
id int primary key not null AUTO_INCREMENT,
role varchar(10)
);
insert into roles(role) values("admin"),("user"),("partener");

CREATE TABLE categories(
id int primary key not null AUTO_INCREMENT,
categorie varchar(30),
icon varchar(20)
);

create table users(
id int primary key not null AUTO_INCREMENT,
nom varchar(10),
prenom varchar(10),
email varchar(30),
login varchar(10),
password varchar(255),
avatar varchar(20),
id_role int,
adresse varchar(50),
token varchar(255),
    CONSTRAINT fk_Role FOREIGN KEY (id_role)
    REFERENCES roles(id)
);

insert into users(nom,prenom,email,login,password,id_role,adresse,token) 
values ("admin","admin","admin@mail.fr","admin","$04$rCzB4h2yxwPHsV5AGxkuH.ZXAKWtPPlO2a49gSPcSNsRySVcd8c7O",1,"",""),
("user1","user1","user1@mail.fr","user1","$2y$10$2bKE00JV6HAMbXsPaHW1PeV6gFtwIwXBwKyVmy.cwRG.lH4g20gxO",2,"	adresse1",""),
("user","user","user@mail.fr","user","$2y$10$wLGDCA9pb9uiqibA1zuHQeTDr3CFGDFys8TFrQJqA91xouBTslWue",2,"adresse2","");

CREATE TABLE evenements (
id int primary key not null AUTO_INCREMENT,
  nom varchar(45) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  dateDebut datetime DEFAULT NULL,
  dateFin datetime DEFAULT NULL,
  dateLimit datetime DEFAULT NULL,
  id_lieu int DEFAULT NULL,
  id_categorie int,
  isPublic int DEFAULT NULL,
  nbPlace int DEFAULT NULL,
  prix int DEFAULT NULL,
  affiche varchar(30) default null,
      CONSTRAINT fk_Categorie FOREIGN KEY (id_categorie)
    REFERENCES categories(id)
);

insert into categories(categorie,icon) VALUES("theatre","theater"),("music","mmusic"),("exposition","account-group");
create table lieu(
id int primary key not null AUTO_INCREMENT,
nomLieu varchar(30),
adresse varchar(255)
);
insert into lieu (nomLieu,adresse) values("Nordev","1, Rue du Karting, B.P. 287 97494 Sainte-Clotilde"),("lieu2","4 Rue Emile Hugot"),("dance","8 Rue de la Fraternité");
INSERT INTO evenements
(
nom,description,
dateDebut,
dateFin,
dateLimit,
id_lieu,
id_categorie,
isPublic,
nbPlace,
prix,affiche
)
VALUES(
'dance1',
'event test',
CAST('2021-01-10 08:00:00' AS datetime),
CAST('2021-01-15 17:00:00' AS datetime),
CAST('2021-12-20 15:00:00' AS datetime),
2,
2,
1,
200,
15,"5560.jpg"),
(
'dance2',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit nulla eget tortor bibendum, ac suscipit eros consequat. Suspendisse molestie massa nec metus rhoncus, nec fermentum leo tempor. Pellentesque vitae luctus metus.',
CAST('2021-05-05 08:00:00' AS datetime),
CAST('2021-05-15 17:00:00' AS datetime),
CAST('2021-04-20 15:00:00' AS datetime),
1,
1,
1,
200,
15,"5560.jpg"),
(
'test3',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit nulla eget tortor bibendum, ac suscipit eros consequat.',
CAST('2022-10-05 08:00:00' AS datetime),
CAST('2022-10-15 17:00:00' AS datetime),
CAST('2022-09-20 15:00:00' AS datetime),
1,
3,
1,
200,
15,"5560.jpg"),
(
'test4',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit nulla eget tortor bibendum, ac suscipit eros consequat.',
CAST('2022-10-05 08:00:00' AS datetime),
CAST('2022-10-15 17:00:00' AS datetime),
CAST('2022-09-20 15:00:00' AS datetime),
1,
1,
1,
200,
15,"5560.jpg"),
(
'ballet',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit nulla eget tortor bibendum, ac suscipit eros consequat.',
CAST('2022-10-05 08:00:00' AS datetime),
CAST('2022-10-15 17:00:00' AS datetime),
CAST('2022-09-20 15:00:00' AS datetime),
3,
2,
1,
200,
15,"5560.jpg");


create table mediaType(
id int primary key not null AUTO_INCREMENT,
libelle varchar(10)
);

insert into mediaType(libelle) values ("gallerie"),("qrcode"),("plan");

CREATE TABLE media(
id int primary key not null AUTO_INCREMENT,
image varchar(30) default null,
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
insert into media(image,id_Event,id_type,id_user)
values("concert1.jpg",1,1,null), ("concert2.jpg",2,1,null),("concert1.jpg",3,1,null),("nordev1.png",3,3,null),("concert3.jpg",4,1,null),("2025_22156.png",1,2,3);

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


create table stands(
id int primary key not null AUTO_INCREMENT,
nomStand varchar(30),
id_lieu int not null,
 CONSTRAINT fk_lieu FOREIGN KEY (id_lieu)
    REFERENCES lieu(id)
);

create table event_stand(
id int primary key not null AUTO_INCREMENT,
id_event int not null,
id_stand int not null,
 id_user int not null,
 activite varchar(255),
 CONSTRAINT fk_event_stand FOREIGN KEY (id_event)
    REFERENCES evenements(id),
 CONSTRAINT fk_stand FOREIGN KEY (id_stand)
    REFERENCES stands(id),
    CONSTRAINT fk_Partenaire_stand FOREIGN KEY (id_user)
    REFERENCES users(id)
);

create table questionnaire(
id int primary key not null AUTO_INCREMENT,
id_event int,
 CONSTRAINT fk_questionaire FOREIGN KEY (id_event)
    REFERENCES evenements(id),
libelle varchar(50)
);

create table questions(
id int primary key not null AUTO_INCREMENT,
id_questionnaire int,
question varchar(30),
 CONSTRAINT fk_question FOREIGN KEY (id_questionnaire)
    REFERENCES questionnaire(id)
);
create table question_user(
id int primary key not null AUTO_INCREMENT,
id_user int,
id_question int,
stars float,
 CONSTRAINT fk_user_question FOREIGN KEY (id_user)
    REFERENCES users(id)
);

insert into stands (nomStand,id_lieu) values("Paille en queue",1),("tec tect",1);
insert into event_stand(id_event,id_stand,id_user,activite) values(5,1,3,"lecon de danse"),(3,2,2,"lecon de danse rap");
insert into event_user(id_user,id_event) values (1,3);
insert into questionnaire(libelle,id_event) value("Amélioration",3);
insert into questions(question,id_questionnaire) values ("Propreté",1),("organisation",1),("Diversité",1);
insert into question_user(id_user,id_question,stars) values(1,1,3),(1,2,2.5),(1,3,4),(2,1,5);
