package projects.java.onlinewallet.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
public class ImageService {

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Value("${aws.s3.region}")
    private String region;

    @Value("${aws.s3.access-key}")
    private String accessKey;

    @Value("${aws.s3.secret-key}")
    private String secretKey;

    public String upload(MultipartFile image) {
        // creating filename
        String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();

        // try to reg S3Client then putObject and return path
        try (S3Client s3Client = buildS3Client()){

            s3Client.putObject(PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(filename)
                            .contentType(image.getContentType())
                            .build(),
                    software.amazon.awssdk.core.sync.RequestBody.fromInputStream(image.getInputStream(), image.getSize()));

            return "https://"+bucketName+".s3."+region+"amazonaws.com/"+filename;

        } catch (IOException e){
            throw new RuntimeException("Ошибка при загрузке изображения", e);
        }
    }

    public void delete(String imageUrl) {
        String filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        try (S3Client s3Client = buildS3Client()) {
            s3Client.deleteObject(DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(filename)
                    .build());
        } catch (Exception e) {
            throw new RuntimeException("Ошибка при удалении изображения", e);
        }
    }

    private S3Client buildS3Client() {
        return S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(accessKey, secretKey)
                ))
                .build();
    }

}
