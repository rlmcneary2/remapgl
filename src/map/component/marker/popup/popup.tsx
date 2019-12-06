import React from "react";
import Popup from "../../popup/popup";
import { InternalPopupProps } from "../../popup/popup-types";

export default function MarkerPopup(props: InternalPopupProps): JSX.Element {
  return <Popup {...props} />;
}
