CREATE DATABASE IF NOT EXISTS bemobi-lucasliu;
USE bemobi-lucasliu;

CREATE TABLE shortened(
	alias varchar(100) NOT NULL PRIMARY KEY,
	url varchar(200) NOT NULL,
	clicks int NOT NULL DEFAULT 0
);

