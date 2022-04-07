const NodeMediaServer = require("node-media-server");

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: process.env.PORT || 8000,
    allow_origin: "*"
  },
  // trans: {
  //   ffmpeg: '/usr/local/bin/ffmpeg',
  //   tasks: [
  //     {
  //       app: 'live',
  //       hls: true,
  //       hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
  //       dash: true,
  //       dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
  //     }
  //   ]
  // },
  relay: {
    ffmpeg: '/usr/local/bin/ffmpeg',
    tasks: [
      {
        app: 'cctv',
        mode: 'static',
        edge: 'rtsp://admin:admin888@192.168.0.149:554/ISAPI/streaming/channels/101',
        name: '0_149_101',
        rtsp_transport : 'tcp' //['udp', 'tcp', 'udp_multicast', 'http']
      },{
        app: 'mv',
        mode: 'static',
        edge: '/Users/visionary/Downloads/videoplayback.mp4',
        name: 'dq'
      }
    ]
  }
};

var nms = new NodeMediaServer(config);
nms.run();
