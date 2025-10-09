const MQTT_TOPIC = `emakefun/sensor/${control.deviceSerialNumber()}/testtopic`

let last_publish_time = 0
let display_state = true
serial.redirect(
    SerialPin.P1,
    SerialPin.P0,
    BaudRate.BaudRate9600
)
emakefun.initEspAtModule()
emakefun.wifiConnect("emakefun", "501416wf")
emakefun.mqttUserConfig(
    emakefun.connectionScheme.kMqttOverTcp,
    "my_client_id",
    "my_user_name",
    "my_password",
    ""
)
emakefun.mqttConnect("broker.emqx.io", 1883, true)
emakefun.mqttSubscribe(MQTT_TOPIC, 0)
basic.showIcon(IconNames.Happy)
basic.forever(function () {
    const message_info = emakefun.mqttReceive(1000)
    if (message_info != null) {
        const end_time = input.runningTime() + 200
        let received_data = ""
        while (received_data.length < message_info.length && input.runningTime() < end_time) {
            if (emakefun.available() > 0) {
                const current_byte = emakefun.readSerialByte()
                if (current_byte > 0) {
                    received_data = "" + received_data + String.fromCharCode(current_byte)
                }
            }
        }
        if (message_info.topic == MQTT_TOPIC && received_data.length == message_info.length) {
            if (received_data == "display on") {
                led.enable(true)
                display_state = false
            } else if (received_data == "display off") {
                led.enable(false)
                display_state = true
            }
        }
    }
    if (input.runningTime() - last_publish_time > 1000) {
        emakefun.mqttPublish(
            display_state ? "display on" : "display off",
            MQTT_TOPIC,
            1000,
            0,
            false
        )
        last_publish_time = input.runningTime()
    }
})
