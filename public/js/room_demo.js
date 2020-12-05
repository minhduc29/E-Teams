const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-access-token')

const appID = "2e80dab7f36946688e993becbfc049c5"
const appCert = "5de8053dbe9c49c08a95bf5e90e675fc"
const role = RtcRole.PUBLISHER
const privilegeExpiredTs = 0

let channelName, uid, token

$("#create-room").submit(function (e) {
    e.preventDefault()
    if ($("#channel").val() == "") {
        alert("Missing room name")
    } else {
        channelName = $("#channel").val()
        uid = auth.currentUser.uid
        token = RtcTokenBuilder.buildTokenWithAccount(appID, appCert, channelName, uid, role, privilegeExpiredTs)
        $("#channel-name-display").html(channelName)
        $("#token-display").html(token)
        const modal = document.querySelector('#create-room-modal')
        M.Modal.getInstance(modal).close()
        document.querySelector("#create-room").reset()
    }
})

if (document.querySelector("#token-display")) {
    $("#copy").click(function () {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($("#token-display").text()).select();
        document.execCommand("copy");
        $temp.remove();
    })
}