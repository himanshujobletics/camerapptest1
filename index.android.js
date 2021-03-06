import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  AppRegistry
} from 'react-native';
import Camera from 'react-native-camera';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
});
export default class CameraSample extends React.Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      isRecording: false
    };
  }
  takePicture = () => {
    if (this.camera) {
      this.camera.capture()
        .then((data) => console.log(data))
        .catch(err => console.error(err));
    }
  }

  startRecording = () => {
    fetch('http://localhost:8000/answer',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dummy:'dummy data'
      })
    }).then(function(response) {
      if(response.status != 200) {
        alert("ERROR: "+response.status);
      }
    });
  //  if (this.camera) {
  //    this.camera.capture({mode: Camera.constants.CaptureMode.video})
  //        .then((data) =>
  //        fetch(\'http://localhost:8000/answer',{
  //                method: 'POST',
  //                headers: {
  //                    'Accept':'application/json',
  //                    'Content-Type':'application/json'
  //                  },
  //                body: JSON.stringify({
  //                  dummy:'hey'
  //                })
  //                }
  //             ))
  //        .catch(err => console.error(err));
  //    this.setState({
  //      isRecording: true
  //    });
  //  }
 }
  // startRecording = () => {
  //   if(this.camera) {
  //     this.camera.capture({mode: Camera.constants.CaptureMode.video})
  //     .then((data) =>
  //           fetch('http://localhost:8000/answer',{
  //                   method: 'POST',
  //                   headers: {
  //                       'Accept':'application/json',
  //                       'Content-Type':'application/json'
  //                     },
  //                   body: data.path
  //                   }
  //                )
  //           ).catch(err => alert(err));
  //           this.setState({
  //             isRecording: true
  //       });
  //   }
  // }
//   startRecording = () => {
//     if (this.camera) {
//       this.camera.capture({mode: Camera.constants.CaptureMode.video})
//           .then((data) =>
//               fetch('http://localhost:8000/answer',{
//                 method:'POST',
//                 headers: {
//                   'Accept': 'application/json',
//                   'Content-Type':'application/json'
//                 },
//                 body: data.path
//               }).then(function(resp) {
//                   if(resp.status !== 200) {
//                     alert('Problem: '+resp.status);
//                     return;
//                   }
//               });
//           )
//
//           //  alert(data.path))
//         //   RNFetchBlob.fetch('POST', 'https://127.0.0.1:8000/answer', {
//         //   'Answer': JSON.stringify({
//         //     path : data.path,
//         //     mode : 'add',
//         //     autorename : true,
//         //     mute : false
//         //   }),
//         //   'Content-Type' : 'application/octet-stream',
//         //   // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
//         //   // Or simply wrap the file path with RNFetchBlob.wrap().
//         // }, RNFetchBlob.wrap(data.path)))
//   // .then((res) => {
//   //   console.log(res.text())
//   // })
//   // .catch((err) => {
//   //   // error handling ..
//   // })//)
// //          .catch(err => console.error(err));
//       this.setState({
//         isRecording: true
//       });
//     }
//   }
  stopRecording = () => {
    if (this.camera) {
      this.camera.stopCapture()
       .then((data) => alert(data.path))
      //fetch('https://localhost:8000/answer', {
      //       method: 'POST',
      //       // headers: {
      //       //   'Accept': 'application/json',
      //       //   'Content-Type': 'application/json',
      //       // },
      //       body: JSON.stringify({
      //         firstParam: data.path
      //       })
      //     }));//);
      this.setState({
        isRecording: false
      });
    }
  }
  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;
    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }
    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }
  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;
    if (this.state.camera.type === back) {
      icon = require('./assets/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('./assets/ic_camera_front_white.png');
    }
    return icon;
  }
  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;
    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }
    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }
  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;
    if (this.state.camera.flashMode === auto) {
      icon = require('./assets/ic_flash_auto_white.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('./assets/ic_flash_on_white.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('./assets/ic_flash_off_white.png');
    }
    return icon;
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          hidden
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          defaultTouchToFocus
          mirrorImage={false}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={this.switchType}
          >
            <Image
              source={this.typeIcon}
            />
          </TouchableOpacity>
          </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          {
            !this.state.isRecording
            &&
            <TouchableOpacity
                style={styles.captureButton}
                onPress={this.takePicture}
            >
              <Image
                  source={require('./assets/ic_photo_camera_36pt.png')}
              />
            </TouchableOpacity>
            ||
            null
          }
          <View style={styles.buttonsSpace} />
          {
              !this.state.isRecording
              &&
              <TouchableOpacity
                  style={styles.captureButton}
                  onPress={this.startRecording}
              >
                <Image
                    source={require('./assets/ic_videocam_36pt.png')}
                />
              </TouchableOpacity>
              ||
              <TouchableOpacity
                  style={styles.captureButton}
                  onPress={this.stopRecording}
              >
                <Image
                    source={require('./assets/ic_stop_36pt.png')}
                />
              </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}
// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
//
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   TouchableHighlight,
//   Dimensions
// } from 'react-native';
// import Camera from 'react-native-camera';
//
// export default class CameraSample extends Component{
//   constructor(props) {
//       super(props);
//
//       this.camera = null;
//
//       this.state = {
//         camera: {
//           aspect: Camera.constants.Aspect.fill,
//           captureTarget: Camera.constants.CaptureTarget.cameraRoll,
//           type: Camera.constants.Type.back,
//           orientation: Camera.constants.Orientation.auto,
//           flashMode: Camera.constants.FlashMode.auto,
//         },
//         isRecording: false
//       };
//     }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Camera
//         ref={(cam) => {
//           this.camera = cam;
//         }}
//         style={styles.preview}
//         aspect={Camera.constants.Aspect.fill}>
//           <TouchableHighlight onPress={this.takePicture.bind(this)}>
//             <View style={{height:50, width:50, backgroundColor: 'red', borderRadius: 50, marginBottom: 20}}>
//             </View>
//           </TouchableHighlight>
//         </Camera>
//       </View>
//     );
//   }
// }
//
//
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     height: Dimensions.get('window').height,
//     width: Dimensions.get('window').width
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     color: '#000',
//     padding: 10,
//     margin: 40
//   }
// });
AppRegistry.registerComponent('CameraSample', () => CameraSample);
