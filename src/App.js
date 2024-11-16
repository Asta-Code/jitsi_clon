import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const iframeRef = useRef(null);
  const [meetingLink, setMeetingLink] = useState("");

  const startMeeting = () => {
    const roomName = `meet-${uuidv4()}`;
    const domain = "meet.jit.si";
    const meetingUrl = `https://${domain}/${roomName}`;
    setMeetingLink(meetingUrl); // Genera y guarda el enlace

    const options = {
      roomName,
      width: "100%",
      height: "90vh",
      parentNode: iframeRef.current,
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false, 
        SHOW_BRAND_WATERMARK: false, 
        SHOW_POWERED_BY: false,
        HIDE_INVITE_MORE_HEADER: true, 
        DEFAULT_BACKGROUND: "#000000", 
      },
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        enableClosePage: false, // Deshabilita el botón para cerrar la reunión
      },
    };
    

    new window.JitsiMeetExternalAPI(domain, options);
  };

  return (
    <div>
      <button onClick={startMeeting}>Crear Reunión</button>
      {meetingLink && (
        <div>
          <p>
            Comparte este enlace con otros para unirse a la reunión:
            <a href={meetingLink} target="_blank" rel="noopener noreferrer">
              {meetingLink}
            </a>
          </p>
        </div>
      )}
      <div ref={iframeRef}></div>
    </div>
  );
};

export default App;
