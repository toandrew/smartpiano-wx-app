// pages/bluetooth/index.js

const SCANNING_TIME = 3000;

const THEONE_SERVICE_UUID = '03b80e5a-ede8-4b33-a751-6ce34ec4c700';
const THEONE_CHAR_UUID = '7772e5db-3868-4112-a1a9-f2669d106bf3';
// const THEONE_CHAR_READ_WRITE_UUID = '0783b03e-8535-b5a0-7140-a304d2495cb9';

var deviceScanInterval = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    devices: [], // 蓝牙设备
    connectedDeviceId: "",
    readServiceId: '',
    writeServiceId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.openBluetoothAdapter({
      success: function(res) {
        console.log("openBluetoothAdapter ok", res);
        wx.startBluetoothDevicesDiscovery({
          services: [THEONE_SERVICE_UUID],
          success: function(res) {
            console.log(res);
          },
        })
      },
      fail: function() {
        console.error("openBluetoothAdapter failed");
      },
      complete: function() {
        console.log("openBluetoothAdapter complete");
      }
    });

    wx.onBLEConnectionStateChange(function(res){
      console.log(res);
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self = this;
    if (deviceScanInterval) {
      clearInterval(deviceScanInterval);
      deviceScanInterval = null;
    }

    wx.startBluetoothDevicesDiscovery({
      services: [THEONE_SERVICE_UUID],
      success: function(res) {
        console.log(res);
      },
    });

    deviceScanInterval = setInterval(function(){
      self.scanDevice();
    }, SCANNING_TIME);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.stopScanDevice();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload====");
    this.stopScanDevice();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  onDeviceSelected: function (e) {
    var self = this;
    var deviceId = this.data.devices[e.currentTarget.dataset.index].deviceId;
    this.setData({
      connectedDeviceId: deviceId
    });
    console.log("onDeviceSelected:" + e.currentTarget.dataset.index + ' deviceId:' + deviceId);
    wx.createBLEConnection({
      deviceId: deviceId,
      success: function(res) {
        console.log(res);
        wx.showToast({
          title: '连接成功',
        });

        wx.getBLEDeviceServices({
          deviceId: deviceId,
          success: function(res) {
            console.log(res);

            for (let service of res.services) {
              console.log('serviceUUID: ' + service.uuid);
            }

            setTimeout(function() {
              wx.getBLEDeviceCharacteristics({
                deviceId: deviceId,
                serviceId: THEONE_SERVICE_UUID,
                success: function(res) {
                  console.log(res);

                  var theOneReadChar = null;
                  var theOneWriteChar = null;
                  for (let char of res.characteristics) {
                    if (char.uuid.toLowerCase() == THEONE_CHAR_UUID) {
                      console.log('found char: ' + char.uuid);

                      if (char.properties.notify) {
                        theOneReadChar = char;
                      }

                      if (char.properties.write) {
                        theOneWriteChar = char;
                      }
                    }
                  }

                  wx.onBLECharacteristicValueChange(function (characteristic){
                    console.log('characteristic value com:', characteristic);
                  });

                  if (theOneReadChar) {
                    wx.notifyBLECharacteristicValueChange({
                      state: true,
                      deviceId: deviceId,
                      serviceId: THEONE_SERVICE_UUID,
                      characteristicId: theOneReadChar.uuid,

                      success: function (res) {
                        console.log("notify ok!" , res);
                      },

                      fail: function(res) {
                        console.log("notify failed:", res);
                      }
                    });
                  }

                  console.log("read char:" + theOneReadChar + " write char:" + theOneWriteChar);

                  // send connect command
                  // if (theOneWriteChar) {
                  //   var hex = 'F000202B6900005579F7';
                  //   var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
                  //     return parseInt(h, 16)
                  //   }));

                  //   var buffer = typedArray.buffer
                  //   wx.writeBLECharacteristicValue({
                  //     deviceId: deviceId,
                  //     serviceId: THEONE_SERVICE_UUID,
                  //     characteristicId: theOneWriteChar.uuid,
                  //     value: buffer,
                  //     success: function(res) {
                  //       console.log("connect ok!" + res);
                  //     },

                  //     fail: function(res) {
                  //       console.log("connect failed!" + res);
                  //     }
                  //   })
                  // }
                },
              })
            }, 3000);
          },
        })
      },

      fail: function(res) {
        console.error(res);

        wx.showToast({
          title: '连接失败',
        });
      },

      complete: function(res) {
        console.log(res);
      }
    })
  },

  scanDevice: function () {
    var self = this;
    console.log("scanDevice");
    wx.getBluetoothDevices({
      success: function(res) {
        console.log(res);
        console.log(res.devices);
        
        self.setData({
          devices: res.devices
        });

        if (self.data.connectedDeviceId) {
          wx.readBLECharacteristicValue({
            deviceId: self.data.connectedDeviceId,
            serviceId: THEONE_SERVICE_UUID,
            characteristicId: THEONE_CHAR_UUID,
            success: function (res) {
              console.log('readBLECharacteristicValue ok:', res);
            },
            fail: function (res) {
              console.log('readBLECharacteristicValue failed:', res);
            }
          })
        }
      },
    })
  },

  connectDevice: function() {
    var self = this;

    wx.onBLECharacteristicValueChange(function (characteristic){
      console.log('characteristic value come:', characteristic);
    });
                  ``
    // send connect command
    var hex = 'F000202B6900005579F7';
    var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }));

    var buffer = typedArray.buffer
    wx.writeBLECharacteristicValue({
      deviceId: self.data.connectedDeviceId,
      serviceId: THEONE_SERVICE_UUID,
      characteristicId: THEONE_CHAR_UUID,
      value: buffer,
      success: function (res) {
        console.log("connect ok!", res);
      },

      fail: function (res) {
        console.log("connect failed!" + res);
      }
    });

    wx.readBLECharacteristicValue({
      deviceId: self.data.connectedDeviceId,
      serviceId: THEONE_SERVICE_UUID,
      characteristicId: THEONE_CHAR_UUID,
      success: function (res) {
        console.log('readBLECharacteristicValue ok:', res);
      },
      fail: function(res) {
        console.log('readBLECharacteristicValue failed:', res);
      }
    })
  },

  stopScanDevice: function() {
    wx.stopBluetoothDevicesDiscovery({
      success: function (res) {
        console.log(res);
      },
    });

    if (deviceScanInterval) {
      clearInterval(deviceScanInterval);
      deviceScanInterval = null;
    }
  }
})