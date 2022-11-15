DROP Table IF EXISTS laptop_request, laptop_donation, laptop_assignment;
DROP TYPE IF EXISTS assignment_status, laptop_request_status;

CREATE TYPE laptop_request_status AS ENUM ('ACTIVE', 'CANCELLED');

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
    delivery_option varchar(25)
);

CREATE TYPE assignment_status AS ENUM ('ASSIGNED', 'ACCEPTED', 'FULFILLED');
create table laptop_assignment (
    id SERIAL PRIMARY KEY,
    laptop_request_id INT REFERENCES laptop_request(id),
    laptop_donation_id INT REFERENCES laptop_donation(id),
    status assignment_status 


 

);
