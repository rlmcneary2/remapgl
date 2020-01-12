(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{YhgK:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return o})),a.d(t,"default",(function(){return d}));a("5hJT"),a("W1QL"),a("K/PF"),a("t91x"),a("75LO"),a("PJhk");var n=a("SAVP"),r=a("TjRS"),b=a("ZFoC"),l=a("T42C");a("aD51");function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var o={};void 0!==o&&o&&o===Object(o)&&Object.isExtensible(o)&&!o.hasOwnProperty("__filemeta")&&Object.defineProperty(o,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/map/map.mdx"}});var c={_frontmatter:o},i=r.a;function d(e){var t=e.components,a=function(e,t){if(null==e)return{};var a,n,r={},b=Object.keys(e);for(n=0;n<b.length;n++)a=b[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,["components"]);return Object(n.b)(i,p({},c,a,{components:t,mdxType:"MDXLayout"}),Object(n.b)("h1",{id:"map"},"Map"),Object(n.b)("p",null,"The ",Object(n.b)("inlineCode",{parentName:"p"},"<Map/>")," component creates and displays a map. The Map can be controlled and interacted with via its props. The only required prop is ",Object(n.b)("inlineCode",{parentName:"p"},"accessToken"),". This is ",Object(n.b)("a",p({parentName:"p"},{href:"https://docs.mapbox.com/help/how-mapbox-works/access-tokens/"}),"a string token provided by Mapbox"),", you will need to create a Mapbox account to get one."),Object(n.b)("p",null,"A Map component can accept a number of other components as children. Data at a specific point is displayed on a map using a ",Object(n.b)("a",p({parentName:"p"},{href:"/remapgl/docs/marker"}),"Marker"),". Information that applies to paths or regions on a map can be applied by ",Object(n.b)("a",p({parentName:"p"},{href:"/remapgl/docs/layer"}),"Layer")," components."),Object(n.b)("h2",{id:"props"},"Props"),Object(n.b)(b.c,{of:l.a,mdxType:"Props"}),Object(n.b)("h2",{id:"associated-types"},"Associated types"),Object(n.b)("h3",{id:"animationoptions"},"AnimationOptions"),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",p({parentName:"tr"},{align:null}),"Property"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Type"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Comments"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"duration?"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"number"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The animation's duration, measured in milliseconds.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"easing?"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"(input: number) => number"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"A function taking a time in the range 0..1 and returning a number where 0 is the initial state and 1 is the final state.")))),Object(n.b)("h3",{id:"boundsoptions"},"BoundsOptions"),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",p({parentName:"tr"},{align:null}),"Property"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Type"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Comments"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),Object(n.b)("strong",{parentName:"td"},"bounds")),Object(n.b)("td",p({parentName:"tr"},{align:null}),"LngLatBounds"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"Center these bounds in the viewport and use the highest zoom level up to and including maxZoom that fits them in the viewport.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"eventData?"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"object"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"Additional properties to be added to event objects of events triggered by a change.")))),Object(n.b)("h3",{id:"centeroptions"},"CenterOptions"),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",p({parentName:"tr"},{align:null}),"Property"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Type"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Comments"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),Object(n.b)("strong",{parentName:"td"},"center")),Object(n.b)("td",p({parentName:"tr"},{align:null}),"LngLat"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The geographical center point of the map. Changing this value will cause the map position to change.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"eventData?"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"object"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"Additional properties to be added to event objects of events triggered by a change.")))),Object(n.b)("h3",{id:"lnglat"},"LngLat"),Object(n.b)("p",null,"Represents a geographic location on the map. When using the tuple (array) signature the first element is the longitude and the second element is the latitude.\n| ",Object(n.b)("inlineCode",{parentName:"p"},"GeoPoint")," | ",Object(n.b)("inlineCode",{parentName:"p"},"SimplePoint")),Object(n.b)("h3",{id:"lnglatbounds"},"LngLatBounds"),Object(n.b)("p",null,"Represents a geographic rectangle on a map. A tuple; the first element is the south west corner, the second element is the north east corner.\n",Object(n.b)("inlineCode",{parentName:"p"},"[LngLat, LngLat]")),Object(n.b)("h3",{id:"mapboxzoomevent"},"MapBoxZoomEvent"),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",p({parentName:"tr"},{align:null}),"Property"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Type"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Comments"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"originalEvent"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"MouseEvent"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The DOM event which caused the map event.")))),Object(n.b)("h3",{id:"mapdataevent"},"MapDataEvent"),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",p({parentName:"tr"},{align:null}),"Property"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Type"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Comments"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"coord?"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"Coordinate"),Object(n.b)("td",p({parentName:"tr"},{align:null}),'The coordinate of the tile if the event has a dataType of "source" and the event is related to loading of a tile.')),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"dataType"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"string"),Object(n.b)("td",p({parentName:"tr"},{align:null}),'The type of data that has changed. One of "source" or "style".')),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"isSourceLoaded?"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"boolean"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"True if the event has a dataType of source and the source has no outstanding network requests.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"source?"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"object"),Object(n.b)("td",p({parentName:"tr"},{align:null}),'The style spec representation of the source if the event has a dataType of "source".')),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"sourceDataType?"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"string"),Object(n.b)("td",p({parentName:"tr"},{align:null}),'Included if the event has a dataType of "source" and the event signals that internal data has been received or changed. Possible values are "metadata" and "content".')),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"tile?"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"object"),Object(n.b)("td",p({parentName:"tr"},{align:null}),'The tile being loaded or changed, if the event has a dataType of "source" and the event is related to loading of a tile.')),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"type"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"string"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The event type.")))),Object(n.b)("h3",{id:"mapmouseevent"},"MapMouseEvent"),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",p({parentName:"tr"},{align:null}),"Property"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Type"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Comments"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"defaultPrevented"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"boolean"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"true if preventDefault has been called.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"lngLat"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"LngLat"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The geographic location on the map of the mouse cursor.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"originalEvent"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"Event"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The DOM event which caused the map event.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"point"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"*"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The pixel coordinates of the mouse cursor, relative to the map and measured from the top left corner.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"preventDefault"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"() => void"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"Prevents subsequent default processing of the event by the map.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"target"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"Map"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The object that fired the event.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"type"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"*"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The event type.")))),Object(n.b)("h3",{id:"maptouchevent"},"MapTouchEvent"),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",p({parentName:"tr"},{align:null}),"Property"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Type"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Comments"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"defaultPrevented"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"boolean"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"true if preventDefault has been called.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"lngLat"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"LngLat"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The geographic location on the map of the center of the touch event points.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"lngLats"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"LngLat"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The geographical locations on the map corresponding to a touch event's touches property.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"originalEvent"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"Event"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The DOM event which caused the map event.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"point"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"*"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The pixel coordinates of the center of the touch event points, relative to the map and measured from the top left corner.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"points"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"*"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The array of pixel coordinates corresponding to a touch event's touches property.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"preventDefault"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"() => void"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"Prevents subsequent default processing of the event by the map.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"target"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"Map"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The object that fired the event.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"type"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"*"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The event type.")))),Object(n.b)("h3",{id:"mapwheelevent"},"MapWheelEvent"),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",p({parentName:"tr"},{align:null}),"Property"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Type"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Comments"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"defaultPrevented"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"boolean"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"true if preventDefault has been called.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"originalEvent"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"Event"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The DOM event which caused the map event.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"preventDefault"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"() => void"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"Prevents subsequent default processing of the event by the map.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"target"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"Map"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The object that fired the event.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"type"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"*"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The event type.")))),Object(n.b)("h3",{id:"motiontype"},"MotionType"),Object(n.b)("p",null,"Type of motion the camera should use when transitioning from one location to another.\n",Object(n.b)("inlineCode",{parentName:"p"},'"ease" | "fly" | "jump"')),Object(n.b)("h3",{id:"zoomoptions"},"ZoomOptions"),Object(n.b)("table",null,Object(n.b)("thead",{parentName:"table"},Object(n.b)("tr",{parentName:"thead"},Object(n.b)("th",p({parentName:"tr"},{align:null}),"Property"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Type"),Object(n.b)("th",p({parentName:"tr"},{align:null}),"Comments"))),Object(n.b)("tbody",{parentName:"table"},Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),"eventData?"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"object"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"Additional properties to be added to event objects of events triggered by a change.")),Object(n.b)("tr",{parentName:"tbody"},Object(n.b)("td",p({parentName:"tr"},{align:null}),Object(n.b)("strong",{parentName:"td"},"zoom")),Object(n.b)("td",p({parentName:"tr"},{align:null}),"number"),Object(n.b)("td",p({parentName:"tr"},{align:null}),"The zoom level of the map.")))))}d&&d===Object(d)&&Object.isExtensible(d)&&!d.hasOwnProperty("__filemeta")&&Object.defineProperty(d,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/map/map.mdx"}}),d.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-map-map-mdx-4cbaffac1447ba5a445e.js.map