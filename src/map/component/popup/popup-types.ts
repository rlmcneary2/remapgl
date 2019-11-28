import { AnchorType } from "../../../types/ui";
import { LngLat, Point } from "../../../types/location";
import { Marker as MarkerGL } from "mapbox-gl";

export interface MarkerPopupProps {
  /**
   * A string indicating the part of the Marker that should be positioned
   * closest to the coordinate set by location. Can't be changed once set.
   */
  anchor?: AnchorType;
  children: React.ReactNode;
  /**
   * If true, a close button will appear in the top right corner of the popup.
   */
  closeButton?: boolean;
  /**
   * The offset in pixels to apply relative to the element's center. Negative
   * values indicate left and up.
   */
  offset?: number | Point;
}

export interface PopupProps extends MarkerPopupProps {
  /**
   * Sets the geographical location of the popup's anchor, and moves the popup to it.
   */
  location: LngLat;
}

export interface InternalPopupProps extends PopupProps {
  marker?: MarkerGL;
}
