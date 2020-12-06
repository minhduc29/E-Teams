const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-access-token')

M.AutoInit()

const appID = "2e80dab7f36946688e993becbfc049c5"
const appCert = "5de8053dbe9c49c08a95bf5e90e675fc"
const role = RtcRole.PUBLISHER
const privilegeExpiredTs = 0
const uid = 0

let channelName, token

let rtc = {
    client: null,
    joined: false,
    published: false,
    localStream: null,
    remoteStreams: [],
    params: {}
}

console.log("agora sdk version: " + AgoraRTC.VERSION + " compatible: " + AgoraRTC.checkSystemRequirements())

let Toast = {
    info: (msg) => {
        Toastify({
            text: msg,
            classes: "info-toast"
        })
    },
    notice: (msg) => {
        Toastify({
            text: msg,
            classes: "notice-toast"
        })
    },
    error: (msg) => {
        Toastify({
            text: msg,
            classes: "error-toast"
        })
    }
}

// Generate token
$("#create-room").submit(function (e) {
    e.preventDefault()

    if ($("#channel").val() == "") {
        alert("Missing room name")
    } else {
        channelName = $("#channel").val()
        const roomRef = db.collection('rooms').doc(channelName)
        roomRef.get().then(doc => {
            if (doc.exists) {
                alert('Please try another room name')
            } else {
                roomRef.set({
                    ownerUID: auth.currentUser.uid
                }).then(() => {
                    token = RtcTokenBuilder.buildTokenWithUid(appID, appCert, channelName, uid, role, privilegeExpiredTs)
                    $("#channel-name-display").html(channelName)
                    $("#token-display").html(token)
                    const modal = document.querySelector('#create-room-modal')
                    M.Modal.getInstance(modal).close()
                    document.querySelector("#create-room").reset()
                })
            }
        })
    }
})

// Auto copy token
if (document.querySelector("#token-display")) {
    $("#copy").click(function () {
        let $temp = $("<input>")
        $("body").append($temp)
        $temp.val($("#token-display").text()).select()
        document.execCommand("copy")
        $temp.remove()
    })
}

// Join room
$("#join-room").submit(function (e) {
    e.preventDefault()

    if ($("#channel-name").val() == "") {
        alert("Missing room name")
    } else if ($("#token").val() == "") {
        alert("Missing token")
    } else {
        let option = {
            appID: appID,
            channel: $("#channel-name").val(),
            uid: auth.currentUser.uid,
            token: $("#token").val()
        }

        join(rtc, option)
        const modal = document.querySelector('#join-room-modal')
        M.Modal.getInstance(modal).close()
        document.querySelector("#join-room").reset()
    }
})


function Toastify(options) {
    M.toast({ html: options.text, classes: options.classes })
}

function addView(id, show) {
    if (!$("#" + id)[0]) {
        $("<div/>", {
            id: "remote_video_panel_" + id,
            class: "video-view",
        }).appendTo("#video")

        $("<div/>", {
            id: "remote_video_" + id,
            class: "video-placeholder",
        }).appendTo("#remote_video_panel_" + id)

        $("<div/>", {
            id: "remote_video_info_" + id,
            class: "video-profile " + (show ? "" : "hide"),
        }).appendTo("#remote_video_panel_" + id)

        $("<div/>", {
            id: "video_autoplay_" + id,
            class: "autoplay-fallback hide",
        }).appendTo("#remote_video_panel_" + id)
    }
}

function removeView(id) {
    if ($("#remote_video_panel_" + id)[0]) {
        $("#remote_video_panel_" + id).remove()
    }
}

function join(rtc, option) {
    if (rtc.joined) {
        Toast.error("You're already joined")
        return
    }

    rtc.client = AgoraRTC.createClient({
        mode: 'rtc',
        codec: 'h264'
    })

    rtc.params = option

    // handle AgoraRTC client event
    handleEvents(rtc)

    // init client
    rtc.client.init(option.appID, function () {
        console.log("init success")
        rtc.client.join(option.token, option.channel, option.uid, function (uid) {
            Toast.notice("join channel: " + option.channel + " success, uid: " + uid)
            console.log("join channel: " + option.channel + " success, uid: " + uid)
            rtc.joined = true

            rtc.params.uid = uid

            // create local stream
            rtc.localStream = AgoraRTC.createStream({
                streamID: rtc.params.uid,
                audio: true,
                video: true,
                screen: false,
                microphoneId: option.microphoneId,
                cameraId: option.cameraId
            })

            // initialize local stream. Callback function executed after intitialization is done
            rtc.localStream.init(function () {
                console.log("init local stream success")
                // play stream with html element id "local_stream"
                rtc.localStream.play("local_stream")

                // publish local stream
                publish(rtc)
            }, function (err) {
                Toast.error("stream init failed, please open console to see more detail")
                console.error("init local stream failed ", err)
            })
        }, function (err) {
            Toast.error("client join failed, please open console to see more detail")
            console.error("client join failed", err)
        })
    }, (err) => {
        Toast.error("client init failed, please open console to see more detail")
        console.error(err)
    })
}

function publish(rtc) {
    if (!rtc.client) {
        Toast.error("Please Join Room First")
        return
    }
    if (rtc.published) {
        Toast.error("You're already published")
        return
    }
    let oldState = rtc.published

    // publish localStream
    rtc.client.publish(rtc.localStream, function (err) {
        rtc.published = oldState
        console.log("publish failed")
        Toast.error("publish failed")
        console.error(err)
    })
    Toast.info("publish")
    rtc.published = true
}

function leave(rtc) {
    if (!rtc.client) {
        Toast.error("Please Join First!")
        return
    }
    if (!rtc.joined) {
        Toast.error("You are not in channel")
        return
    }

    rtc.client.leave(function () {
        // stop stream
        if (rtc.localStream.isPlaying()) {
            rtc.localStream.stop()
        }

        // close stream
        rtc.localStream.close()
        for (let i = 0; i < rtc.remoteStreams.length; i++) {
            let stream = rtc.remoteStreams.shift()
            let id = stream.getId()
            if (stream.isPlaying()) {
                stream.stop()
            }
            removeView(id)
        }
        const roomRef = db.collection('rooms').doc(rtc.params.channel)
        roomRef.get().then(doc => {
            if (doc.data().ownerUID == rtc.params.uid) {
                roomRef.delete()
            }
        })
        rtc.localStream = null
        rtc.remoteStreams = []
        rtc.client = null
        console.log("client leaves channel success")
        rtc.published = false
        rtc.joined = false
        Toast.notice("leave success")
    }, function (err) {
        console.log("channel leave failed")
        Toast.error("leave success")
        console.error(err)
    })
}

function handleEvents(rtc) {
    // Occurs when an error message is reported and requires error handling.
    rtc.client.on("error", (err) => {
        console.log(err)
    })

    // Occurs when the peer user leaves the channel; for example, the peer user calls Client.leave.
    rtc.client.on("peer-leave", function (evt) {
        let id = evt.uid
        console.log("id", evt)
        let streams = rtc.remoteStreams.filter(e => id !== e.getId())
        let peerStream = rtc.remoteStreams.find(e => id === e.getId())
        if (peerStream && peerStream.isPlaying()) {
            peerStream.stop()
        }
        rtc.remoteStreams = streams
        if (id !== rtc.params.uid) {
            removeView(id)
        }
        Toast.notice("peer leave")
        console.log("peer-leave", id)
    })

    // Occurs when the local stream is published.
    rtc.client.on("stream-published", function (evt) {
        Toast.notice("stream published success")
        console.log("stream-published")
    })

    // Occurs when the remote stream is added.
    rtc.client.on("stream-added", function (evt) {
        let remoteStream = evt.stream
        let id = remoteStream.getId()
        Toast.info("stream-added uid: " + id)
        if (id !== rtc.params.uid) {
            rtc.client.subscribe(remoteStream, function (err) {
                console.log("stream subscribe failed", err)
            })
        }
        console.log("stream-added remote-uid: ", id)
    })

    // Occurs when a user subscribes to a remote stream.
    rtc.client.on("stream-subscribed", function (evt) {
        let remoteStream = evt.stream
        let id = remoteStream.getId()
        rtc.remoteStreams.push(remoteStream)
        addView(id)
        remoteStream.play("remote_video_" + id)
        Toast.info("stream-subscribed remote-uid: " + id)
        console.log("stream-subscribed remote-uid: ", id)
    })

    // Occurs when the remote stream is removed; for example, a peer user calls Client.unpublish.
    rtc.client.on("stream-removed", function (evt) {
        let remoteStream = evt.stream
        let id = remoteStream.getId()
        Toast.info("stream-removed uid: " + id)
        if (remoteStream.isPlaying()) {
            remoteStream.stop()
        }
        rtc.remoteStreams = rtc.remoteStreams.filter(function (stream) {
            return stream.getId() !== id
        })
        removeView(id)
        console.log("stream-removed remote-uid: ", id)
    })
    rtc.client.on("onTokenPrivilegeWillExpire", function () {
        Toast.info("onTokenPrivilegeWillExpire")
        console.log("onTokenPrivilegeWillExpire")
    })
    rtc.client.on("onTokenPrivilegeDidExpire", function () {
        Toast.info("onTokenPrivilegeDidExpire")
        console.log("onTokenPrivilegeDidExpire")
    })
}

$("#leave").click(function () {
    leave(rtc)
})