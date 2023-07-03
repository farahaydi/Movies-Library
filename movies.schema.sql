create table if not exists movie(
    id serial primary key,
    title varchar(200),
    actor varchar(200),
    overview varchar(200),
    comment varchar(5000)
);