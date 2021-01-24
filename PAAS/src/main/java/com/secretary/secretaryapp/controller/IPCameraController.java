package com.secretary.secretaryapp.controller;

import com.openalpr.jni.LicenseReader;
import com.secretary.secretaryapp.SWSException;
import com.secretary.secretaryapp.email.EmailService;
import com.secretary.secretaryapp.model.Client;
import com.secretary.secretaryapp.model.IPAddress;
import com.secretary.secretaryapp.repository.ClientRepository;
import com.secretary.secretaryapp.repository.IPAddressRepository;
import com.secretary.secretaryapp.service.ClientService;
import com.video.recognition.Main;
import com.video.recognition.Main_ffmpeg;
import org.bytedeco.javacpp.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

import static org.bytedeco.javacpp.avcodec.*;
import static org.bytedeco.javacpp.avformat.*;
import static org.bytedeco.javacpp.avutil.*;
import static org.bytedeco.javacpp.swscale.*;

@RestController
@CrossOrigin
public class IPCameraController {
    @Autowired
    ClientRepository clientRepository;

    @Autowired
    ClientService clientService;

    @Autowired
    private IPAddressRepository ipAddressRepository;

    @Autowired
    private EmailService emailService;

    static final Logger logger = Logger.getLogger("com.secretary.secretaryapp.IPCameraLog");

    @GetMapping("getAllIPAddresses")
    public ResponseEntity<List<IPAddress>> getAllAddresses() {
        List<IPAddress> addresses = ipAddressRepository.findAll();
        if (addresses.isEmpty()) return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(addresses, HttpStatus.OK);
    }

    @PostMapping("setIPAddress")
    public ResponseEntity<IPAddress> setIPAddress(@RequestBody IPAddress ipAddress) {
        ipAddress.setEntered(LocalDate.now());
        ipAddressRepository.save(ipAddress);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/start")
    public void startRecognitionEngine(@RequestBody IPAddress ipAddress) {
        List<String> plates = new ArrayList<>();

        try(avcodec.AVPacket pkt = new avcodec.AVPacket()) {


            logger.log(Level.FINE, "Initializing the software");

                int ret = -1, i = 0, v_stream_idx = -1;

                String vf_path = ipAddress.getIp(); //Path to the uploaded file

                avformat.AVFormatContext fmt_ctx = new avformat.AVFormatContext(null);


                ret = avformat_open_input(fmt_ctx, vf_path, null, null);
                if (ret < 0) {
                    logger.log(Level.SEVERE, "Fatal Error");
                    throw new IllegalStateException(); //When file cannot be opened
                }

                if (avformat_find_stream_info(fmt_ctx, (PointerPointer) null) < 0) {//Function needed for sws to work
                    logger.log(Level.SEVERE, "Fatal Error");
                    throw new SWSException();
                }

                av_dump_format(fmt_ctx, 0, vf_path, 0);
                vf_path = null;

                for (i = 0; i < fmt_ctx.nb_streams(); i++) {
                    if (fmt_ctx.streams(i).codecpar().codec_type() == AVMEDIA_TYPE_VIDEO) {
                        v_stream_idx = i;
                        break;
                    }
                }
                if (v_stream_idx == -1) {
                    logger.log(Level.SEVERE, "Fatal Error: Video Stream could not be found");
                    throw new IllegalStateException();
                } else {
                    logger.log(Level.FINE, "Video stream with resolution: " + fmt_ctx.streams(i).codecpar().width() + "x" + fmt_ctx.streams(i).codecpar().height());
                    avcodec.AVCodecContext codec_ctx = avcodec_alloc_context3(null);
                    avcodec_parameters_to_context(codec_ctx, fmt_ctx.streams(v_stream_idx).codecpar());
                    avcodec.AVCodec codec = avcodec_find_decoder(codec_ctx.codec_id());

                    if (codec == null) {
                        logger.log(Level.SEVERE, "Fatal Error: Video Codec could not be found");
                        throw new IllegalStateException();
                    }

                    ret = avcodec_open2(codec_ctx, codec, (PointerPointer) null);

                    if (ret < 0) {
                        logger.log(Level.SEVERE, "Fatal Error: Video Codec could not be opened");
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
                            (DoublePointer) null
                    );

                    if (sws_ctx == null) {
                        throw new IllegalStateException();
                    }

                    av_image_fill_arrays(pFrameRGB.data(), pFrameRGB.linesize(),
                            buffer, AV_PIX_FMT_RGB24, codec_ctx.width(), codec_ctx.height(), 0);

                    i = 0;
                    int j = 0;
                    int ret1 = -1, ret2 = -1, fi = -1;
                    while (av_read_frame(fmt_ctx, pkt) >= 0) {
                        TimeUnit.SECONDS.sleep(1);
                        if (pkt.stream_index() == v_stream_idx) {
                            ret1 = avcodec_send_packet(codec_ctx, pkt);
                            ret2 = avcodec_receive_frame(codec_ctx, frm);
                            System.out.printf("ret1 %d ret2 %d\n", ret1, ret2);
                        }

                        if (ret2 >= 0 && ++i <= 50) {
                            //++i;


                            av_image_fill_arrays(pFrameRGB.data(), pFrameRGB.linesize(),
                                    buffer, AV_PIX_FMT_RGB24, codec_ctx.width(), codec_ctx.height(), j += 1);
                            sws_scale(
                                    sws_ctx,
                                    frm.data(),
                                    frm.linesize(),
                                    0,
                                    codec_ctx.height(),
                                    pFrameRGB.data(),
                                    pFrameRGB.linesize()
                            );

                            System.out.printf("frame%d_.ppm%n", j);
                            logger.log(Level.FINE, "Frame " + j + "is being processed");

                            Main_ffmpeg.save_frame(pFrameRGB, codec_ctx.width(), codec_ctx.height(), i);

                            try {
                                String s = LicenseReader.licenseReader("frm.ppm");
                                System.out.println("license:" + s);
                                try {
                                    Client client = clientRepository.findByLicensePlate(s);
                                    if (!plates.contains(s)) {
                                        logger.log(Level.FINE, "Recognized client: " + client.toString());

                                        try {
                                            int spot = Main.getAvailableSpot();
                                            if (spot != -1) {
                                                logger.log(Level.FINE, "Sending email with parking spot");
                                                emailService.sendMail(client.getEmail(), "Parking Spot", "Your Parking spot is number: " + spot);
                                            } else {
                                                logger.log(Level.FINE, "No available parking spots, client is being notified");
                                                emailService.sendMail(client.getEmail(), "Parking Spot", "Currently there are no available parking spots.");
                                            }
                                        } catch (MailSendException ss) {
                                            logger.log(Level.SEVERE, "Fatal Error: " + Arrays.toString(ss.getMessageExceptions()));
                                        } finally {
                                            plates.add(s);
                                        }
                                    }
                                } catch (Exception e) {
                                    //return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
                                }
                            } catch (IndexOutOfBoundsException e) {
                                logger.log(Level.INFO, "No license plate in this frame");

                            }
                        }
                        av_packet_unref(pkt);
                            if (i >= 50) {
                                av_frame_free(frm);
                                avcodec_close(codec_ctx);
                                avcodec_free_context(codec_ctx);
                                avformat_close_input(fmt_ctx);
                                pFrameRGB.close();
                                frm.close();
                                fmt_ctx=null;
                                codec_ctx = null;
                                codec = null;
                                frm = null;
                                pFrameRGB = null;
                                buffer = null;
                                sws_ctx = null;


                                System.gc();
                                //TimeUnit.SECONDS.sleep(5);
//
                                 ret = -1; i = 0; v_stream_idx = -1;

                                vf_path = ipAddress.getIp(); //Path to the uploaded file

                                 fmt_ctx = new avformat.AVFormatContext(null);

                                ret = avformat_open_input(fmt_ctx, vf_path, null, null);
                                if (ret < 0) {
                                    logger.log(Level.SEVERE, "Fatal Error");
                                    throw new IllegalStateException(); //When file cannot be opened
                                }

                                if (avformat_find_stream_info(fmt_ctx, (PointerPointer) null) < 0) {//Function needed for sws to work
                                    logger.log(Level.SEVERE, "Fatal Error");
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
                                    logger.log(Level.SEVERE, "Fatal Error: Video Stream could not be found");
                                    throw new IllegalStateException();
                                } else {
                                    logger.log(Level.FINE, "Video stream with resolution: " + fmt_ctx.streams(i).codecpar().width() + "x" + fmt_ctx.streams(i).codecpar().height());
                                  codec_ctx = avcodec_alloc_context3(null);
                                    avcodec_parameters_to_context(codec_ctx, fmt_ctx.streams(v_stream_idx).codecpar());
                                    codec = avcodec_find_decoder(codec_ctx.codec_id());

                                    if (codec == null) {
                                        logger.log(Level.SEVERE, "Fatal Error: Video Codec could not be found");
                                        throw new IllegalStateException();
                                    }

                                    ret = avcodec_open2(codec_ctx, codec, (PointerPointer) null);

                                    if (ret < 0) {
                                        logger.log(Level.SEVERE, "Fatal Error: Video Codec could not be opened");
                                        throw new IllegalStateException();
                                    }

                                    frm = av_frame_alloc();

                                    // Allocate an AVFrame structure
                                    pFrameRGB = av_frame_alloc();
                                    if (pFrameRGB == null) {
                                        System.exit(-1);
                                    }

                                    // Determine required buffer size and allocate buffer
                                    numBytes = av_image_get_buffer_size(AV_PIX_FMT_RGB24, codec_ctx.width(),
                                            codec_ctx.height(), 1);
                                     buffer = new BytePointer(av_malloc(numBytes));

                                    sws_ctx = sws_getContext(
                                            codec_ctx.width(),
                                            codec_ctx.height(),
                                            codec_ctx.pix_fmt(),
                                            codec_ctx.width(),
                                            codec_ctx.height(),
                                            AV_PIX_FMT_RGB24,
                                            SWS_BILINEAR,
                                            null,
                                            null,
                                            (DoublePointer) null
                                    );

                                    if (sws_ctx == null) {
                                        throw new IllegalStateException();
                                    }

                                    av_image_fill_arrays(pFrameRGB.data(), pFrameRGB.linesize(),
                                            buffer, AV_PIX_FMT_RGB24, codec_ctx.width(), codec_ctx.height(), 0);

                                    i = 0;
                                    j = 0;
                                    ret1 = -1; ret2 = -1; fi = -1;
                            }
                    }

            }
                    av_frame_free(frm);
                    avcodec_close(codec_ctx);
                    avcodec_free_context(codec_ctx);
                    avformat_close_input(fmt_ctx);
                    fmt_ctx=null;
                    codec_ctx = null;
                    codec = null;
                    frm = null;
                    pFrameRGB = null;
        }
    }
        catch (IOException ioException) {
            //return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        } catch (IllegalStateException illegalStateException) {
            //return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (SWSException swsException) {
            //return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (InterruptedException interruptedException) {
            interruptedException.printStackTrace();
        }
    }
}
