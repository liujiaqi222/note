(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    echarts.registerTheme('chalk', {
        "color": [
            '#0ba82c',
            '#2c6eff',
            '#16f2d9',
            '#fe211e',
            '#fa6900',
            "#eedd78",
            "#73a373",
            "#73b9bc",
            "#7289ab",
            "#91ca8c",
            "#f49f42"
        ],
        "backgroundColor": "#222733",
        "textStyle": {},
        "title": {
            "textStyle": {
                "color": "#ffffff"
            },
            "subtextStyle": {
                "color": "#dddddd"
            }
        },
        "line": {
            "itemStyle": {
                "borderWidth": "4"
            },
            "lineStyle": {
                "width": "3"
            },
            "symbolSize": "0",
            "symbol": "circle",
            "smooth": true
        },
        "radar": {
            "itemStyle": {
                "borderWidth": "4"
            },
            "lineStyle": {
                "width": "3"
            },
            "symbolSize": "0",
            "symbol": "circle",
            "smooth": true
        },
        "bar": {
            "itemStyle": {
                "barBorderWidth": 0,
                "barBorderColor": "#ccc"

            },
            "emphasis": {
                "itemStyle": {
                    "barBorderWidth": 0,
                    "barBorderColor": "#ccc"
                }
            },
        },
        "pie": {
            "itemStyle": {
                "borderWidth": 0,
                "borderColor": "#ccc"
                ,
                "emphasis": {
                    "itemStyle": {
                        "borderWidth": 0,
                        "borderColor": "#ccc"
                    }
                },
            },
            "scatter": {
                "itemStyle": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"

                },
                "emphasis": {
                    "itemStyle": {
                        "borderWidth": 0,
                        "borderColor": "#ccc"
                    }
                },
            },
            "boxplot": {
                "itemStyle": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "itemStyle": {
                        "borderWidth": 0,
                        "borderColor": "#ccc"
                    }
                }
            },
            "parallel": {
                "itemStyle": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "itemStyle": {
                        "borderWidth": 0,
                        "borderColor": "#ccc"
                    }
                },
            },
            "sankey": {
                "itemStyle": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                    ,

                },
                "emphasis": {
                    "itemStyle": {
                        "borderWidth": 0,
                        "borderColor": "#ccc"
                    }
                },
            },
            "funnel": {
                "itemStyle": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                    ,

                },
                "emphasis": {
                    "itemStyle": {
                        "borderWidth": 0,
                        "borderColor": "#ccc"
                    }
                },
            },
            "gauge": {
                "itemStyle": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                    ,
                },
                "emphasis": {
                    "itemStyle": {
                        "borderWidth": 0,
                        "borderColor": "#ccc"
                    }
                }
            },
            "candlestick": {
                "itemStyle": {
                    "color": "#fc97af",
                    "color0": "transparent",
                    "borderColor": "#fc97af",
                    "borderColor0": "#87f7cf",
                    "borderWidth": "2"
                }
            },
            "graph": {
                "itemStyle": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "lineStyle": {
                    "width": "1",
                    "color": "#ffffff"

                },
                "symbolSize": "0",
                "symbol": "circle",
                "smooth": true,
                "color": [
                    "#759aa0",
                    "#dd6b66",
                    "#e69d87",
                    "#8dc1a9",
                    "#ea7e53",
                    "#eedd78",
                    "#73a373",
                    "#73b9bc",
                    "#7289ab",
                    "#91ca8c",
                    "#f49f42"
                ],
                "label": {
                    "color": "#293441"
                }
            },
            "map": {
                "itemStyle": {

                    "areaColor": "#f3f3f3",
                    "borderColor": "#999999",
                    "borderWidth": 0.5
                
                },
                "label": {

                    "color": "#893448",


                },
                "emphasis": {
                    "label": {
                        "color": "rgb(137,52,72)"
                    },
                    "map": {
                        "areaColor": "rgba(255,178,72,1)",
                        "borderColor": "#eb8146",
                        "borderWidth": 1
                    }
                }
            },
            "geo": {
                "itemStyle": {

                    "areaColor": "#f3f3f3",
                    "borderColor": "#999999",
                    "borderWidth": 0.5
                    ,

                },
                "emphasis": {
                    "itemStyle": {
                        "areaColor": "rgba(255,178,72,1)",
                        "borderColor": "#eb8146",
                        "borderWidth": 1
                    },
                    "label": {
                        "color": "rgb(137,52,72)"
                    }
                },
                "label": {
                    "color": "#893448"
                },
            
            },
            "categoryAxis": {
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": "#666666"
                    }
                },
                "axisTick": {
                    "show": false,
                    "lineStyle": {
                        "color": "#333"
                    }
                },
                "axisLabel": {
                    "show": true,
                    "color": "#aaaaaa"
                },
                "splitLine": {
                    "show": false,
                    "lineStyle": {
                        "color": [
                            "#e6e6e6"
                        ]
                    }
                },
                "splitArea": {
                    "show": false,
                    "areaStyle": {
                        "color": [
                            "rgba(250,250,250,0.05)",
                            "rgba(200,200,200,0.02)"
                        ]
                    }
                }
            },
            "valueAxis": {
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": "#666666"
                    }
                },
                "axisTick": {
                    "show": false,
                    "lineStyle": {
                        "color": "#333"
                    }
                },
                "axisLabel": {
                    "show": true,
                    "color": "#aaaaaa"
                },
                "splitLine": {
                    "show": false,
                    "lineStyle": {
                        "color": [
                            "#e6e6e6"
                        ]
                    }
                },
                "splitArea": {
                    "show": false,
                    "areaStyle": {
                        "color": [
                            "rgba(250,250,250,0.05)",
                            "rgba(200,200,200,0.02)"
                        ]
                    }
                }
            },
            "logAxis": {
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": "#666666"
                    }
                },
                "axisTick": {
                    "show": false,
                    "lineStyle": {
                        "color": "#333"
                    }
                },
                "axisLabel": {
                    "show": true,
                    "color": "#aaaaaa"
                },
                "splitLine": {
                    "show": false,
                    "lineStyle": {
                        "color": [
                            "#e6e6e6"
                        ]
                    }
                },
                "splitArea": {
                    "show": false,
                    "areaStyle": {
                        "color": [
                            "rgba(250,250,250,0.05)",
                            "rgba(200,200,200,0.02)"
                        ]
                    }
                }
            },
            "timeAxis": {
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": "#666666"
                    }
                },
                "axisTick": {
                    "show": false,
                    "lineStyle": {
                        "color": "#333"
                    }
                },
                "axisLabel": {
                    "show": true,
                    "color": "#aaaaaa"
                },
                "splitLine": {
                    "show": false,
                    "lineStyle": {
                        "color": [
                            "#e6e6e6"
                        ]
                    }
                },
                "splitArea": {
                    "show": false,
                    "areaStyle": {
                        "color": [
                            "rgba(250,250,250,0.05)",
                            "rgba(200,200,200,0.02)"
                        ]
                    }
                }
            },
            "toolbox": {
                "iconStyle": {
                    "borderColor": "#999999",
                },
                "emphasis": {
                    "iconStyle": {
                        "borderColor": "#666666"
                    }
                }
            },
            "legend": {
                "textStyle": {
                    "color": "#fffff"
                }
            },
            "tooltip": {
                "axisPointer": {
                    "lineStyle": {
                        "color": "#cccccc",
                        "width": 1
                    },
                    "crossStyle": {
                        "color": "#cccccc",
                        "width": 1
                    }
                }
            },
            "timeline": {
                "lineStyle": {
                    "color": "#87f7cf",
                    "width": 1
                },
                "itemStyle": {
                    "color": "#87f7cf",
                    "borderWidth": 1
                    ,

                },
                "emphasis": {
                    "itemStyle": {
                        "color": "#f7f494"
                    },
                    "label": {
                        "color": "#87f7cf"
                    },
                    "controlStyle": {
                        "color": "#87f7cf",
                        "borderColor": "#87f7cf",
                        "borderWidth": 0.5
                    }
                },
                "controlStyle": {
                    "color": "#87f7cf",
                    "borderColor": "#87f7cf",
                    "borderWidth": 0.5
                    ,
                },
            
                "checkpointStyle": {
                    "color": "#fc97af",
                    "borderColor": "rgba(252,151,175,0.3)"
                },
                "label": {
                    "color": "#fff",

                },

            },
            "visualMap": {
                "color": [
                    "#fc97af",
                    "#87f7cf"
                ]
            },
            "dataZoom": {
                "backgroundColor": "rgba(255,255,255,0)",
                "dataBackgroundColor": "rgba(114,204,255,1)",
                "fillerColor": "rgba(114,204,255,0.2)",
                "handleColor": "#72ccff",
                "handleSize": "100%",
                "textStyle": {
                    "color": "#333333"
                }
            },
            "markPoint": {
                "label": {
                    "color": "#293441"

                    ,
                },
                "emphasis": {
                    "label": {
                        "textStyle": {
                            "color": "#293441"
                        }
                    }
                }
            }
        }
    });
}));
