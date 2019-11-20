import { PopupProps } from "../../../popup/popup";
import { LngLat, Point } from "../../../types/location";
import { AnchorType } from "../../../types/ui";

type DragHandler = (data: LngLat) => void;

type EventHandler = (event: any) => void;

// export interface ListenerProps {
//   [key: string]: ListenerProp | undefined;
// }

export interface MarkerPropsInternal extends MarkerProps {
  /**
   * A unique identifier for the marker.
   */
  uid: string;
}

export interface MarkerProps {
  /**
   * The type of HTML element that wraps provided children; defaults to DIV.
   * Ignored if there are no children.
   */
  as?: string;
  /**
   * A string indicating the part of the Marker that should be positioned
   * closest to the coordinate set by location. Can't be changed once set.
   */
  anchor?: AnchorType;
  /**
   * Defines the appearance of a marker. If not provided the default pin marker
   * will be displayed
   */
  children?: JSX.Element;
  /**
   * A class name to set on the containing DIV element.
   */
  className?: string;
  /**
   * The color to use for the default marker if children are not provided. The
   * default is light blue. Can't be changed once set.
   */
  color?: string;
  /**
   * Indicates if a marker can be dragged to a new location on the map.
   */
  draggable?: boolean;
  /**
   * Set the marker's geographical position and move it.
   */
  location: LngLat;
  /**
   * The offset in pixels to apply relative to the element's center. Negative
   * values indicate left and up.
   */
  offset?: Point;
  /**
   * Fired when the marker is clicked.
   */
  onClick?: EventHandler;
  /**
   * Fired while dragging.
   */
  onDrag?: EventHandler;
  /**
   * Fired when the marker is finished being dragged.
   */
  onDragend?: DragHandler;
  /**
   * Fired when dragging starts.
   */
  onDragstart?: DragHandler;
  /**
   * Fired when the mouse enters the marker.
   */
  onMouseenter?: EventHandler;
  /**
   * Fired when the mouse exits the marker.
   */
  onMouseleave?: EventHandler;
  /**
   * A Popup component with content for this marker.
   */
  popup?: () => React.ReactElement<PopupProps>;
  /**
   * If true the popup will be shown.
   */
  togglePopup?: boolean;
}
