package com.video.recognition;

import com.openalpr.jni.LicenseReader;
import com.secretary.secretaryapp.SecretaryAppApplication;
import org.opencv.highgui.VideoCapture;
import org.springframework.boot.SpringApplication;

public class Main {
    public static void main(String[] args) throws Exception {
//        VideoStream videoStream = new VideoStream();
//        //System.out.println(videoStream.init("eu_clip.mp4"));
//        VideoCapture vc = new VideoCapture("eu_clip");
//        System.out.println(vc.isOpened());
        String[] clip = new String[1];
        clip[0] = "D:\\git-repos\\S3-CB03-Group3\\PAAS\\src\\main\\java\\com\\video\\recognition\\eu-clip.mp4";
        Main_ffmpeg.main(clip);

    }
}
