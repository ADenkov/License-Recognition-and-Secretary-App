package com.openalpr.jni;

import com.openalpr.jni.*;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;

public class LicenseReader {

    public static String licenseReader(String licensePlate) {



        String country = "eu", configfile = "openalpr.conf", runtimeDataDir = "runtime_data";

        if (licensePlate.equals("")) {
            licensePlate = "testpic.jpg";
        }

        Alpr alpr = new Alpr(country, configfile, runtimeDataDir);

        alpr.setTopN(1);
        alpr.setDefaultRegion("EU");

        AlprResults results = null;

        // Read an image into a byte array and send it to OpenALPR
        Path path = Paths.get(licensePlate);
        byte[] imagedata = new byte[0];
        try {
            imagedata = Files.readAllBytes(path);

            results = alpr.recognize(imagedata);

        }
        catch (AlprException e) {
            e.printStackTrace();
        }
        catch (IOException e) {
            e.printStackTrace();
        }


        System.out.println("OpenALPR Version: " + alpr.getVersion());
        System.out.println("Image Size: " + results.getImgWidth() + "x" + results.getImgHeight());
        System.out.println("Processing Time: " + results.getTotalProcessingTimeMs() + " ms");
        System.out.println("Found " + results.getPlates().size() + " results");

        System.out.format("  %-15s%-8s\n", "Plate Number", "Confidence");
//        for (AlprPlateResult result : results.getPlates())
//        {
//            for (AlprPlate plate : result.getTopNPlates()) {
        AlprPlate plate = results.getPlates().get(0).getTopNPlates().get(0);
                if (plate.isMatchesTemplate())
                    System.out.print("  * ");
                else
                    System.out.print("  - ");

//                System.out.format("%-15s%-8f\n", plate.getCharacters(), plate.getOverallConfidence());
//            }
//        }


        // Make sure to call this to release memory
        String info = plate.getCharacters();
        alpr.unload();
        return info;
    }
}
