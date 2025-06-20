1. Prerequisites
JDK 11+ and Maven 3.6+ installed

Node.js 14+ and npm 6+ (for React build)

WebLogic Server running (e.g. Admin on t3://localhost:7001)

MySQL (or other JDBC DB) up and reachable

(Optional) Docker if you prefer running DB in a container

2. Database Setup (MySQL example)
docker run --name petclinic-db \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=petclinic \
  -e MYSQL_USER=pcuser \
  -e MYSQL_PASSWORD=pcpass \
  -p 3306:3306 \
  -d mysql:8.0

Then in src/main/resources/application.properties:

properties

spring.datasource.url=jdbc:mysql://localhost:3306/petclinic?useSSL=false&serverTimezone=UTC
spring.datasource.username=pcuser
spring.datasource.password=pcpass
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

3. Build React Frontend

cd frontend
npm install
npm run build
→ outputs frontend/build/

4. Integrate React into Spring Boot

cd ../   # back to project root
rm -rf src/main/resources/static/*
cp -r frontend/build/* src/main/resources/static/
Now Spring Boot will serve index.html and its JS/CSS from static/.

5. Package Backend into WAR

mvn clean package
→ produces target/spring-petclinic-*.war

6. Deploy to WebLogic

cd target
java weblogic.Deployer \
  -adminurl t3://localhost:7001 \
  -username YOUR_ADMIN \
  -password YOUR_PASS \
  -name VetClinic \
  -redeploy \
  -retiretimeout 0 \
  -source petclinic-SNAPSHOT.war \
  -targets AppCluster
-name VetClinic → application name in WebLogic

-redeploy → update existing deployment

-targets AppCluster → cluster or managed server
