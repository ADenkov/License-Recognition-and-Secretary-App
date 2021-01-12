package com.video.recognition;

import com.openalpr.jni.LicenseReader;
import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvException;
import com.secretary.secretaryapp.SecretaryAppApplication;
import org.opencv.highgui.VideoCapture;
import org.springframework.boot.SpringApplication;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws Exception {
//System.out.println(getAvailableSpot());
    }
    public static Integer getAvailableSpot() throws IOException {
        List<List<String>> records = new ArrayList<>();
        try (Scanner scanner = new Scanner(new File("ParkingSpotsOccupation.csv"));) {
            while (scanner.hasNextLine()) {
                records.add(getRecordFromLine(scanner.nextLine()));
            }
        }

//        for(int i = 0; i< records.size();i++){
//            if(records.get(i).get(1).trim().equals("false")){
//
//            }
//        }

        for (List<String> record:records
        ) {
            if(record.get(1).trim().equals("false")){
                record.set(1, "true");
               // System.out.println(record.get(1));
               // record.get(1).replace("false", "true");
                //updateCSV(records);
                return Integer.parseInt(record.get(0));
            }
        }
        return -1;
    }

//    private static void updateCSV(List<List<String>> records) throws IOException {
//        File inputFile = new File("ParkingSpotsOccupation.csv");
//
//        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(inputFile));
//        bufferedWriter.write("");
//        for (List<String> record:records
//        ) {
//            bufferedWriter.append(record.get(0)).append(",").append(record.get(1)).append(",");
//            bufferedWriter.newLine();
//        }
//        bufferedWriter.close();
//    }

    private static List<String> getRecordFromLine(String line) {
        List<String> values = new ArrayList<String>();
        try (Scanner rowScanner = new Scanner(line)) {
            rowScanner.useDelimiter(",");
            while (rowScanner.hasNext()) {
                values.add(rowScanner.next());
            }
        }
        return values;
    }
    private static void updateCSV(String replace,
                                 int row, int col) throws IOException, CsvException {

      }

}
