export var writechoice = [{
        "innertype": "event",
        "clausetype": "事件类词条",
        "fields": [{
                "innerfield": "call",
                "field": "事件名称",
                "default": "请输入文本",
                "type": "input",
            },
            {
                "innerfield": "starttime",
                "field": "事件发生时间",
                "default": "如“2000.01.01",
                "type": "input"
            },
            {
                "innerfield": "endtime",
                "field": "事件结束时间",
                "default": "如：2000.01.01",
                "type": "input"
            },
            {
                "innerfield": "desc",
                "field": "事件描述",
                "default": "请输入文本",
                "type": "textarea"
            }
        ]
    },
    {
        "innertype": "definition",
        "clausetype": "概念类词条",
        "fields": [{
                "innerfield": "call",
                "field": "概念名称",
                "default": "如：龙，精灵，星际战舰等",
                "type": "input",
            },
            {
                "innerfield": "desc",
                "field": "概念描述",
                "default": "请输入文本",
                "type": "textarea"
            }
        ]
    },
    {
        "innertype": "character",
        "clausetype": "人物类词条",
        "fields": [{
                "innerfield": "call",
                "field": "人物名称",
                "default": "请输入名称",
                "type": "input",
            },
            {
                "innerfield": "life",
                "field": "生平",
                "default": "请输入文本",
                "type": "textarea"
            }
        ]
    }
]

export function getchoice(innertype) {
    let index = -1;
    writechoice.forEach((v, i) => {
        if (v.innertype == innertype) {
            index = i;
        }
    })
    if (index == -1) {
        throw "没有该词条类型"
    } else {
        return {
            ...writechoice[index],
            index: index
        }
    }
}