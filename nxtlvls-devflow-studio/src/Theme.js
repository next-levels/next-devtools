import {deepMerge} from "grommet/utils";
import {grommet} from "grommet";

const theme = deepMerge(grommet, {
  "name": "my theme",
  "rounding": 0,
  "spacing": 28,
  "defaultMode": "light",
  "global": {
    "colors": {
      "background": {
        "dark": "#1d1c2e",
        "light": "#FFFFFF"
      },
      "background-back": {
        "light": "#fffff",
        "dark": "#1d1c2e"
      },
      "background-front": {
        "dark": "#ffffff03",
        "light": "#fffff"
      },
      "background-contrast": "#11111111",
      "text": {
        "dark": "#EEEEEE",
        "light": "#333333"
      },
      "text-strong": {
        "dark": "#FFFFFF",
        "light": "#000000"
      },
      "text-weak": {
        "dark": "#CCCCCC",
        "light": "#444444"
      },
      "text-xweak": {
        "dark": "#999999",
        "light": "#666666"
      },
      "border": {
        "light": "#ccc",
        "dark": "#FFFFFF"
      },
      "control": "brand",
      "active-background": "#FFFFFF-contrast",
      "active-text": "#FFFFFF",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#FF4040",
      "status-warning": "#FFAA15",
      "status-ok": "#00C781",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "status-warning",
      "brand": {
        "dark": "#6FFFB0",
        "light": "#512DA8"
      }
    },
    "font": {
      "family": "Nunito ",
      "size": "21px",
      "height": "28px",
      "maxWidth": "588px"
    },
    "active": {
      "background": "active-background",
      "color": "active-text"
    },
    "hover": {
      "background": "active-background",
      "color": "active-text"
    },
    "selected": {
      "background": "selected-background",
      "color": "selected-text"
    },
    "control": {
      "border": {
        "radius": "0px"
      }
    },
    "drop": {
      "border": {
        "radius": "0px"
      }
    },
    "borderSize": {
      "xsmall": "1px",
      "small": "2px",
      "medium": "5px",
      "large": "14px",
      "xlarge": "28px"
    },
    "breakpoints": {
      "small": {
        "value": 896,
        "borderSize": {
          "xsmall": "1px",
          "small": "2px",
          "medium": "5px",
          "large": "7px",
          "xlarge": "14px"
        },
        "edgeSize": {
          "none": "0px",
          "hair": "1px",
          "xxsmall": "2px",
          "xsmall": "4px",
          "small": "7px",
          "medium": "14px",
          "large": "28px",
          "xlarge": "56px"
        },
        "size": {
          "xxsmall": "28px",
          "xsmall": "56px",
          "small": "112px",
          "medium": "224px",
          "large": "448px",
          "xlarge": "896px",
          "full": "100%"
        }
      },
      "medium": {
        "value": 1792
      },
      "large": {}
    },
    "edgeSize": {
      "none": "0px",
      "hair": "1px",
      "xxsmall": "4px",
      "xsmall": "7px",
      "small": "14px",
      "medium": "28px",
      "large": "56px",
      "xlarge": "112px",
      "responsiveBreakpoint": "small"
    },
    "input": {
      "padding": "14px",
      "weight": 600
    },
    "spacing": "28px",
    "size": {
      "xxsmall": "56px",
      "xsmall": "112px",
      "small": "224px",
      "medium": "448px",
      "large": "896px",
      "xlarge": "1344px",
      "xxlarge": "1792px",
      "full": "100%"
    }
  },
  "chart": {},
  "diagram": {
    "line": {}
  },
  "meter": {},
  "tip": {
    "content": {
      "background": {
        "color": "background"
      },
      "elevation": "none",
      "round": false
    }
  },
  "button": {
    "border": {
      "width": "2px",
      "radius": "0px"
    },
    "padding": {
      "vertical": "5px",
      "horizontal": "26px"
    }
  },
  "checkBox": {
    "check": {
      "radius": "0px"
    },
    "toggle": {
      "radius": "0px",
      "size": "56px"
    },
    "size": "28px"
  },
  "radioButton": {
    "size": "28px",
    "check": {
      "radius": "0px"
    }
  },
  "formField": {
    "border": {
      "color": "brand",
      "error": {
        "color": {
          "dark": "white",
          "light": "status-critical"
        }
      },
      "position": "inner",
      "side": "bottom",
      "size": "large"
    },
    "content": {
      "pad": "small"
    },
    "disabled": {
      "background": {
        "color": "status-disabled",
        "opacity": "medium"
      }
    },
    "error": {
      "color": "status-critical",
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      }
    },
    "help": {
      "color": "text-weak",
      "margin": {
        "start": "small"
      },
      "size": "xsmall"
    },
    "info": {
      "color": "text-xweak",
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      }
    },
    "label": {
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      },
      "color": "text"
    },
    "margin": {
      "bottom": "small"
    },
    "survey": {
      "label": {
        "margin": {
          "bottom": "xsmall"
        },
        "size": "medium",
        "weight": 400
      }
    },
    "round": "0px"
  },
  "calendar": {
    "small": {
      "fontSize": "16.333333333333332px",
      "lineHeight": 1.375,
      "daySize": "32.00px"
    },
    "medium": {
      "fontSize": "21px",
      "lineHeight": 1.45,
      "daySize": "64.00px"
    },
    "large": {
      "fontSize": "35px",
      "lineHeight": 1.11,
      "daySize": "128.00px"
    }
  },
  "clock": {
    "analog": {
      "hour": {
        "width": "9px",
        "size": "28px"
      },
      "minute": {
        "width": "5px",
        "size": "14px"
      },
      "second": {
        "width": "4px",
        "size": "11px"
      },
      "size": {
        "small": "84px",
        "medium": "112px",
        "large": "168px",
        "xlarge": "252px",
        "huge": "336px"
      }
    },
    "digital": {
      "text": {
        "xsmall": {
          "size": "11.666666666666666px",
          "height": 1.5
        },
        "small": {
          "size": "16.333333333333332px",
          "height": 1.43
        },
        "medium": {
          "size": "21px",
          "height": 1.375
        },
        "large": {
          "size": "25.666666666666668px",
          "height": 1.167
        },
        "xlarge": {
          "size": "30.333333333333336px",
          "height": 1.1875
        },
        "xxlarge": {
          "size": "39.66666666666667px",
          "height": 1.125
        }
      }
    }
  },
  "heading": {
    "level": {
      "1": {
        "small": {
          "size": "40px",
          "height": "47px",
          "maxWidth": "1111px"
        },
        "medium": {
          "size": "58px",
          "height": "65px",
          "maxWidth": "1633px"
        },
        "large": {
          "size": "96px",
          "height": "103px",
          "maxWidth": "2679px"
        },
        "xlarge": {
          "size": "133px",
          "height": "140px",
          "maxWidth": "3724px"
        }
      },
      "2": {
        "small": {
          "size": "35px",
          "height": "42px",
          "maxWidth": "980px"
        },
        "medium": {
          "size": "49px",
          "height": "56px",
          "maxWidth": "1372px"
        },
        "large": {
          "size": "63px",
          "height": "70px",
          "maxWidth": "1764px"
        },
        "xlarge": {
          "size": "77px",
          "height": "84px",
          "maxWidth": "2156px"
        }
      },
      "3": {
        "small": {
          "size": "30px",
          "height": "37px",
          "maxWidth": "849px"
        },
        "medium": {
          "size": "40px",
          "height": "47px",
          "maxWidth": "1111px"
        },
        "large": {
          "size": "49px",
          "height": "56px",
          "maxWidth": "1372px"
        },
        "xlarge": {
          "size": "58px",
          "height": "65px",
          "maxWidth": "1633px"
        }
      },
      "4": {
        "small": {
          "size": "26px",
          "height": "33px",
          "maxWidth": "719px"
        },
        "medium": {
          "size": "30px",
          "height": "37px",
          "maxWidth": "849px"
        },
        "large": {
          "size": "35px",
          "height": "42px",
          "maxWidth": "980px"
        },
        "xlarge": {
          "size": "40px",
          "height": "47px",
          "maxWidth": "1111px"
        }
      },
      "5": {
        "small": {
          "size": "19px",
          "height": "26px",
          "maxWidth": "523px"
        },
        "medium": {
          "size": "19px",
          "height": "26px",
          "maxWidth": "523px"
        },
        "large": {
          "size": "19px",
          "height": "26px",
          "maxWidth": "523px"
        },
        "xlarge": {
          "size": "19px",
          "height": "26px",
          "maxWidth": "523px"
        }
      },
      "6": {
        "small": {
          "size": "16px",
          "height": "23px",
          "maxWidth": "457px"
        },
        "medium": {
          "size": "16px",
          "height": "23px",
          "maxWidth": "457px"
        },
        "large": {
          "size": "16px",
          "height": "23px",
          "maxWidth": "457px"
        },
        "xlarge": {
          "size": "16px",
          "height": "23px",
          "maxWidth": "457px"
        }
      }
    }
  },
  "paragraph": {
    "small": {
      "size": "19px",
      "height": "26px",
      "maxWidth": "523px"
    },
    "medium": {
      "size": "21px",
      "height": "28px",
      "maxWidth": "588px"
    },
    "large": {
      "size": "26px",
      "height": "33px",
      "maxWidth": "719px"
    },
    "xlarge": {
      "size": "30px",
      "height": "37px",
      "maxWidth": "849px"
    },
    "xxlarge": {
      "size": "40px",
      "height": "47px",
      "maxWidth": "1111px"
    }
  },
  "text": {
    "xsmall": {
      "size": "16px",
      "height": "23px",
      "maxWidth": "457px"
    },
    "small": {
      "size": "19px",
      "height": "26px",
      "maxWidth": "523px"
    },
    "medium": {
      "size": "21px",
      "height": "28px",
      "maxWidth": "588px"
    },
    "large": {
      "size": "26px",
      "height": "33px",
      "maxWidth": "719px"
    },
    "xlarge": {
      "size": "30px",
      "height": "37px",
      "maxWidth": "849px"
    },
    "xxlarge": {
      "size": "40px",
      "height": "47px",
      "maxWidth": "1111px"
    }
  },
  "scale": 1
});

export default theme;
