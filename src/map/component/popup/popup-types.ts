import { AnchorType } from "../../../types/ui";
import { LngLat } from "../../../types/location";
import { SimplePoint } from "../../../types/data";

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
  offset?: number | SimplePoint;
}

export interface PopupProps extends MarkerPopupProps {
  /**
   * Sets the geographical location of the popup's anchor, and moves the popup to it.
   */
  location: LngLat;
}
