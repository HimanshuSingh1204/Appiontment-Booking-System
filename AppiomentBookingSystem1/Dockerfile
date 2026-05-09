FROM openjdk:21-jdk-slim as builder

WORKDIR /app

# Copy backend
COPY AppiomentBookingSystem1 /app/backend

WORKDIR /app/backend

RUN apt-get update && apt-get install -y maven && \
    chmod +x ./mvnw && \
    ./mvnw clean package -DskipTests

# Final image
FROM openjdk:21-jdk-slim

WORKDIR /app

COPY --from=builder /app/backend/target/AppointmentBookingSystem-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
