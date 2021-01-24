package com.video.recognition;

import org.opencv.core.Core;
import org.opencv.osgi.OpenCVNativeLoader;
import org.opencv.videoio.VideoCapture;

public class VideoStream {
    static{
        String osName = System.getProperty("os.name");
        String opencvpath = System.getProperty("user.dir");
        if(osName.startsWith("Windows")) {
            int bitness = Integer.parseInt(System.getProperty("sun.arch.data.model"));
            if(bitness == 32) {
                opencvpath=opencvpath+"\\opencv\\x86\\";
            }
            else if (bitness == 64) {
                opencvpath=opencvpath+"\\opencv\\x64\\";
            } else {
                opencvpath=opencvpath+"\\opencv\\x86\\";
            }
        }
        else if(osName.equals("Mac OS X")){
            opencvpath = opencvpath+"Your path to .dylib";
        }
        System.out.println(opencvpath);
        System.load(opencvpath + Core.NATIVE_LIBRARY_NAME + ".dll");
        System.load(opencvpath + "opencv_ffmpeg300_64" + ".dll");
    }

    public static void main(String[] args){
        VideoCapture capture = new VideoCapture();
        capture.open("http://192.168.11.3:8081/video");
    }
}