--1.  Create countries table
CREATE TABLE countries (
	country VARCHAR NOT NULL,
	rank INT NOT NULL,
	area FLOAT NOT NULL,
	landAreaKm FLOAT NOT NULL,	
	cca2 VARCHAR(2) NOT NULL,
	cca3 VARCHAR(3) NOT NULL,
	netChange FLOAT,
	growthRate FLOAT NOT NULL,
	worldPercentage FLOAT,
	density FLOAT NOT NULL,
	densityMi FLOAT NOT NULL,
	place INT NOT NULL,
	pop1980 BIGINT NOT NULL,
	pop2000	BIGINT NOT NULL,
	pop2010 BIGINT NOT NULL,
	pop2022 BIGINT NOT NULL,
	pop2023 BIGINT NOT NULL,
	pop2030 BIGINT NOT NULL,
	pop2050 BIGINT NOT NULL,
	PRIMARY KEY (country)
);

--2. Import data (countries-table.csv) using IMPORT/EXPORT

--3. Verify import
SELECT * FROM countries;

SELECT TO_CHAR(SUM(pop1980), 'fm9,999,999,999,999.99') AS sum_pop1980 FROM countries;