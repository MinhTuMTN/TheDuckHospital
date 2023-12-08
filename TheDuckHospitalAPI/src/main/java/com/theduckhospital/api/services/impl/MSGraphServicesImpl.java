package com.theduckhospital.api.services.impl;

import com.azure.identity.ClientSecretCredential;
import com.azure.identity.ClientSecretCredentialBuilder;
import com.microsoft.graph.authentication.TokenCredentialAuthProvider;
import com.microsoft.graph.models.*;
import com.microsoft.graph.requests.GraphServiceClient;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.services.IMSGraphServices;
import okhttp3.Request;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;


@Service
public class MSGraphServicesImpl implements IMSGraphServices {
    private final Environment environment;
    private final JavaMailSender emailSender;

    public MSGraphServicesImpl(Environment environment, JavaMailSender emailSender) {
        this.environment = environment;
        this.emailSender = emailSender;
    }
    @Override
    public String createMSGraphUser(String fullName, String email, String password) {
        try {
            final GraphServiceClient<Request> graphClient = createClient();

            User user = new User();
            user.displayName = fullName;
            user.mailNickname = email.split("@")[0];
            user.userPrincipalName = email;
            user.accountEnabled = true;

            PasswordProfile passwordProfile = new PasswordProfile();
            passwordProfile.forceChangePasswordNextSignIn = true;
            passwordProfile.password = password;

            user.passwordProfile = passwordProfile;
            user.usageLocation = "VN";

            User result = graphClient.users()
                    .buildRequest()
                    .post(user);

            if (result.id == null) {
                throw new BadRequestException("An error occurred while creating user");
            }

            String userId = result.id;


            LinkedList<AssignedLicense> addLicensesList = new LinkedList<AssignedLicense>();

            AssignedLicense addLicenses = new AssignedLicense();
            addLicenses.disabledPlans = new LinkedList<UUID>();
            addLicenses.skuId = UUID.fromString("c42b9cae-ea4f-4ab7-9717-81576235ccac");
            addLicensesList.add(addLicenses);

            LinkedList<UUID> removeLicensesList = new LinkedList<UUID>();

            Objects.requireNonNull(graphClient.users()
                            .byId(userId))
                    .assignLicense(UserAssignLicenseParameterSet
                            .newBuilder()
                            .withAddLicenses(addLicensesList)
                            .withRemoveLicenses(removeLicensesList)
                            .build())
                    .buildRequest()
                    .post();
            return userId;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean sendEmail(String recipient, String subject, String content) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("nguyenminhtu00030@gmail.com");
            message.setTo(recipient);
            message.setSubject(subject);
            message.setText(content);
            emailSender.send(message);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

//    @Override
//    public boolean sendEmail(String recipient, String subject, String content) {
//        try {
//            final GraphServiceClient<Request> graphClient = createClient();
//
//            Message message = new Message();
//
//            // Subject of the email
//            message.subject = subject;
//
//            // Body of the email
//            ItemBody body = new ItemBody();
//            body.contentType = BodyType.TEXT;
//            body.content = content;
//            message.body = body;
//
//            // Recipient of the email
//            LinkedList<Recipient> recipientsList = new LinkedList<Recipient>();
//            Recipient recipientObj = new Recipient();
//            EmailAddress emailAddress = new EmailAddress();
//            emailAddress.address = recipient;
//            recipientObj.emailAddress = emailAddress;
//            recipientsList.add(recipientObj);
//            message.toRecipients = recipientsList;
//
//            Objects.requireNonNull(graphClient
//                            .users()
//                            .byId(Objects.requireNonNull(
//                                    environment.getProperty("ms.graph.admin-id")
//                            )))
//                    .sendMail(UserSendMailParameterSet
//                            .newBuilder()
//                            .withMessage(message)
//                            .build())
//                    .buildRequest()
//                    .post();
//
//            return true;
//        } catch (Exception e) {
//            throw new BadRequestException("An error occurred while sending email");
//        }
//    }

    private GraphServiceClient<Request> createClient() throws Exception {
        final String clientId = environment.getProperty("ms.graph.client-id");
        final String tenantId = environment.getProperty("ms.graph.tenant-id");
        final String clientSecret = environment.getProperty("ms.graph.secret");

        final List<String> scopes = List.of("https://graph.microsoft.com/.default");

        final ClientSecretCredential credential = new ClientSecretCredentialBuilder()
                .clientId(clientId).tenantId(tenantId).clientSecret(clientSecret).build();

        if (null == credential) {
            throw new Exception("An error occurred while creating meeting");
        }
        final TokenCredentialAuthProvider authProvider = new TokenCredentialAuthProvider(
                scopes, credential);

        return GraphServiceClient
                .builder()
                .authenticationProvider(authProvider)
                .buildClient();
    }

}
