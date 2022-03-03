import React from "react";

import _ from "lodash";

import "./Tags.css";
import WMImage from "../WMImage";
import WMVideo from "../WMVideo";
import { Box } from "@mui/system";

class TagParser {

  /**
   * Special Tag
   * 
   * <url href="@url">{children}</url>
   * 
   * <mail href="@url"></mail>
   * 
   * <map lang="@string"></map>
   * 
   * <videourl>{children}</videourl>
   * 
   * <imageurl>{children}</imageurl>
   * 
   */

  static Parse(theme, parsed, iaddOns){
    
    if(typeof(parsed) === "string") return parsed;
    
    if(!Array.isArray(parsed)) {
      parsed = [parsed];
    }
    
    let rendered = [];
    _.map(parsed, (o, i) => {

      let {href, children, target, src, title, poster, option} = o.props || {};

      switch(o.type){
        case "url":
          rendered.push(
            <Box key={o.key} 
              className={theme + " chatizo-tags-url"} 
              onClick={() => window.open(href,
              target || "_blank",
              option || "resizable=1, width=800, height=600, scrollbars=yes")}>
              {children}
            </Box>
          );
          break;
        
        case "mail":
          rendered.push(
            <a key={o.key} 
              className={theme + " chatizo-tags-mail"} 
              href={"mailto:" + href}>
              {children}
            </a>
          );
          break;

        case "map":
          console.log("map", o);
          break;

        case "imageurl":
          rendered.push(
            <WMImage 
              key={o.key} 
              onImageClick={() => {
                if(href) {
                  window.open(href,
                    target || "_blank",
                    option || "resizable=1, width=800, height=600, scrollbars=yes");
                }}}
              src={src}
              title={title}
              >
            </WMImage>
          );
          break;

        case "videourl":
          rendered.push(
            <Box key={o.key} 
              className={theme + " chatizo-tags-video"}>
              <WMVideo 
                key={o.key}
                video={{
                  src: src,
                  poster: poster
                }}
                >
              </WMVideo>
            </Box>
          );
          break;
        
        default:
          if(children && Array.isArray(children)){
            rendered.push(this.Parse(theme, children, iaddOns));
          }else{
            rendered.push(o);
          }

      }
    });
    return rendered;
  }
  
}

export default TagParser;