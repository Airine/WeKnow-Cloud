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
    selectTermId: -1, // 选择的学期ID
    selectCateId: -1, // 选择的课程类型ID
    selectGradeId: -1, // 选择的分数ID
  },
  /** 
   * create(){

    }
  */

  methods: {

    // 导航栏的点击事件，决定了选择学期/课程分类/分数
    selectItemNum(e) {
      const itemNum = e.currentTarget.dataset.itemNum
      let num = itemNum
      if (this.data.itemNum !== -1) {
        num = itemNum === this.data.itemNum ? -1 : itemNum
      }
      this.setData({
        itemNum: num
      })
    },

    // 选择课程分类的点击事件
    selectCategory(e) {
      const cate = e.currentTarget.dataset.category
      let cateName = cate.name
      if (cate.id === -1) {
        cateName = '全部'
      }
      this.triggerEvent('change', {
        cateId: cate.id
      })
      this.setData({
        selectCateId: cate.id,
        itemName2: cateName,
        itemNum: -1
      })
    },

    // 选择学期的点击事件
    selectTerm(e) {
      const term = e.currentTarget.dataset.term
      console.log(term)
      let termName = term.name
      if (term.id == -1) {
        termName = '全部'
      }
      this.triggerEvent('change', {
        termId: term.id
      })
      this.setData({
        selectTermId: term.id,
        itemName1: termName,
        itemNum: -1
      })
    },

    // 选择分数的点击事件
    gradeSelectItem(e) {
      const grade = e.currentTarget.dataset.grade
      console.log(grade)
      let gradeName = grade.name
      if (grade.id == -1) {
        gradeName = '全部'
      }
      // 注意这里的triggerEvent可能要做修改
      this.triggerEvent('change', {
        gradeId: grade.id
      })
      this.setData({
        selectGradeId: grade.id,
        itemName3: gradeName,
        itemNum: -1
      })
    },

    // 分数一栏的重置事件
    reset(e) {},

    // 分数一栏的确定事件
    confirm(e) {},

    // 蒙板的点击事件
    cancal() {
      this.setData({
        itemNum: -1
      })
    },
  }
})