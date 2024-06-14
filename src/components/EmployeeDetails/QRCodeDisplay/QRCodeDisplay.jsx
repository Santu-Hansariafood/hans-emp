import React from "react";
import QRCode from "qrcode.react";

const QRCodeDisplay = ({ employee }) => {
  return (
    <div className="mt-4 lg:mt-0 lg:ml-4">
      <QRCode value={JSON.stringify(employee)} />
    </div>
  );
};

export default QRCodeDisplay;
