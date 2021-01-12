package com.openalpr.jni;

import com.openalpr.jni.json.JSONException;
import org.opencv.core.Core;

public class Alpr {
    static{
        String osName = System.getProperty("os.name");
        String opencvpath = System.getProperty("user.dir");
        if(osName.startsWith("Windows")) {
//            int bitness = Integer.parseInt(System.getProperty("sun.arch.data.model"));
//            if(bitness == 32) {
//                opencvpath=opencvpath+"\\openalpr_dependencies\\";
//            }
//            else if (bitness == 64) {
//                opencvpath=opencvpath+"\\openalpr_dependencies\\";
//            } else {
                opencvpath=opencvpath+"\\openalpr_dependencies\\";
//            }
        }
        else if(osName.equals("Mac OS X")){
            opencvpath = opencvpath+"Your path to .dylib";
        }
        System.out.println(opencvpath);
        //System.load(opencvpath + Core.NATIVE_LIBRARY_NAME + ".dll");
        System.load(opencvpath + "openalprjni" + ".dll");
        //nu.pattern.OpenCV.loadShared();
        //System.loadLibrary(org.opencv.core.Core.NATIVE_LIBRARY_NAME);
    }
//    static {
//        // Load the OpenALPR library at runtime
//        // openalprjni.dll (Windows) or libopenalprjni.so (Linux/Mac)
//        System.loadLibrary("openalprjni");
//    }

    private native void initialize(String country, String configFile, String runtimeDir);
    private native void dispose();

    private native boolean is_loaded();
    private native String native_recognize(String imageFile);
    private native String native_recognize(byte[] imageBytes);

    private native void set_default_region(String region);
    private native void detect_region(boolean detectRegion);
    private native void set_top_n(int topN);
    private native String get_version();



    public Alpr(String country, String configFile, String runtimeDir)
    {
        initialize(country, configFile, runtimeDir);
    }

    public void unload()
    {
        dispose();
    }

    public boolean isLoaded()
    {
        return is_loaded();
    }

    public AlprResults recognize(String imageFile) throws AlprException
    {
        try {
            String json = native_recognize(imageFile);
            return new AlprResults(json);
        } catch (JSONException e)
        {
            throw new AlprException("Unable to parse ALPR results");
        }
    }


    public AlprResults recognize(byte[] imageBytes) throws AlprException
    {
        try {
            String json = native_recognize(imageBytes);
            return new AlprResults(json);
        } catch (JSONException e)
        {
            throw new AlprException("Unable to parse ALPR results");
        }
    }


    public void setTopN(int topN)
    {
        set_top_n(topN);
    }

    public void setDefaultRegion(String region)
    {
        set_default_region(region);
    }

    public void setDetectRegion(boolean detectRegion)
    {
        detect_region(detectRegion);
    }

    public String getVersion()
    {
        return get_version();
    }
}
