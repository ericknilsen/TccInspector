## Aplicação SPA com Docker

A aplicação foi construída conforme arquitetura da figura abaixo:

![](https://github.com/ericknilsen/HandsOn/blob/master/docker/ambiente/doc/docker_v1.jpeg)

### Configurações 

1) Instale o [Docker](https://docs.docker.com/install)

2) [Baixe o repositório](https://github.com/ericknilsen/HandsOn/tree/master/docker/ambiente) com os arquivos de configuração do Docker

3) Execute o [manual para a criação do ambiente de desenvolvimento](https://github.com/ericknilsen/aulas/wiki/Manual-Ambiente)
 - JDK, JBoss, Eclipse, PgAdmin3
 - Gere o WAR utilizando o JBoss, pelo Eclipse ou linha de comando 

4) Configure os containers

- Navegue para dentro do diretório _ambiente_
- Dentro do arquivo _docker-compose.yml_, atualize o caminho do WildFly: 
**/home/erick/Tools/wildfly-10.1.0.Final**/standalone/deployments:
/opt/jboss/wildfly/standalone/deployments/
- Inicialize os containers:
```shell
$ sudo docker-compose up
```
- Configure o datasource
```shell
$ wget https://jdbc.postgresql.org/download/postgresql-9.1-903.jdbc4.jar
$ mv postgresql-9.1-903.jdbc4.jar /home/erick/Tools/wildfly-10.1.0.Final/standalone/deployments/postgresql.jar
$ sudo docker-compose exec app /opt/jboss/wildfly/bin/jboss-cli.sh --file=dbscript.cli
```

5) Acesse o endereço [http://localhost/empregado.html](http://localhost/empregado.html)


**Opcional**

6) Use o PgAdmin para se conectar ao banco de dados do container
- Descubra o ip do container que hospeda o banco de dados:
```
$ sudo docker network ls
# Exemplo de saída
b946fa167bbd        ambiente_backend             bridge              local
cedbcab910a5        ambiente_banco               bridge              local

$ sudo docker network inspect ambiente_banco

# Selecione o endereço IPV4
...
 "IPv4Address": "172.20.0.2/16",
...
```
7) Utilize o endereço IP de saída como valor do host nos dados da conexão
