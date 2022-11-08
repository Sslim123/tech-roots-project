DROP Table IF EXISTS laptop_request, laptop_donations;
create table laptop_request (
    id serial primary key,
    firstname varchar(100),
    lastname varchar(100),
    email varchar(100),
    phonenumber varchar(100)
);

create table laptop_donations (
    id serial primary key,
    name varchar(100),
    address varchar(100),
    laptops INT,
    phonenumber varchar(100),
    email varchar(100),
    deliveryOption varchar(25)
);

