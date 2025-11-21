import 'dotenv/config';

const token = process.env.PUSHBULLET_TOKEN;

const body = {
    type: "note",
    title: "Weather Alert",
    body: "This is a test notification from your bot."
};

fetch("https://api.pushbullet.com/v2/pushes", {
    method: "POST",
    headers: {
        "Access-Token": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
})
.then(function(res) { console.log("Notification sent, status:", res.status); })
.catch(function(err) { console.error(err); });
