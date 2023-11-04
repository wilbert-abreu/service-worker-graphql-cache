import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

export const useTodosQuery = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const query = `
      query GetSeries {
        series {
          id
          name
          sets {
            id
          }
          logo
        }
      }
    `;
      const res = await fetch("https://api.tcgdex.net/v2/graphql", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
        cache: 'force-cache'
      });
      const data = await res.json();
      return data
    },
  });
};


function App() {
  const [count, setCount] = useState(0);
  const [currentDevice, setDevice] = useState(null);

  useEffect(() => {
    const query = `
      query GetSeries {
        series {
          id
          name
          sets {
            id
          }
          logo
        }
      }
    `;
    const id = setInterval(async () => {
      const startTime = Date.now();
      console.log("Started fetch");
      const res = await fetch("https://api.tcgdex.net/v2/graphql", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
        cache: 'force-cache'
      });
      const data = await res.json();
      console.log({ data, time: Date.now() - startTime });
    }, 5000);

    return () => {
      clearInterval(id);
    };
  }, [])

  // useEffect(() => {
  //   if (currentDevice) {
  //     const getDeviceInfo = async () => {
  //       console.log({ currentDevice });

  //       const deviceName = currentDevice.gatt.device.name;
  //       const server = await currentDevice.gatt.connect();

  //       const batteryService = await server.getPrimaryService(
  //         "battery_service",
  //       );
  //       const infoService = await server.getPrimaryService(
  //         "device_information",
  //       );
  //       // const firstService = await server.getPrimaryService("9fa480e0-4967-4542-9390-d343dc5d04ae");
  //       // const secondService = await server.getPrimaryService("d0611e78-bbb4-4591-a5f8-487910ae4366");
  //       // const thirdService = await server.getPrimaryService("00001805-0000-1000-8000-00805f9b34fb");
  //       // const forthService = await server.getPrimaryService("0000180a-0000-1000-8000-00805f9b34fb");

  //       const batteryLevelCharacteristic = await batteryService
  //         .getCharacteristic(
  //           "battery_level",
  //         );

  //       batteryLevelCharacteristic.startNotifications().then((_) => {
  //         console.log("> Notifications started");
  //         batteryLevelCharacteristic.addEventListener(
  //           "characteristicvaluechanged",
  //           (event) => {
  //             const value = event.target.value;
  //             console.log(value.getUint8(0));
  //           },
  //         );
  //       });
  //       // Convert recieved buffer to number
  //       const batteryLevel = await batteryLevelCharacteristic.readValue();
  //       const batteryPercent = await batteryLevel.getUint8(0);

  //       console.log({ batteryPercent });

  //       const infoCharacteristics = await infoService.getCharacteristics();
  //       console.log(infoCharacteristics);
  //       const infoValues = [];
  //       const promise = new Promise((resolve, reject) => {
  //         infoCharacteristics.forEach(async (characteristic, index, array) => {
  //           // Returns a buffer
  //           const value = await characteristic.readValue();
  //           console.log(new TextDecoder().decode(value));
  //           // Convert the buffer to string
  //           infoValues.push(new TextDecoder().decode(value));
  //           if (index === array.length - 1) resolve(void 0);
  //         });
  //       });

  //       await promise;

  //       console.log({ infoValues });

  //       // const firstServiceCharacteristics = await forthService.getCharacteristics();
  //       // console.log(firstServiceCharacteristics);
  //       // const firstInfoValues = [];
  //       // const firstPromise = new Promise((resolve, reject) => {
  //       //   infoCharacteristics.forEach(async (characteristic, index, array) => {
  //       //     // Returns a buffer
  //       //     const value = await characteristic.readValue();
  //       //     console.log(new TextDecoder().decode(value));
  //       //     // Convert the buffer to string
  //       //     firstInfoValues.push(new TextDecoder().decode(value));
  //       //     if (index === array.length - 1) resolve();
  //       //   });
  //       // });

  //       // await firstPromise

  //       // console.log({firstInfoValues})
  //     };
  //     console.log("DEVICE CONNECTED", currentDevice);

  //     getDeviceInfo();
  //   }
  // }, [currentDevice]);

  // function onDisconnected(event) {
  //   // Object event.target is Bluetooth Device getting disconnected.
  //   console.log("> Bluetooth Device disconnected");
  //   setDevice(null);
  // }

  // const startBluetoothConnection = async () => {
  //   const device = await navigator.bluetooth
  //     .requestDevice({
  //       optionalServices: ["battery_service", "device_information"],
  //       // "9fa480e0-4967-4542-9390-d343dc5d04ae", "d0611e78-bbb4-4591-a5f8-487910ae4366", "00001805-0000-1000-8000-00805f9b34fb", "0000180f-0000-1000-8000-00805f9b34fb", "0000180a-0000-1000-8000-00805f9b34fb"
  //       acceptAllDevices: true,
  //     })
  //     .then((device) => {
  //       setDevice(device);
  //       device.addEventListener("gattserverdisconnected", onDisconnected);
  //       console.log(`Name: ${device.name}`);
  //       // Do something with the device.
  //       return device;
  //     })
  //     .catch((error) => console.error(`Something went wrong. ${error}`));
  // };

  // useEffect(() => {
  //   const query = `
  //     query GetSeries {
  //       series {
  //         id
  //         name
  //         sets {
  //           id
  //         }
  //         logo
  //       }
  //     }
  //   `;
  //   const id = setInterval(async () => {
  //     const startTime = Date.now();
  //     console.log("Started fetch");
  //     const res = await fetch("https://api.tcgdex.net/v2/graphql", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         query,
  //       }),
  //     });
  //     const data = await res.json();
  //     console.log({ data, time: Date.now() - startTime });
  //   }, 5000);

  //   const query2 = `
  //     query GetSeries {
  //       series {
  //         id
  //         name
  //         sets {
  //           id
  //         }
  //       }
  //     }
  //   `;

  //   const id2 = setInterval(async () => {
  //     const startTime = Date.now();
  //     console.log("Started fetch 2");
  //     const res = await fetch("https://api.tcgdex.net/v2/graphql", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         query: query2,
  //       }),
  //     });
  //     const data = await res.json();
  //     console.log("fetch 2", { data, time: Date.now() - startTime });
  //   }, 5000);

  //   return () => {
  //     clearInterval(id);
  //     clearInterval(id2);
  //   };
  // }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
