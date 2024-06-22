FROM openjdk:17

WORKDIR /app
COPY TheDuckHospitalAPI/target/TheDuckHospitalAPI-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT [ "java", "-jar" , "app.jar" ]