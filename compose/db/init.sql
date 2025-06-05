--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Ubuntu 17.5-1.pgdg24.04+1)

-- Started on 2025-06-04 18:02:43 -03

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
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 222 (class 1255 OID 16465)
-- Name: atualizar_farm_updatedat(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.atualizar_farm_updatedat() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updatedAt := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.atualizar_farm_updatedat() OWNER TO postgres;

--
-- TOC entry 223 (class 1255 OID 16479)
-- Name: atualizar_harvest_updatedat(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.atualizar_harvest_updatedat() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updatedAt := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.atualizar_harvest_updatedat() OWNER TO postgres;

--
-- TOC entry 221 (class 1255 OID 16449)
-- Name: atualizar_updatedat(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.atualizar_updatedat() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updatedAt := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.atualizar_updatedat() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16452)
-- Name: farm; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.farm (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    city character varying(100) NOT NULL,
    state character varying(100) NOT NULL,
    fieldsize integer NOT NULL,
    cultivablefield integer NOT NULL,
    vegetablefield integer NOT NULL,
    owner character varying(20) NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.farm OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16451)
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
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 218
-- Name: farm_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.farm_id_seq OWNED BY public.farm.id;


--
-- TOC entry 220 (class 1259 OID 16467)
-- Name: harvest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.harvest (
    year integer NOT NULL,
    culture character varying(50) NOT NULL,
    farm integer NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.harvest OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16440)
-- Name: producer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.producer (
    cpforcnpj character varying(20) NOT NULL,
    name text NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.producer OWNER TO postgres;

--
-- TOC entry 3223 (class 2604 OID 16455)
-- Name: farm id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farm ALTER COLUMN id SET DEFAULT nextval('public.farm_id_seq'::regclass);


--
-- TOC entry 3386 (class 0 OID 16452)
-- Dependencies: 219
-- Data for Name: farm; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.farm VALUES (4, 'Fazenda Boa Terra', 'Ribeirão', 'SP', 100, 80, 20, '12345678900', '2025-06-04 16:24:24.000013', '2025-06-04 16:24:24.000013');
INSERT INTO public.farm VALUES (14, 'Gust Farm', 'Belem', 'Pa', 120, 80, 20, '11111111111', '2025-06-04 16:42:41.844596', '2025-06-04 16:44:02.695258');


--
-- TOC entry 3387 (class 0 OID 16467)
-- Dependencies: 220
-- Data for Name: harvest; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.harvest VALUES (2025, 'Tomate', 14, '2025-06-04 16:47:15.286198', '2025-06-04 16:48:52.472663');


--
-- TOC entry 3384 (class 0 OID 16440)
-- Dependencies: 217
-- Data for Name: producer; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.producer VALUES ('12345678900', 'João Produtor', '2025-06-04 16:24:05.318402', '2025-06-04 16:24:05.318402');
INSERT INTO public.producer VALUES ('11111111111', 'Gustavo Machado', '2025-06-04 16:39:47.230632', '2025-06-04 16:39:47.230632');


--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 218
-- Name: farm_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.farm_id_seq', 14, true);


--
-- TOC entry 3231 (class 2606 OID 16459)
-- Name: farm farm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farm
    ADD CONSTRAINT farm_pkey PRIMARY KEY (id);


--
-- TOC entry 3233 (class 2606 OID 16473)
-- Name: harvest pk_harvest; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.harvest
    ADD CONSTRAINT pk_harvest PRIMARY KEY (year, culture);


--
-- TOC entry 3229 (class 2606 OID 16448)
-- Name: producer producer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producer
    ADD CONSTRAINT producer_pkey PRIMARY KEY (cpforcnpj);


--
-- TOC entry 3237 (class 2620 OID 16466)
-- Name: farm atualizar_farm_updatedat_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER atualizar_farm_updatedat_trigger BEFORE UPDATE ON public.farm FOR EACH ROW EXECUTE FUNCTION public.atualizar_farm_updatedat();


--
-- TOC entry 3238 (class 2620 OID 16480)
-- Name: harvest atualizar_harvest_updatedat_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER atualizar_harvest_updatedat_trigger BEFORE UPDATE ON public.harvest FOR EACH ROW EXECUTE FUNCTION public.atualizar_harvest_updatedat();


--
-- TOC entry 3236 (class 2620 OID 16450)
-- Name: producer atualizar_updatedat_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER atualizar_updatedat_trigger BEFORE UPDATE ON public.producer FOR EACH ROW EXECUTE FUNCTION public.atualizar_updatedat();


--
-- TOC entry 3235 (class 2606 OID 16474)
-- Name: harvest fk_farm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.harvest
    ADD CONSTRAINT fk_farm FOREIGN KEY (farm) REFERENCES public.farm(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3234 (class 2606 OID 16460)
-- Name: farm fk_owner; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farm
    ADD CONSTRAINT fk_owner FOREIGN KEY (owner) REFERENCES public.producer(cpforcnpj) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2025-06-04 18:02:43 -03

--
-- PostgreSQL database dump complete
--

