CREATE TABLE product (
	id serial PRIMARY KEY,
	name VARCHAR (255) NOT NULL,
	description text,
	image1 VARCHAR,
	image2 VARCHAR,
	image3 VARCHAR,
	submitted_on TIMESTAMP NOT NULL
);

CREATE TABLE price (
	product_id integer NOT NULL,
	price VARCHAR NOT NULL,
	time TIMESTAMP NOT NULL,
	PRIMARY KEY (product_id),
	CONSTRAINT product_price_product_id_fkey FOREIGN KEY (product_id)
      REFERENCES product (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);