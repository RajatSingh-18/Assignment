import React, { useEffect, useState } from "react";
import "./dashboard.css";
import wifi from "./Images/Vector wifi.png";
import speaker from "./Images/Group.png";
import battery from "./Images/Vector.png";
import logo from "./Images/9225b8bc-2f93-4304-84d9-0868a6f62ca3 4.png";

export default function Dashboard() {
  const [appsData, setAppsData] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDateTime] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [newAppName, setNewAppName] = useState("");
  const [newAppSrc, setNewAppSrc] = useState("");

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const handleMenuItemClick = (action) => {
    switch (action) {
      case "addFolder":
        console.log("Add Folder clicked");
        break;
      case "addFile":
        console.log("Add File clicked");
        break;
      case "word":
        console.log("Word clicked");
        break;
      case "excel":
        console.log("Excel clicked");
        break;
      case "powerpoint":
        console.log("PowerPoint clicked");
        break;
      default:
        break;
    }
    setMenuVisible(false);
  };
  const tick = () => {
    setCurrentTime(new Date());
  };
  console.log(appsData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./data.json"); // Fetching the JSON file
        const data = await response.json();
        setAppsData(data.apps);
        setMenuList(data.list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetch function when the component mounts
  }, []);

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const createApp = (appName, appSrc) => {
    const newAppData = [...appsData, { name: appName, src: appSrc }];
    setAppsData(newAppData);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAddApp = () => {
    createApp(newAppName, newAppSrc);
    setModalVisible(false);
    setNewAppName("");
    setNewAppSrc("");
  };

  return (
    <div className="dashboard-container" onContextMenu={handleContextMenu}>
      <div className="top">
        <img src={wifi} alt="" />
        <img src={speaker} alt="" />
        <img src={battery} alt="" />
      </div>
      <div className="datetime">
        <div className="time">{formattedTime}</div>
        <div className="date">{formattedDate}</div>
      </div>
      {menuVisible && (
        <ul
          className="context-menu"
          style={{ left: menuPosition.x, top: menuPosition.y }}
        >
          {menuList.map((item, index) => (
            <li key={index} onClick={() => handleMenuItemClick(item.name)}>
              {item.name}
              {item.submenu && (
                <ul className="sub-menu">
                  {item.submenu.map((subitem, subindex) => (
                    <li
                      key={subindex}
                      onClick={() => handleMenuItemClick(subitem)}
                    >
                      {subitem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="app-container">
        <div className="appscontent">
          {appsData.map((app, index) => (
            <div key={index} className="app-item">
              <img className="appsicon" src={app.src} alt={app.name} />
            </div>
          ))}
        </div>
      </div>
      <div className="footer">
        <div>
          <button className="filebutton" onClick={openModal}>
            Add App
          </button>
        </div>
        <div>
          <img src={logo} className="footerlogo" alt="Logo" />
        </div>
      </div>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add New App</h2>
            <input
              type="text"
              className="appname"
              placeholder="App Name"
              value={newAppName}
              onChange={(e) => setNewAppName(e.target.value)}
            />
            <input
              type="file"
              className="file"
              placeholder="Image Source URL"
              value={newAppSrc}
              onChange={(e) => setNewAppSrc(e.target.value)}
            />
            <button className="addapp" onClick={handleAddApp}>
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
