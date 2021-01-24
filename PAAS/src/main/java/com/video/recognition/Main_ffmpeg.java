package com.video.recognition;

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


import com.openalpr.jni.LicenseReader;

import com.secretary.secretaryapp.email.EmailService;
import com.secretary.secretaryapp.model.Client;
import org.apache.commons.lang3.ArrayUtils;
import org.assertj.core.util.Arrays;
import org.bytedeco.javacpp.*;
import org.springframework.beans.factory.annotation.Autowired;

import static org.bytedeco.javacpp.avcodec.*;
import static org.bytedeco.javacpp.avformat.*;
import static org.bytedeco.javacpp.avutil.*;
import static org.bytedeco.javacpp.swscale.*;

public class Main_ffmpeg {
    public static void save_frame(avutil.AVFrame pFrame, int width, int height, int f_idx) throws IOException {
        String fileName = "frm.ppm";
        try (OutputStream pFile = new FileOutputStream(fileName)) {
            pFile.write(String.format("P6\n%d %d\n255\n", width, height).getBytes());
            // Write pixel data
            BytePointer data = pFrame.data(0);
            byte[] bytes = new byte[width * 3];
            int l = pFrame.linesize(0);
            for (int y = 0; y < height; y++) {
                data.position(y * l).get(bytes);
                pFile.write(bytes);
            }
        }
    }
}
