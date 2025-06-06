--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Ubuntu 17.5-1.pgdg24.04+1)

-- Started on 2025-06-06 12:32:14 -03

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
-- TOC entry 3398 (class 0 OID 0)
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
-- TOC entry 222 (class 1255 OID 16386)
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
-- TOC entry 220 (class 1259 OID 16508)
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
-- TOC entry 219 (class 1259 OID 16507)
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
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 219
-- Name: farm_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.farm_id_seq OWNED BY public.farm.id;


--
-- TOC entry 221 (class 1259 OID 16522)
-- Name: harvest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.harvest (
    year integer NOT NULL,
    culture character varying(50) NOT NULL,
    farm integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.harvest OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16469)
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
-- TOC entry 217 (class 1259 OID 16468)
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
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 217
-- Name: producer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.producer_id_seq OWNED BY public.producer.id;


--
-- TOC entry 3225 (class 2604 OID 16511)
-- Name: farm id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farm ALTER COLUMN id SET DEFAULT nextval('public.farm_id_seq'::regclass);


--
-- TOC entry 3222 (class 2604 OID 16472)
-- Name: producer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producer ALTER COLUMN id SET DEFAULT nextval('public.producer_id_seq'::regclass);


--
-- TOC entry 3391 (class 0 OID 16508)
-- Dependencies: 220
-- Data for Name: farm; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.farm VALUES (1, 'Fazenda Boa Terra', 'Ribeirão', 'SP', 100, 80, 20, 1, '2025-06-06 12:24:16.663288', '2025-06-06 12:24:16.663288');


--
-- TOC entry 3392 (class 0 OID 16522)
-- Dependencies: 221
-- Data for Name: harvest; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.harvest VALUES (2025, 'Milho', 1, '2025-06-06 12:25:55.804575', '2025-06-06 12:25:55.804575');


--
-- TOC entry 3389 (class 0 OID 16469)
-- Dependencies: 218
-- Data for Name: producer; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.producer VALUES (1, '12345678900', 'Elias da Pimentea', '2025-06-06 12:17:22.289836', '2025-06-06 12:17:52.669305');


--
-- TOC entry 3401 (class 0 OID 0)
-- Dependencies: 219
-- Name: farm_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.farm_id_seq', 1, true);


--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 217
-- Name: producer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.producer_id_seq', 1, true);


--
-- TOC entry 3235 (class 2606 OID 16515)
-- Name: farm farm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farm
    ADD CONSTRAINT farm_pkey PRIMARY KEY (id);


--
-- TOC entry 3237 (class 2606 OID 16528)
-- Name: harvest pk_harvest; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.harvest
    ADD CONSTRAINT pk_harvest PRIMARY KEY (year, culture);


--
-- TOC entry 3231 (class 2606 OID 16480)
-- Name: producer producer_cpfOrCnpj_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producer
    ADD CONSTRAINT "producer_cpfOrCnpj_key" UNIQUE ("cpfOrCnpj");


--
-- TOC entry 3233 (class 2606 OID 16478)
-- Name: producer producer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producer
    ADD CONSTRAINT producer_pkey PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2620 OID 16521)
-- Name: farm atualizar_farm_updatedat_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER atualizar_farm_updatedat_trigger BEFORE UPDATE ON public.farm FOR EACH ROW EXECUTE FUNCTION public.atualizar_farm_updatedat();


--
-- TOC entry 3242 (class 2620 OID 16534)
-- Name: harvest atualizar_harvest_updatedat_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER atualizar_harvest_updatedat_trigger BEFORE UPDATE ON public.harvest FOR EACH ROW EXECUTE FUNCTION public.atualizar_harvest_updatedat();


--
-- TOC entry 3240 (class 2620 OID 16481)
-- Name: producer atualizar_updatedat_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER atualizar_updatedat_trigger BEFORE UPDATE ON public.producer FOR EACH ROW EXECUTE FUNCTION public.atualizar_updatedat();


--
-- TOC entry 3239 (class 2606 OID 16529)
-- Name: harvest fk_farm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.harvest
    ADD CONSTRAINT fk_farm FOREIGN KEY (farm) REFERENCES public.farm(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3238 (class 2606 OID 16516)
-- Name: farm fk_owner; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farm
    ADD CONSTRAINT fk_owner FOREIGN KEY (owner) REFERENCES public.producer(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2025-06-06 12:32:20 -03

--
-- PostgreSQL database dump complete
--

