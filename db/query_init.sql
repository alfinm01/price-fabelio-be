CREATE TABLE product (
	id serial PRIMARY KEY,
	name VARCHAR NOT NULL,
	description text,
	latest_price VARCHAR NOT NULL,
	image1 VARCHAR,
	image2 VARCHAR,
	image3 VARCHAR,
	LINK VARCHAR NOT NULL,
	submitted_on TIMESTAMP NOT NULL
);

CREATE TABLE price (
	id serial PRIMARY KEY,
	product_id integer NOT NULL,
	price VARCHAR NOT NULL,
	time TIMESTAMP NOT NULL,
	CONSTRAINT product_price_product_id_fkey FOREIGN KEY (product_id)
      REFERENCES product (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);