(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"9H4P":function(e,n,a){"use strict";a.r(n),a.d(n,"_frontmatter",(function(){return i})),a.d(n,"default",(function(){return s}));a("5hJT"),a("W1QL"),a("K/PF"),a("t91x"),a("75LO"),a("PJhk");var t=a("/FXl"),r=a("TjRS");a("aD51");function o(){return(o=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t])}return e}).apply(this,arguments)}var i={};void 0!==i&&i&&i===Object(i)&&Object.isExtensible(i)&&!i.hasOwnProperty("__filemeta")&&Object.defineProperty(i,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/map/component/marker/marker-guide.mdx"}});var l={_frontmatter:i},p=r.a;function s(e){var n=e.components,a=function(e,n){if(null==e)return{};var a,t,r={},o=Object.keys(e);for(t=0;t<o.length;t++)a=o[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,["components"]);return Object(t.b)(p,o({},l,a,{components:n,mdxType:"MDXLayout"}),Object(t.b)("h1",{id:"marker"},"Marker"),Object(t.b)("p",null,"The ",Object(t.b)("a",o({parentName:"p"},{href:"https://codesandbox.io/embed/map-markers-54jez?fontsize=14&hidenavigation=1&theme=dark"}),'Code Sandbox "Map\nMarkers"'),"\nis a working example of working with Markers in remapgl."),Object(t.b)("iframe",{src:"https://codesandbox.io/embed/map-markers-54jez?fontsize=14&hidenavigation=1&theme=dark",style:{width:"100%",height:"500px",border:"0",borderRadius:"4px",overflow:"hidden"},title:"Map Markers",allow:"geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb",sandbox:"allow-modals allow-forms allow-popups allow-scripts allow-same-origin"}),Object(t.b)("h2",{id:"sample-code"},"Sample Code"),Object(t.b)("p",null,"The following code illustrates how an array of objects with information about\nvehicles are being changed into Marker components that are children of a\n",Object(t.b)("a",o({parentName:"p"},{href:"/remapgl/docs/map"}),"Map")," component."),Object(t.b)("pre",null,Object(t.b)("code",o({parentName:"pre"},{className:"language-jsx"}),"<Map accessToken={accessToken}>\n  {vehicles.map(vehicle => {\n      const { label, ...props } = vehicle;\n      return (\n        <Marker\n          {...props}\n          draggable={false}\n          key={label}\n          popup={\n            <MarkerPopup offset={40}>\n              <p>{`Vehicle: ${label}`}</p>\n            </MarkerPopup>\n          }\n        />\n      );\n    })}\n</Map>\n")),Object(t.b)("h2",{id:"custom-markers"},"Custom Markers"),Object(t.b)("p",null,"A Marker component optionally accepts children. These child components will be\nrendered as DOM objects to determine the appearance of the Marker. If no\nchildren are provided the default Mapbox GL marker will be displayed. The color\nof the default marker can be changed by setting the ",Object(t.b)("inlineCode",{parentName:"p"},"color")," prop. If not provided\nthe marker will be blue."),Object(t.b)("p",null,"The following example sets an SVG image of 30 pixels by 30 pixels as the marker:"),Object(t.b)("pre",null,Object(t.b)("code",o({parentName:"pre"},{className:"language-jsx"}),'<Marker key={key} location={location}>\n  <div style={{ height: "30px", width: "30px" }}>\n    <svg\n      xmlns="http://www.w3.org/2000/svg"\n      viewBox="0 0 11 11"\n    >\n      <g transform="translate(-68.385 -172.48)">\n        <circle cx="73.885" cy="177.98" r="2.86" fill="#fff" id="icon-fill"/>\n        <path style="line-height:normal;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-feature-settings:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;text-orientation:mixed;shape-padding:0;isolation:auto;mix-blend-mode:normal" d="M73.885 174.855a3.13 3.13 0 0 0-3.125 3.126 3.129 3.129 0 0 0 3.125 3.125 3.13 3.13 0 0 0 3.125-3.125 3.13 3.13 0 0 0-3.125-3.126zm0 .53a2.592 2.592 0 0 1 2.595 2.596 2.592 2.592 0 0 1-2.595 2.595 2.592 2.592 0 0 1-2.596-2.595 2.592 2.592 0 0 1 2.596-2.596zm-.001.455c-.385 0-.9.11-1.121.202-.22.091-.367.183-.413.412l-.165 1.27v1.752h.285v.275c0 .334.49.334.49 0v-.275h1.848v.275c0 .334.49.334.49 0v-.275h.284v-1.75l-.165-1.272c-.046-.229-.192-.32-.413-.412-.22-.093-.736-.202-1.12-.202zm-.769.281h1.536c.152 0 .152.286 0 .286h-1.535c-.152 0-.152-.285 0-.286zm-.362.454h2.263c.066 0 .122.048.134.111l.134 1.002a.136.136 0 0 1-.13.17h-2.538a.136.136 0 0 1-.13-.17l.135-1.002a.135.135 0 0 1 .132-.11zm-.038 1.858a.259.259 0 0 1 0 .518.259.259 0 1 1 0-.518zm2.345.001a.258.258 0 0 1-.007.517.259.259 0 0 1-.26-.26.258.258 0 0 1 .267-.257z" color="#000" font-weight="400" font-family="sans-serif" white-space="normal" overflow="visible" id="icon-path"/>\n      </g>\n    </svg>\n  </div>\n</Marker>\n')),Object(t.b)("h2",{id:"events"},"Events"),Object(t.b)("p",null,"The events onDrag, onDragstart, and onDragend are special events provided by\nMapbox GL. ",Object(t.b)("a",o({parentName:"p"},{href:"https://docs.mapbox.com/mapbox-gl-js/api/#marker"}),"See their marker documentation for\ndetails")," about the event\nobject provided to handlers."),Object(t.b)("p",null,"Other event handlers may be attached to Markers using standard React naming\n(e.g. ",Object(t.b)("inlineCode",{parentName:"p"},"<Marker onClick={() => {}} />"),"). The event objects provided as the\nhandler parameter will NOT be React SyntheticEvents, they will be standard DOM\nEvent objects."),Object(t.b)("h2",{id:"popups"},"Popups"),Object(t.b)("p",null,"Any Marker can have a ",Object(t.b)("a",o({parentName:"p"},{href:"/remapgl/docs/markerpopup"}),"MarkerPopup")," component provided through the\n",Object(t.b)("inlineCode",{parentName:"p"},"popup"),' prop. By default this popup will be shown when the marker is clicked and\nhidden when the marker is clicked again or the optional "close" button is\ntapped. The MarkerPopup accepts children.'),Object(t.b)("pre",null,Object(t.b)("code",o({parentName:"pre"},{className:"language-jsx"}),"<Marker\n  popup={\n    <MarkerPopup offset={40}>\n      Pop!\n    </MarkerPopup>\n  }\n/>\n")),Object(t.b)("h2",{id:"style"},"Style"),Object(t.b)("p",null,"A custom Marker may be styled using the ",Object(t.b)("inlineCode",{parentName:"p"},"className")," prop. This means most CSS in\nJS type libraries like ",Object(t.b)("a",o({parentName:"p"},{href:"https://www.styled-components.com/"}),"styled-components"),"\nor ",Object(t.b)("a",o({parentName:"p"},{href:"https://emotion.sh/docs/styled"}),"@emotion/styled")," can be used to define the\nMarker's appearance. "))}s&&s===Object(s)&&Object.isExtensible(s)&&!s.hasOwnProperty("__filemeta")&&Object.defineProperty(s,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/map/component/marker/marker-guide.mdx"}}),s.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-map-component-marker-marker-guide-mdx-b7e4e7b7bf6f266f7504.js.map