//index.js
const app = getApp()

Page({
  data: {
    pageinfos: []
  },

  onLoad: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    // 初始化词条数据
    this.initdata();
  },

  initdata: function () {
    let infos = this.data.pageinfos;
    infos.push({
      //唯一标识符
      "id": "item_1",
      //主要信息
      "head": {
        //词条描述
        "main": {
          "name": "测试词条名",
          "simple_desc": "简略描述",
          "detailed_desc": "详细描述"
        },
        //属性栏
        "attribute_bar": [{
            "attribute": "属性1",
            "value": "值1"
          },
          {
            "attribute": "属性2",
            "value": "值2"
          }
        ],
        //tag列表
        "tag_list": [
          "tag_id_1", "tag_id_2"
        ]
      },
      //相关信息
      "relative": [{
        "first_title": "一级标题1",
        "children": [{
            "second_title": "二级标题1",
            "content": (new Array(100)).join("内容1")
          },
          {
            "second_title": "二级标题2",
            "content": (new Array(100)).join("内容2")
          }
        ]
      }]
    });
    infos.push({
      //唯一标识符
      "id": "item_2",
      //主要信息
      "head": {
        //词条描述
        "main": {
          "name": "游戏",
          "simple_desc": "娱乐的方式",
          "detailed_desc": "游戏是所有哺乳类动物，特别是灵长类动物学习生存的第一步。它是一种基于物质需求满足之上的，在一些特定时间、空间范围内遵循某种特定规则的，追求精神世界需求满足的社会行为方式，但同时这种行为方式也是哺乳类动物或者灵长类动物所需的一种降压减排的方式，不管是在出生幼年期，或者发育期，成熟期都会需要的一种行为方式。"
        },
        //属性栏
        "attribute_bar": [{
            "attribute": "中文名",
            "value": "游戏"
          },
          {
            "attribute": "外文名",
            "value": "game，Play，Pastime，Playgame等等"
          },
          {
            "attribute": "分类",
            "value": "电子游戏和现实活动性游戏"
          },
          {
            "attribute": "拼音",
            "value": "电子游戏和现实活动性游戏"
          },
          {
            "attribute": "日文",
            "value": "ゲーム"
          }
        ],
        //tag列表
        "tag_list": [
          "娱乐方式"
        ]
      },
      /*
    
      */
      //相关信息
      "relative": [{
          "first_title": "定义理论",
          "children": [{
              "second_title": "词语解释",
              "content": "游戏有智力游戏和活动性游戏之分，前者如下棋、积木、麻将、打牌等，后者如追逐、接力及利用球、棒、绳等器材进行的活动，多为集体活动，并有情节和规则，具有竞赛性。当前日常用语中的“游戏”多指各种平台上的电子游戏。电子游戏有单机游戏和网络游戏。"
            },
            {
              "second_title": "发展演变",
              "content": "游戏，伴动物而生。在动物世界里，游戏是各种动物熟悉生存环境、彼此相互了解、习练竞争技能、进而获得“天择”的一种本领活动。游戏，随人类而造。在人类社会中，游戏不仅仅保留着动物本能活动的特质，更重要的是作为高等动物的人类，为了自身发展的需要创造出多种多样的游戏活动。游戏，并非为娱乐而生，而是一个严肃的人类自发活动，怀有生存技能培训和智力培养的目标。"
            },
            {
              "second_title": "游戏理论",
              "content": "本能说:德国诗人和剧作家席勒认为，“人类在生活中要受到精神与物质的双重束缚，在这些束缚中就失去了理想和自由。于是人们利用剩余的精神创造一个自由的世界，它就是游戏。这种创造活动，产生于人类的本能”。"
            }
          ]
        },
        {
          "first_title": "游戏分类",
          "children": [{
              "second_title": "基本分类",
              "content": "RPG,ACT,AVG,FPS,TPS,GAL,MMORPG,ACG,MOBA"
            },
            {
              "second_title": "大体分类",
              "content": "单机游戏,网络游戏,桌面游戏,网页游戏,街机游戏,手机游戏"
            }
          ]
        },
        {
          "first_title": "注意事项",
          //可以没有二级目录
          "content": "世卫组织提醒，游戏玩家应警惕耗费在游戏上的时间，不要让游戏影响到其他日常活动，并警惕玩游戏在身心健康和社交方面引发的所有变化。"
        }
      ]
    });

    infos.forEach(v => {
      wx.setStorage({
        data: v,
        key: v.id,
      })
    })

    this.setData({
      pageinfos: infos
    })
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

})
