package com.secretary.secretaryapp;

public class SWSException extends Exception{
    @Override
    public String getMessage() {
        return "Function: avformat_find_stream_info failed.";
    }
}
