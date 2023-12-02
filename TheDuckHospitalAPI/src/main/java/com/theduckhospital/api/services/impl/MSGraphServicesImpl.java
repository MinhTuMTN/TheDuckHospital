package com.theduckhospital.api.services.impl;

import com.azure.identity.ClientSecretCredential;
import com.azure.identity.ClientSecretCredentialBuilder;
import com.microsoft.graph.authentication.TokenCredentialAuthProvider;
import com.microsoft.graph.models.AssignedLicense;
import com.microsoft.graph.models.PasswordProfile;
import com.microsoft.graph.models.User;
import com.microsoft.graph.models.UserAssignLicenseParameterSet;
import com.microsoft.graph.requests.GraphServiceClient;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.services.IMSGraphServices;
import okhttp3.Request;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;


@Service
public class MSGraphServicesImpl implements IMSGraphServices {
    private final Environment environment;

    public MSGraphServicesImpl(Environment environment) {
        this.environment = environment;
    }
    @Override
    public String createMSGraphUser(String fullName, String email) {
        try {
            final GraphServiceClient<Request> graphClient = createClient();

            User user = new User();
            user.displayName = fullName;
            user.mailNickname = email.split("@")[0];
            user.userPrincipalName = email;
            user.accountEnabled = true;

            PasswordProfile passwordProfile = new PasswordProfile();
            passwordProfile.forceChangePasswordNextSignIn = true;
            passwordProfile.password = "HCMUTE@2023";

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
