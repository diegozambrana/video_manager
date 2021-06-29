import React from 'react';
import IframeResizer from 'iframe-resizer-react';


export const IFramePlayer = (props) => {
    const {source} = props;
    const iframe_style = {
      border: 'none',
      width: '1px',
      minWidth: '100%',
      minHeight: '100%',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
    }

    let settings_iframe = {
      src: source.url_source,
      style: iframe_style,
      mozallowfullscreen: 'mozallowfullscreen',
      x: 'mozallowfullscreen',
      allowFullScreen: 'allowFullScreen'
    }

    return (
        <IframeResizer
          {...settings_iframe}
        />
    )
}