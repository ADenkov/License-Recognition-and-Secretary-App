package com.secretary.secretaryapp.controller;

import com.openalpr.jni.LicenseReader;
import com.secretary.secretaryapp.SWSException;
import com.secretary.secretaryapp.email.EmailService;
import com.secretary.secretaryapp.message.ResponseMessage;
import com.secretary.secretaryapp.model.Client;
import com.secretary.secretaryapp.model.FileInfo;
import com.secretary.secretaryapp.repository.ClientRepository;
import com.secretary.secretaryapp.service.FilesStorageService;
import com.sun.mail.iap.Argument;
import com.video.recognition.Main;
import com.video.recognition.Main_ffmpeg;
import org.bytedeco.javacpp.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.bytedeco.javacpp.avcodec.*;
import static org.bytedeco.javacpp.avformat.*;
import static org.bytedeco.javacpp.avutil.*;
import static org.bytedeco.javacpp.swscale.*;

@RestController
@CrossOrigin
public class FileController {
        @Autowired
        FilesStorageService storageService;

        @Autowired
        ClientRepository clientRepository;

    @Autowired
    private EmailService emailService;

        @PostMapping("/upload")
        public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
            List<String> plates= new ArrayList<>();
            try {
                storageService.save(file);
                    System.out.println("Initializing...");

                    int ret = -1, i = 0, v_stream_idx = -1;
                    String vf_path = "uploads/" + file.getOriginalFilename(); //Path to the uploaded file

                    avformat.AVFormatContext fmt_ctx = new avformat.AVFormatContext(null);
                    avcodec.AVPacket pkt = new avcodec.AVPacket();

                    ret = avformat_open_input(fmt_ctx, vf_path, null, null);
                    if (ret < 0) {
                        //System.out.printf("Open video file %s failed \n", vf_path);
                        throw new IllegalStateException(); //When file cannot be opened
                    }

                    if (avformat_find_stream_info(fmt_ctx, (PointerPointer)null) < 0) {//Function needed for sws to work
                        throw new SWSException();
                    }

                    av_dump_format(fmt_ctx, 0, vf_path, 0);

                    for (i = 0; i < fmt_ctx.nb_streams(); i++) {
                        if (fmt_ctx.streams(i).codecpar().codec_type() == AVMEDIA_TYPE_VIDEO) {
                            v_stream_idx = i;
                            break;
                        }
                    }
                    if (v_stream_idx == -1) {
                        //System.out.println("Cannot find video stream");
                        throw new IllegalStateException();
                    } else {
                        System.out.printf("Video stream %d with resolution %dx%d\n", v_stream_idx,
                                fmt_ctx.streams(i).codecpar().width(),
                                fmt_ctx.streams(i).codecpar().height());
                    }

                    avcodec.AVCodecContext codec_ctx = avcodec_alloc_context3(null);
                    avcodec_parameters_to_context(codec_ctx, fmt_ctx.streams(v_stream_idx).codecpar());

                    avcodec.AVCodec codec = avcodec_find_decoder(codec_ctx.codec_id());
                    if (codec == null) {
                       // System.out.println("Unsupported codec for video file");
                        throw new IllegalStateException();
                    }
                    ret = avcodec_open2(codec_ctx, codec, (PointerPointer)null);
                    if (ret < 0) {
                        System.out.println("Can not open codec");
                        throw new IllegalStateException();
                    }

                    avutil.AVFrame frm = av_frame_alloc();

                    // Allocate an AVFrame structure
                    avutil.AVFrame pFrameRGB = av_frame_alloc();
                    if (pFrameRGB == null) {
                        System.exit(-1);
                    }

                    // Determine required buffer size and allocate buffer
                    int numBytes = av_image_get_buffer_size(AV_PIX_FMT_RGB24, codec_ctx.width(),
                            codec_ctx.height(), 1);
                    BytePointer buffer = new BytePointer(av_malloc(numBytes));

                    swscale.SwsContext sws_ctx = sws_getContext(
                            codec_ctx.width(),
                            codec_ctx.height(),
                            codec_ctx.pix_fmt(),
                            codec_ctx.width(),
                            codec_ctx.height(),
                            AV_PIX_FMT_RGB24,
                            SWS_BILINEAR,
                            null,
                            null,
                            (DoublePointer)null
                    );

                    if (sws_ctx == null) {
                        //System.out.println("Can not use sws");
                        throw new IllegalStateException();
                    }

                    av_image_fill_arrays(pFrameRGB.data(), pFrameRGB.linesize(),
                            buffer, AV_PIX_FMT_RGB24, codec_ctx.width(), codec_ctx.height(), 0);

                    i = 0;
                    int j = 0;
                    int ret1 = -1, ret2 = -1, fi = -1;
                    while (av_read_frame(fmt_ctx, pkt) >= 0) {
                        if (pkt.stream_index() == v_stream_idx) {
                            ret1 = avcodec_send_packet(codec_ctx, pkt);
                            ret2 = avcodec_receive_frame(codec_ctx, frm);
                            System.out.printf("ret1 %d ret2 %d\n", ret1, ret2);
                        }

                        if (ret2 >= 0 && ++i <= 100) {


                            av_image_fill_arrays(pFrameRGB.data(), pFrameRGB.linesize(),
                                    buffer, AV_PIX_FMT_RGB24, codec_ctx.width(), codec_ctx.height(), j+=1);
                            sws_scale(
                                    sws_ctx,
                                    frm.data(),
                                    frm.linesize(),
                                    0,
                                    codec_ctx.height(),
                                    pFrameRGB.data(),
                                    pFrameRGB.linesize()
                            );

                            Main_ffmpeg.save_frame(pFrameRGB, codec_ctx.width(), codec_ctx.height(), i);

                            System.out.printf("frame%d_.ppm%n", j);

                            try {
                                String s= LicenseReader.licenseReader(String.format("frame%d_.ppm", j));
                                File f= new File(String.format("frame%d_.ppm", j));
                                f.delete();
                                try {
                                    Client client = clientRepository.findByLicensePlate(s);
                                    if (client != null && !plates.contains(s))
                                    {
                                        System.out.println(client.toString());
                                        try{
                                            int spot = Main.getAvailableSpot();
                                            if (spot != -1){
                                                emailService.sendMail(client.getEmail(), "Parking Spot", "Your Parking spot is number: " + spot);
                                            }else{
                                                emailService.sendMail(client.getEmail(), "Parking Spot", "Currently there are no available parking spots.");
                                            }
                                        }catch(MailSendException ss){

                                            System.out.println(Arrays.toString(ss.getMessageExceptions()));
                                            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseMessage("Error sending email to client, please try again!"));
                                        }finally {
                                            plates.add(s);
                                        }
                                    }
                                }
                                catch (Exception e) {
                                    return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
                                }
                            }catch (IndexOutOfBoundsException e){
                                File f= new File(String.format("frame%d_.ppm", j));
                                f.delete();
                                System.out.println("No License Plate.");
                            }
                        }
                        av_packet_unref(pkt);
                        if (i >= 100) {
                            break;
                        }
                    }
                    av_frame_free(frm);

                    avcodec_close(codec_ctx);
                    avcodec_free_context(codec_ctx);

                    avformat_close_input(fmt_ctx);

                    System.out.println("Execution Successful.");

                }
            catch (IOException ioException) {
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage("Error occurred, please try again!"));
            }
            catch (IllegalStateException illegalStateException){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseMessage("Error occurred, while trying to read the video file."));

            } catch (SWSException swsException) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseMessage("Function failed, try again!"));
            }
            storageService.delete(file);
            StringBuilder platesRecognized = new StringBuilder();
            for (String plate:plates
                 ) {
                platesRecognized.append(plate).append(" ");
            }
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("Video Processed and the following license plates were recognized: " + platesRecognized));
        }

        @GetMapping("/files")
        public ResponseEntity<List<FileInfo>> getListFiles() {
            List<FileInfo> fileInfos = storageService.loadAll().map(path -> {
                String filename = path.getFileName().toString();
                String url = MvcUriComponentsBuilder
                        .fromMethodName(FileController.class, "getFile", path.getFileName().toString()).build().toString();

                return new FileInfo(filename, url);
            }).collect(Collectors.toList());

            return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
        }

        @GetMapping("/files/{filename:.+}")
        @ResponseBody
        public ResponseEntity<Resource> getFile(@PathVariable String filename) {
            Resource file = storageService.load(filename);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
        }
    }

