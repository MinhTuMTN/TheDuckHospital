package com.theduckhospital.api.config;

import org.apache.catalina.connector.Connector;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HttpConfig {
    @Value("${server.http.port}")
    private int httpPort;

    @Bean // (it only works for springboot 2.x)
    public ServletWebServerFactory servletContainer(){
        TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
        factory.addAdditionalTomcatConnectors(createStanderConnector());
        return factory;
    }

    private Connector createStanderConnector(){
        Connector connector =
                //new Connector("org.apache.coyote.http11.Http11NioProtocol");
                new Connector(TomcatServletWebServerFactory.DEFAULT_PROTOCOL);
        connector.setPort(httpPort);
        return connector;
    }
}
