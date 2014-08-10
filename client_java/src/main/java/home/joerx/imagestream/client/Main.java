package home.joerx.imagestream.client;

import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.InputStreamEntity;
import org.apache.http.impl.client.HttpClients;

import java.io.File;
import java.io.FileInputStream;

public class Main {

    public static void main(String[] args) throws Exception {

        File f = new File("./sample.png");
        System.out.println(f.getAbsolutePath());
        System.out.println(f.length());

        HttpClient client = HttpClients.createDefault();
        HttpPost post = new HttpPost("http://localhost:3000/buffered");

        InputStreamEntity entity = new InputStreamEntity(new FileInputStream(f.getAbsolutePath()), f.length());
        entity.setContentType("image/png");
        entity.setChunked(true);
        post.setEntity(entity);

        client.execute(post);
    }
}
