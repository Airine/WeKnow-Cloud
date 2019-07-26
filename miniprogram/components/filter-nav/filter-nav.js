Component({

  /**
   * 组件的属性列表
   */

  properties: {
    CourseInfo: {
      type: Object,
      value: {},
      // 监听器，实时更新数据
      observer: function(newVal, oldVal, changedPath) {
        // const sideList = newVal.district ? newVal.district.subItems : [];
        this.setData({
          selectTerm: this.data.selectTerm
        })
      }
    },
    hidden: {
      type: Boolean,
      value: true,
      observer: function(newVal) {
        if (newVal) {
          this.setData({
            itemNum: -1
          })
        }
      }
    }
  },


  /**
   * 组件的初始数据
   */

  data: {
    itemNum: -1,
    itemName1: "学期",
    itemName2: "课程分类",
    itemName3: "分数",
    selectTermID: -1, // 选择的学期ID
    selectCateID: -1, // 选择的课程类型ID
    selectGradeID: -1, // 选择的分数ID

  },
  /** 
   * create(){

    }
  */

  methods:{

  }
})