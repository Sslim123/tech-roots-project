DROP Table IF EXISTS laptop_request, laptop_donation, laptop_assignment;
DROP TYPE IF EXISTS assignment_status, laptop_request_status, delivery_option;

CREATE TYPE laptop_request_status AS ENUM ('ACTIVE', 'CANCELLED');
CREATE TYPE delivery_option AS ENUM ('SHIP', 'PICKUP');

create table laptop_request (
    id char(10) DEFAULT nanoid(10) PRIMARY KEY,
    firstname varchar(100),
    lastname varchar(100),
    email varchar(100),
    phonenumber varchar(100),
    laptop_request_status laptop_request_status DEFAUlT 'ACTIVE'
);

create table laptop_donation (
    id char(10) DEFAULT nanoid(10) PRIMARY KEY,
    name varchar(100),
    address varchar(200),
    number_of_laptops INT,
    phone_number varchar(100),
    email varchar(100), 
    delivery_option delivery_option
);

CREATE TYPE assignment_status AS ENUM ('ASSIGNED', 'ACCEPTED', 'FULFILLED');
create table laptop_assignment (
    id char(10) DEFAULT nanoid(10) PRIMARY KEY,
    laptop_request_id char(10) REFERENCES laptop_request(id),
    laptop_donation_id char(10) REFERENCES laptop_donation(id),
    status assignment_status DEFAUlT 'ASSIGNED'

);
