drop table if exists melp_evaluation.restaurant;

create table melp_evaluation.restaurant(
    id text not null,
    rating int,
    name text not null,
    site text,
    email text,
    phone text,
    city text,
    state text,
    lat numeric(12,12),
    lng numeric(12,12),
    created_at timestamp with time zone DEFAULT current_timestamp,
    updated_at timestamp with time zone DEFAULT current_timestamp,
    PRIMARY KEY(id)
);

ALTER TABLE melp_evaluation.restaurant OWNER to melp_user;
GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE melp_evaluation.restaurant TO melp_user;
