drop table if exists articles;

create table articles(
    id int primary key not null AUTO_INCREMENT,
    titre Varchar(30) not null,
    auteur Varchar(30) not null,
    contenu Varchar(255)
);

insert into articles(titre,auteur,contenu) VALUES 
("FrontEnd","Paul","astuce frontend :css, responsive"),
("Backend","Toto","astuces baackend: design pattern, MVC")