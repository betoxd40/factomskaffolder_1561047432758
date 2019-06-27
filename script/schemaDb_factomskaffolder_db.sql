

CREATE TABLE IF NOT EXISTS doctor (
	first_name varchar(130)  NOT NULL,
	last_name varchar(130) ,
	speciality varchar(130) ,

	-- RELAZIONI
	identity int  REFERENCES identity(_id),
	patient int  REFERENCES patient(_id),

	_id serial NOT NULL PRIMARY KEY

);

--
-- Struttura della tabella `identity`
--

CREATE TABLE IF NOT EXISTS identity (
	chain_id varchar(130)  NOT NULL,
	entry_hash varchar(130)  NOT NULL,
	key_pairs json,
	stage varchar(130)  NOT NULL,
	_id serial NOT NULL PRIMARY KEY
);





--
-- Struttura della tabella `patient`
--

CREATE TABLE IF NOT EXISTS patient (
	condition varchar(130) ,
	first_name varchar(130)  NOT NULL,
	last_name varchar(130) ,

	-- RELAZIONI

	_id serial NOT NULL PRIMARY KEY

);


--
-- Struttura della tabella `user`
--

CREATE TABLE IF NOT EXISTS "user" (
	mail varchar(130) ,
	name varchar(130) ,
	password varchar(130)  NOT NULL,
	roles varchar(130) ,
	surname varchar(130) ,
	username varchar(130)  NOT NULL,
	_id serial NOT NULL PRIMARY KEY

);


INSERT INTO "user" (username, password, _id) VALUES ('admin', '62f264d7ad826f02a8af714c0a54b197935b717656b80461686d450f7b3abde4c553541515de2052b9af70f710f0cd8a1a2d3f4d60aa72608d71a63a9a93c0f5', 1);

CREATE TABLE IF NOT EXISTS roles (
	role varchar(30) ,

	-- RELAZIONI

	_user int  NOT NULL REFERENCES "user"(_id),
	_id int NOT NULL PRIMARY KEY

);

INSERT INTO roles (role, _user, _id) VALUES ('ADMIN', '1', 1);






