import { useState } from "react";

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const phone = "5491132617326";

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const sendMessage = () => {
    const text =
      message ||
      `Hola, tengo una consulta sobre esta página: ${window.location.href}`;

    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
      text
    )}`;

    window.open(url, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div
      id="wsp"
      className={`whatsapp_chat_support wcs_fixed_right wcs-effect-1 ${
        isOpen ? "wcs-show" : ""
      }`}
    >
      {/* LABEL */}
      <div
        className={`wcs_button_label ${
          isOpen ? "wcs_button_label_hide" : ""
        }`}
        onClick={toggleChat}
      >
        ¿Necesitás ayuda?
      </div>

      {/* BUTTON */}
      <div className="wcs_button" onClick={toggleChat}>
        <i className="bi bi-whatsapp"></i>
      </div>

      {/* POPUP */}
      <div className="wcs_popup">
        <div className="wcs_popup_close" onClick={toggleChat}>
          <i className="bi bi-x-lg"></i>
        </div>

        <div className="wcs_popup_header">
          <i className="bi bi-whatsapp icon-top"></i>
          <div className="wcs_popup_header_description">
            Envianos tu consulta y te responderemos a la brevedad.
          </div>
        </div>

        <div className="wcs_popup_input">
          <input
            type="text"
            placeholder="Escribe aquí tu mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <i
            className="bi bi-send btn-send btn-wsp"
            onClick={sendMessage}
          ></i>
        </div>
      </div>
    </div>
  );
}
