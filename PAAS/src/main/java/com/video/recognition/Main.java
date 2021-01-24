package com.video.recognition;

import com.openalpr.jni.LicenseReader;
import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvException;
import com.secretary.secretaryapp.SecretaryAppApplication;
import org.springframework.boot.SpringApplication;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws Exception {
    }
    public static Integer getAvailableSpot() throws IOException {
        List<List<String>> records = new ArrayList<>();
        try (Scanner scanner = new Scanner(new File("ParkingSpotsOccupation.csv"));) {
            while (scanner.hasNextLine()) {
                records.add(getRecordFromLine(scanner.nextLine()));
            }
        }

        for (List<String> record:records
        ) {
            if(record.get(1).trim().equals("false")){
                record.set(1, "true");
                return Integer.parseInt(record.get(0));
            }
        }
        return -1;
    }

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
}
