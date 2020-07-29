-- Postgres db dump
-- Note: double quote for column, single quote for value strings
-- For future: add additional column to todo to determine sequence within todo - enable adding/deleting todos

CREATE TABLE public.tech (
	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"url" varchar,
	"completed" BOOLEAN NOT NULL,
	CONSTRAINT "tech_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.todo (
	"_id" serial NOT NULL,
	"tech" integer NOT NULL,
	"name" varchar NOT NULL,
	"completed" BOOLEAN NOT NULL,
	"details" varchar NOT NULL,
	CONSTRAINT "todo_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.user (
	"_id" serial NOT NULL,
	"name" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL,
	"boardId" serial NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.stack (
	"_id" serial NOT NULL,
	"name" varchar NOT NULL UNIQUE,
	CONSTRAINT "stack_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.techInStack (
	"_id" serial NOT NULL,
	"stackName" varchar NOT NULL,
	"techName" varchar NOT NULL,
	CONSTRAINT "techInStack_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.board (
	"_id" serial NOT NULL,
	"stackId" serial NOT NULL,
	CONSTRAINT "board_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE public.tech ADD CONSTRAINT "tech_fk0" FOREIGN KEY ("name") REFERENCES "todo"("tech");


ALTER TABLE public.user ADD CONSTRAINT "user_fk0" FOREIGN KEY ("name") REFERENCES "board"("");
ALTER TABLE public.user ADD CONSTRAINT "user_fk1" FOREIGN KEY ("boardId") REFERENCES "board"("_id");

ALTER TABLE public.stack ADD CONSTRAINT "stack_fk0" FOREIGN KEY ("name") REFERENCES "techInStack"("stackName");

ALTER TABLE public.techInStack ADD CONSTRAINT "techInStack_fk0" FOREIGN KEY ("techName") REFERENCES "tech"("name");

ALTER TABLE public.board ADD CONSTRAINT "board_fk0" FOREIGN KEY ("stackId") REFERENCES "stack"("_id");

INSERT INTO public.board VALUES (1, 1);
INSERT INTO public.board VALUES (2, 2);

INSERT INTO public.techInStack VALUES (1, 'MERN', 'webpack');
INSERT INTO public.techInStack VALUES (2, 'MERN', 'mongodb');
INSERT INTO public.techInStack VALUES (3, 'MERN', 'express');
INSERT INTO public.techInStack VALUES (4, 'MERN', 'react');
INSERT INTO public.techInStack VALUES (5, 'MERN', 'node');
INSERT INTO public.techInStack VALUES (6, 'NERP', 'webpack');
INSERT INTO public.techInStack VALUES (7, 'NERP', 'node');
INSERT INTO public.techInStack VALUES (8, 'NERP', 'express');
INSERT INTO public.techInStack VALUES (9, 'NERP', 'react');
INSERT INTO public.techInStack VALUES (10, 'NERP', 'postgres');

INSERT INTO public.stack VALUES (1, 'MERN');
INSERT INTO public.stack VALUES (2, 'NERP');

INSERT INTO public.user VALUES (1, 'luis', 'apple', 1);
INSERT INTO public.user VALUES (2, 'andy', 'orange', 2);

INSERT INTO public.tech VALUES (1, 'webpack', 'https://webpack.js.org', false);
INSERT INTO public.tech VALUES (2, 'mongodb', 'https://docs.mongodb.com', false);
INSERT INTO public.tech VALUES (3, 'express', 'https://expressjs.com', false);
INSERT INTO public.tech VALUES (4, 'react', 'https://reactjs.com', false);
INSERT INTO public.tech VALUES (5, 'postgres', 'https://www.postgresql.org', false);

INSERT INTO public.todo (1, 'webpack', 'Install Webpack', false, 'While in the working directory of your project, run npm install webpack in the terminal.')
INSERT INTO public.todo (2, 'webpack', 'Initialize webpack.config', false, 'Create a new file in the root directory of your project, and name it "webpack.config.js.')
INSERT INTO public.todo (3, 'webpack', 'Entry point', false, 'Add the following to your webpack config file:↵   …pt file that renders your highest level component.')
INSERT INTO public.todo (4, 'webpack', 'Output', false, 'The output property tells webpack where to emit th…o the ./dist folder for any other generated file.')
INSERT INTO public.todo (5, 'webpack', 'Add loaders', false, 'Out of the box, webpack only understands JavaScript. Designate which loader should be used to do the transforming.')
INSERT INTO public.todo (6, 'webpack', 'Add plugins', false, 'In order to use a plugin, you need to require() it by calling it with the new operator.')
INSERT INTO public.todo (7, 'webpack', 'Specify webpack mode', false, 'By setting the mode parameter to either development, production or none, you can enable webpacks built-in optimizations that correspond to each environment. The default value is production.')
INSERT INTO public.todo (8, 'mongodb', 'Setup MongoDB', false, 'Setup Mongo database through installation of either a local shell or a cloud database.')


select setval('public.board__id_seq', 3, false);
select setval('public.techInStack__id_seq', 11, false);
select setval('public.stack__id_seq', 3, false);
select setval('public.user__id_seq', 3, false);
select setval('public.tech__id_seq', 6, false);
select setval('public.todo__id_seq', 9, false);


psql -d 'postgres://xwfwupup:I5FD-KWNhHKJfg6QSGBscjbLnIeaCM3C@ruby.db.elephantsql.com:5432/xwfwupup' -f 'postgres_create.sql'