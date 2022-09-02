DO $$
DECLARE 
i TEXT;
BEGIN
    FOR i IN (select table_name from information_schema.tables where table_catalog='myevents' and table_schema='public') LOOP
    if i != '_prisma_migrations' then
	EXECUTE 'Select setval('''||i||'_id_seq'',1,false);';
	end if;
    END LOOP;
END$$;

DO $$
DECLARE 
i TEXT;
BEGIN
    FOR i IN (select table_name from information_schema.tables where table_catalog='myevents' and table_schema='public') LOOP
    EXECUTE 'delete from '||i||';';
    END LOOP;
END$$;

insert into roles("nomRole") values('admin'),('user'),('partener');
insert into categories(categorie,icon) VALUES('theatre','theater'),('music','mmusic'),('exposition','account-group');
insert into users(nom,prenom,email,login,password,id_role,adresse,token) 
values ('admin','admin','admin@mail.fr','admin','$04$rCzB4h2yxwPHsV5AGxkuH.ZXAKWtPPlO2a49gSPcSNsRySVcd8c7O',1,'',''),
('user1','user1','user1@mail.fr','user1','$2y$10$2bKE00JV6HAMbXsPaHW1PeV6gFtwIwXBwKyVmy.cwRG.lH4g20gxO',2,'	adresse1',''),
('user','user','user@mail.fr','user','$2y$10$wLGDCA9pb9uiqibA1zuHQeTDr3CFGDFys8TFrQJqA91xouBTslWue',2,'adresse2','');
insert into lieu("nomLieu",adresse) values('Nordev','1 Rue du Karting, B.P. 287 97494 Sainte-Clotilde'),('lieu2','4 Rue Emile Hugot'),('dance','8 Rue de la Fraternité');
INSERT INTO evenements
(
nom,description,
"dateDebut",
"dateFin",
"dateLimit",
id_lieu,
id_categorie,
"isPublic",
"nbPlace",
prix,affiche
)
VALUES(
'dance1',
'event test',
CAST('2021-01-10 08:00:00' AS TIMESTAMP),
CAST('2021-01-15 17:00:00' AS TIMESTAMP),
CAST('2021-12-20 15:00:00' AS TIMESTAMP),
2,
2,
true,
200,
15,'5560.jpg'),
(
'dance2',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit nulla eget tortor bibendum, ac suscipit eros consequat. Suspendisse molestie massa nec metus rhoncus, nec fermentum leo tempor. Pellentesque vitae luctus metus.',
CAST('2021-05-05 08:00:00' AS TIMESTAMP),
CAST('2021-05-15 17:00:00' AS TIMESTAMP),
CAST('2021-04-20 15:00:00' AS TIMESTAMP),
1,
1,
true,
200,
15,'5560.jpg'),
(
'test3',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit nulla eget tortor bibendum, ac suscipit eros consequat.',
CAST('2022-10-05 08:00:00' AS TIMESTAMP),
CAST('2022-10-15 17:00:00' AS TIMESTAMP),
CAST('2022-09-20 15:00:00' AS TIMESTAMP),
1,
3,
true,
200,
15,'5560.jpg'),
(
'test4',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit nulla eget tortor bibendum, ac suscipit eros consequat.',
CAST('2022-10-05 08:00:00' AS TIMESTAMP),
CAST('2022-10-15 17:00:00' AS TIMESTAMP),
CAST('2022-09-20 15:00:00' AS TIMESTAMP),
1,
1,
true,
200,
15,'5560.jpg'),
(
'ballet',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit nulla eget tortor bibendum, ac suscipit eros consequat.',
CAST('2022-10-05 08:00:00' AS TIMESTAMP),
CAST('2022-10-15 17:00:00' AS TIMESTAMP),
CAST('2022-09-20 15:00:00' AS TIMESTAMP),
3,
2,
true,
200,
15,'5560.jpg');
insert into mediaType(libelle) values ('gallerie'),('qrcode'),('plan');
insert into media(image,id_Event,id_type,id_user)
values('concert1.jpg',1,1,null), ('concert2.jpg',2,1,null),('concert1.jpg',3,1,null),('nordev1.png',3,3,null),('concert3.jpg',4,1,null),('2025_22156.png',1,2,3);
insert into stands ("nomStand",id_lieu) values('Paille en queue',1),('tec tect',1);
insert into event_stand(id_event,id_stand,id_user,activite) values(5,1,3,'lecon de danse'),(3,2,2,'lecon de danse rap');
insert into event_user(id_user,id_event) values (1,3);
insert into questionnaire(libelle,id_event) values('Amélioration',3);
insert into questions(question,id_questionnaire) values ('Propreté',1),('organisation',1),('Diversité',1);
insert into question_user(id_user,id_question,stars) values(1,1,3),(1,2,2.5),(1,3,4),(2,1,5);
