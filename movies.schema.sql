create table if not exists movies(
    id serial primary key,
    title varchar(200),
    actor varchar(200),
    overview varchar(200)
);