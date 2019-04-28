module.exports = {
	titleData: titleData,
	postData: postData,
	contentData: contentData
}

function contentData(){
	let content = 
	`1. **湖畔食堂**

	2. ** 荔园食堂 **

	3. ** 欣园食堂 **，千万别去。

	![激光雷达点云2.png](https://i.loli.net/2019/04/25/5cc1b989d0c0f.png)

	一定要用Markdown语法，如果正文需要有图片，先上传到 https://sm.ms 再像上面一样。推荐使用typora作为编辑器，然后复制源代码模式的文本到这里。

	(must in markdown language, highly recommend typora as editor)`;
	return content;
}

function postData(){
	let posts = [
		{
			"id": 1,
			"category": "南科生活",
			"subcategory": "食: 南科大觅食大全",
			"tags": [
				"食堂",
				"美食",
				"特点",
				"我是许哥"
			],
			"title": "南科大各个食堂的特点",
			"summary": "湖畔>荔园>>欣园",
			"created_at": "2019-04-03T15:45:51.014822Z",
			"updated_at": "2019-04-25T13:45:24.551914Z"
		},
		{
			"id": 2,
			"category": "南科生活",
			"subcategory": "食: 南科大觅食大全",
			"tags": [
				"美食"
			],
			"title": "我想去吃烧烤",
			"summary": "烧烤！",
			"created_at": "2019-04-24T14:12:50.587200Z",
			"updated_at": "2019-04-24T16:09:43.681483Z"
		}
	];
	return posts;
}

function titleData(){
	let titles = [
		{
			"name": "南科生活",
			"subcategories": [
				"衣: 深圳气候、穿衣攻略",
				"食: 南科大觅食大全",
				"住: 南科寝室、周边住宿",
				"行: 校内交通、周边出行",
				"卫: 校医院、医保",
				"其他: 购物、理发、打印等"
			]
		},
		{
			"name": "南科办事",
			"subcategories": [
				"校园卡: 缴费、消费",
				"活动: 参加活动、办活动",
				"安全: 警察、消防、门卫",
				"就业: 实习、校招、三方"
			]
		},
		{
			"name": "南科娱乐",
			"subcategories": [
				"校内聚会",
				"校外娱乐"
			]
		}
	]
	return titles
}
