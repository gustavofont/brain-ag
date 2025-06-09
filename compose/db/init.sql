--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Ubuntu 17.5-1.pgdg24.04+1)

-- Started on 2025-06-07 14:25:15 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

-- CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3401 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 223 (class 1255 OID 16385)
-- Name: atualizar_farm_updatedat(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.atualizar_farm_updatedat() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW."updatedAt" := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.atualizar_farm_updatedat() OWNER TO postgres;

--
-- TOC entry 225 (class 1255 OID 16386)
-- Name: atualizar_harvest_updatedat(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.atualizar_harvest_updatedat() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW."updatedAt" := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.atualizar_harvest_updatedat() OWNER TO postgres;

--
-- TOC entry 224 (class 1255 OID 16387)
-- Name: atualizar_updatedat(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.atualizar_updatedat() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW."updatedAt" := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.atualizar_updatedat() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16388)
-- Name: farm; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.farm (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    city character varying(100) NOT NULL,
    state character varying(100) NOT NULL,
    "fieldSize" integer NOT NULL,
    "cultivableField" integer NOT NULL,
    "vegetationField" integer NOT NULL,
    owner integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.farm OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16393)
-- Name: farm_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.farm_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.farm_id_seq OWNER TO postgres;

--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 218
-- Name: farm_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.farm_id_seq OWNED BY public.farm.id;


--
-- TOC entry 222 (class 1259 OID 16439)
-- Name: harvest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.harvest (
    id integer NOT NULL,
    year integer NOT NULL,
    culture character varying(50) NOT NULL,
    farm integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.harvest OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16438)
-- Name: harvest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.harvest_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.harvest_id_seq OWNER TO postgres;

--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 221
-- Name: harvest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.harvest_id_seq OWNED BY public.harvest.id;


--
-- TOC entry 219 (class 1259 OID 16400)
-- Name: producer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.producer (
    id integer NOT NULL,
    "cpfOrCnpj" character varying(20),
    name text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.producer OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16407)
-- Name: producer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.producer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.producer_id_seq OWNER TO postgres;

--
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 220
-- Name: producer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.producer_id_seq OWNED BY public.producer.id;


--
-- TOC entry 3223 (class 2604 OID 16408)
-- Name: farm id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farm ALTER COLUMN id SET DEFAULT nextval('public.farm_id_seq'::regclass);


--
-- TOC entry 3229 (class 2604 OID 16442)
-- Name: harvest id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.harvest ALTER COLUMN id SET DEFAULT nextval('public.harvest_id_seq'::regclass);


--
-- TOC entry 3226 (class 2604 OID 16410)
-- Name: producer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producer ALTER COLUMN id SET DEFAULT nextval('public.producer_id_seq'::regclass);


--
-- TOC entry 3390 (class 0 OID 16388)
-- Dependencies: 217
-- Data for Name: farm; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.farm VALUES (1, 'Venus Farm', 'Sao Paulo', 'SP', 10000, 5000, 2000, 1, '2025-06-06 15:49:19.688', '2025-06-06 19:45:51.449387');


--
-- TOC entry 3395 (class 0 OID 16439)
-- Dependencies: 222
-- Data for Name: harvest; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.harvest VALUES (1, 2025, 'Potato', 1, '2025-06-07 17:20:42.996', '2025-06-07 17:20:42.996');


--
-- TOC entry 3392 (class 0 OID 16400)
-- Dependencies: 219
-- Data for Name: producer; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.producer VALUES (1, '12345678900', 'Juninho Capixaba', '2025-06-06 12:17:22.289836', '2025-06-06 19:14:34.498613');


--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 218
-- Name: farm_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.farm_id_seq', 8, true);


--
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 221
-- Name: harvest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.harvest_id_seq', 3, true);


--
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 220
-- Name: producer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.producer_id_seq', 23, true);


--
-- TOC entry 3233 (class 2606 OID 16412)
-- Name: farm farm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farm
    ADD CONSTRAINT farm_pkey PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 16446)
-- Name: harvest harvest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.harvest
    ADD CONSTRAINT harvest_pkey PRIMARY KEY (year, farm);


--
-- TOC entry 3235 (class 2606 OID 16418)
-- Name: producer producer_cpfOrCnpj_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producer
    ADD CONSTRAINT "producer_cpfOrCnpj_key" UNIQUE ("cpfOrCnpj");


--
-- TOC entry 3237 (class 2606 OID 16420)
-- Name: producer producer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producer
    ADD CONSTRAINT producer_pkey PRIMARY KEY (id);


--
-- TOC entry 3242 (class 2620 OID 16421)
-- Name: farm atualizar_farm_updatedat_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER atualizar_farm_updatedat_trigger BEFORE UPDATE ON public.farm FOR EACH ROW EXECUTE FUNCTION public.atualizar_farm_updatedat();


--
-- TOC entry 3244 (class 2620 OID 16452)
-- Name: harvest atualizar_harvest_updatedat_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER atualizar_harvest_updatedat_trigger BEFORE UPDATE ON public.harvest FOR EACH ROW EXECUTE FUNCTION public.atualizar_harvest_updatedat();


--
-- TOC entry 3243 (class 2620 OID 16423)
-- Name: producer atualizar_updatedat_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER atualizar_updatedat_trigger BEFORE UPDATE ON public.producer FOR EACH ROW EXECUTE FUNCTION public.atualizar_updatedat();


--
-- TOC entry 3241 (class 2606 OID 16447)
-- Name: harvest fk_farm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.harvest
    ADD CONSTRAINT fk_farm FOREIGN KEY (farm) REFERENCES public.farm(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3240 (class 2606 OID 16429)
-- Name: farm fk_owner; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farm
    ADD CONSTRAINT fk_owner FOREIGN KEY (owner) REFERENCES public.producer(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2025-06-07 14:25:18 -03

--
-- PostgreSQL database dump complete
--

