input.onButtonPressed(Button.A, function () {
    if (READING == 0) {
        REV_DHT = 1
        basic.showLeds(`
            . # # . .
            # . . # .
            . . # . .
            . . . . .
            . . # . .
            `)
        basic.pause(5000)
        dht11_dht22.queryData(
        DHTtype.DHT11,
        DigitalPin.P1,
        true,
        false,
        true
        )
        if (dht11_dht22.sensorrResponding() == true) {
            basic.showLeds(`
                . . # . .
                . # . # .
                # . . . #
                # . . . #
                . # # # .
                `)
            basic.showLeds(`
                . . . . .
                . . . . #
                . . . # .
                # . # . .
                . # . . .
                `)
            // En inglés es para que sea universal (son falsos cognados en español).
            basic.showString("Hum.(DHT11) Responding...")
        } else {
            basic.showLeds(`
                . . # . .
                . # . # .
                # . . . #
                # . . . #
                . # # # .
                `)
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `)
            // En inglés es para que sea universal.
            basic.showString("Hum.[DHT11] No Responding...")
        }
        basic.pause(5000)
        dht11_dht22.queryData(
        DHTtype.DHT22,
        DigitalPin.P2,
        true,
        false,
        true
        )
        if (dht11_dht22.sensorrResponding() == true) {
            basic.showLeds(`
                # # . . .
                # # . # #
                . . # . .
                . . # . .
                . . . # #
                `)
            basic.showLeds(`
                . . . . .
                . . . . #
                . . . # .
                # . # . .
                . # . . .
                `)
            // En inglés es para que sea universal (son falsos cognados en español).
            basic.showString("Temp.[DHT22] Responding...")
        } else {
            basic.showLeds(`
                # # . . .
                # # . # #
                . . # . .
                . . # . .
                . . . # #
                `)
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `)
            // En inglés es para que sea universal (son falsos cognados en español).
            basic.showString("Temp.[DHT22] No Responding...")
        }
        basic.showLeds(`
            # # # # #
            # . # . #
            . . # . .
            . . # . .
            . # # # .
            `)
        basic.showLeds(`
            . . . . .
            . . . . .
            . # # # .
            . . . . .
            . . . . .
            `)
    }
})
let TP_BM_MIN = 0
let REV_DHT = 0
let READING = 0
radio.setGroup(57)
dht11_dht22.selectTempType(tempType.celsius)
basic.showLeds(`
    . . # . .
    . . # . .
    # . # . #
    # . . . #
    . # # # .
    `)
loops.everyInterval(20000, function () {
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P1,
    true,
    false,
    true
    )
    basic.pause(5000)
    if (dht11_dht22.readDataSuccessful() == true) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # # # # #
            # # # # #
            . # # # .
            `)
        TP_BM_MIN = dht11_dht22.readData(dataType.humidity)
        basic.showString(" " + TP_BM_MIN + "%")
    } else {
        basic.showLeds(`
            . . # . .
            . . # # .
            # # . # #
            # # # . #
            . # # # .
            `)
        led.plotBrightness(0, 0, 12)
        led.plotBrightness(1, 1, 12)
        led.plotBrightness(2, 2, 12)
        led.plotBrightness(3, 3, 12)
        led.plotBrightness(4, 4, 12)
    }
    if (dht11_dht22.readDataSuccessful() == true) {
        if (TP_BM_MIN <= 70) {
            pins.digitalWritePin(DigitalPin.P0, 1)
        } else {
            pins.digitalWritePin(DigitalPin.P0, 0)
        }
    }
    dht11_dht22.queryData(
    DHTtype.DHT22,
    DigitalPin.P2,
    true,
    false,
    true
    )
    basic.pause(3000)
    if (dht11_dht22.readDataSuccessful() == true) {
        basic.showLeds(`
            # # . . .
            # # . # #
            . . # . .
            . . # . .
            . . . # #
            `)
        basic.showString(" " + dht11_dht22.readData(dataType.temperature) + " *C")
    } else {
        basic.showLeds(`
            . # . . .
            # . . # #
            . . . . .
            . . # . .
            . . . # .
            `)
        led.plotBrightness(0, 0, 12)
        led.plotBrightness(1, 1, 12)
        led.plotBrightness(2, 2, 12)
        led.plotBrightness(3, 3, 12)
        led.plotBrightness(4, 4, 12)
    }
    basic.pause(3000)
    READING = 0
    basic.showLeds(`
        . . # . .
        . # # # .
        . . . . .
        . # # # .
        . . . . .
        `)
    basic.pause(5000)
    pauseUntil(() => REV_DHT >= 0)
    READING = 1
})
