package com.demobe.demobe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DemoBeApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoBeApplication.class, args);
    }
}
