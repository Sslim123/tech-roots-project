DROP Table IF EXISTS laptop_request, laptop_donation;
create table laptop_request (
    id serial primary key,
    firstname varchar(100),
    lastname varchar(100),
    email varchar(100),
    phonenumber varchar(100)
);

create table laptop_donation (
    id serial primary key,
    name varchar(100),
    address varchar(200),
    number_of_laptops INT,
    phone_number varchar(100),
    email varchar(100),
    delivery_option varchar(25)
);

