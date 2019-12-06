import React from "react";
import Popup from "../../popup/popup";
import { MarkerPopupProps, PopupProps } from "../../popup/popup-types";

export default function MarkerPopup(props: MarkerPopupProps): JSX.Element {
  return <Popup {...(props as PopupProps)} />;
}
