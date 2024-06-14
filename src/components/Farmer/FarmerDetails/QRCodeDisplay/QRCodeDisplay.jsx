import React from "react";
import QRCode from "qrcode.react";

const QRCodeDisplay = ({ value }) => {
  return (
    <div className="mt-8 flex justify-center">
      <QRCode value={value} size={128} />
    </div>
  );
};

export default QRCodeDisplay;
