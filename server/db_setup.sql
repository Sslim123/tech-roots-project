DROP Table IF EXISTS laptop_request, laptop_donation, laptop_assignment;
DROP TYPE IF EXISTS assignment_status, laptop_request_status, delivery_option;

CREATE TYPE laptop_request_status AS ENUM ('ACTIVE', 'CANCELLED');
CREATE TYPE delivery_option AS ENUM ('SHIP', 'PICKUP');

create table laptop_request (
    id serial primary key,
    firstname varchar(100),
    lastname varchar(100),
    email varchar(100),
    phonenumber varchar(100),
    laptop_request_status laptop_request_status DEFAUlT 'ACTIVE'
);

create table laptop_donation (
    id serial primary key,
    name varchar(100),
    address varchar(200),
    number_of_laptops INT,
    phone_number varchar(100),
    email varchar(100), 
    delivery_option delivery_option
);

CREATE TYPE assignment_status AS ENUM ('ASSIGNED', 'ACCEPTED', 'FULFILLED');
create table laptop_assignment (
    id serial primary key,
    laptop_request_id int REFERENCES laptop_request(id),
    laptop_donation_id int  REFERENCES laptop_donation(id),
    status assignment_status DEFAUlT 'ASSIGNED'

);