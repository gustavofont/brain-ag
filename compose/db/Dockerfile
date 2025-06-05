FROM postgres:17

# Define variáveis de ambiente
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=brain_ag

# Copia o script de inicialização para o diretório especial do PostgreSQL
COPY init.sql /docker-entrypoint-initdb.d/