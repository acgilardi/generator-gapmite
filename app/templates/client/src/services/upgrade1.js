var Upgrade1 = module.exports = function() {
    return {
        version: 1,
        collections: [
            "category",
            "goal",
            "preference",
            "profile",
            "schedule",
            "template"
        ],
        saves: {
            "goal":[
                {
                    _id: 1,
                    title: "Goal 1",
                    description: "This is goal 1",
                    profile_id: 1,
                    template_id: 1,
                    goaldate: "",
                    metgoal: false,
                    thingid_guid: '',
                    thingversion_guid: '',
                    lastupdate: ''
                },
                {
                    _id: 2,
                    title: "Goal 2",
                    description: "This is goal 2",
                    profile_id: 1,
                    template_id: 2,
                    goaldate: "",
                    metgoal: false,
                    thingid_guid: '',
                    thingversion_guid: '',
                    lastupdate: ''
                }
            ],
            "category":[
                {
                    "_id": 1,
                    "name": app.loc.__("cat-exercise-name"),
                    "description": app.loc.__("cat-exercise-desc"),
                    "icon":"exercise_48.png"
                },
                {
                    "_id": 2,
                    "name":"Measurements",
                    "description":"All Measurements",
                    "icon":"measurements_48.png"
                },
                {
                    "_id": 3,
                    "name":"Diet",
                    "description":"Diet Related",
                    "icon":"diet_48.png"
                },
                {
                    "_id": 4,
                    "name":"Medication",
                    "description":"Medication and Vitamins",
                    "icon":"medication_48.png"
                },
                {
                    "_id": 5,
                    "name":"Lifestyle",
                    "description":"General Lifestyle",
                    "icon":"lifestyle_48.png"
                },
                {
                    "id": 6,
                    "name":"Checklist",
                    "description":"Checklist Goals",
                    "icon":"checklist_48.png"
                }
            ],
            "preference": [
                {
                    "firstVisit": true,
                    "locale": "en-US"
                }
            ],
            "template": [
                {
                    "_id": 1,
                    "type": "timed",
                    "description": app.loc.__("temp-timed-desc"),
                    "category_id": "1",
                    "icon": "timed_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": true,
                    "syncapis": "",
                    "allowmultiple": true,
                    "title": app.loc.__("temp-timed-title")
                },
                {
                    "_id": 2,
                    "type": "distance",
                    "description": "Exercise tracked by distance",
                    "category_id": "1",
                    "icon": "distance_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": true,
                    "syncapis": "",
                    "allowmultiple": true,
                    "title": "Distance Exercise"
                },
                {
                    "_id": 3,
                    "type": "calories",
                    "description": "Exercise tracked by calories burned",
                    "category_id": "1",
                    "icon": "calories_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": true,
                    "syncapis": "",
                    "allowmultiple": true,
                    "title": "Calories Burned Exercise"
                },
                {
                    "_id": 4,
                    "type": "fiber",
                    "description": "Daily fiber goal",
                    "category_id": "3",
                    "icon": "fiber_48",
                    "ismedication": false,
                    "isserving": true,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Fiber"
                },
                {
                    "_id": 5,
                    "type": "vegetables",
                    "description": "Add and track a daily vegetable goal",
                    "category_id": "3",
                    "icon": "vegetables_48",
                    "ismedication": false,
                    "isserving": true,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Vegetables"
                },
                {
                    "_id": 6,
                    "type": "fruit",
                    "description": "Add and track a daily fruit goal",
                    "category_id": "3",
                    "icon": "fruit_48",
                    "ismedication": false,
                    "isserving": true,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Fruit"
                },
                {
                    "_id": 7,
                    "type": "water",
                    "description": "Add and track a daily water goal",
                    "category_id": "3",
                    "icon": "water_48",
                    "ismedication": false,
                    "isserving": true,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Water"
                },
                {
                    "_id": 8,
                    "type": "juicing",
                    "description": "Add a juicing detox or natural juice diet",
                    "category_id": "3",
                    "icon": "juicing_48",
                    "ismedication": false,
                    "isserving": true,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Juicing Therapy"
                },
                {
                    "_id": 9,
                    "type": "medication",
                    "description": "Add and track a daily medication",
                    "category_id": "4",
                    "icon": "medication_48",
                    "ismedication": true,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": false,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": true,
                    "title": "Medication"
                },
                {
                    "_id": 10,
                    "type": "vitamins",
                    "description": "Add and track a daily suppliment",
                    "category_id": "4",
                    "icon": "vitamins_48",
                    "ismedication": true,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": false,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": true,
                    "title": "Vitamins"
                },
                {
                    "_id": 11,
                    "type": "cholesteroldown",
                    "description": "Add a cholesterol lowering diet",
                    "category_id": "3",
                    "icon": "cholesteroldown_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Cholesterol Down"
                },
                {
                    "_id": 12,
                    "type": "journal",
                    "description": "Add daily journal entry",
                    "category_id": "5",
                    "icon": "journal_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": false,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Journal Entry"
                },
                {
                    "id": 13,
                    "type": "family",
                    "description": "Add a goal for time with others",
                    "category_id": "5",
                    "icon": "family_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Family"
                },
                {
                    "_id": 14,
                    "type": "spirituality",
                    "description": "Add a goal for spiritual reflection",
                    "category_id": "5",
                    "icon": "spirituality_48",
                    "ismedication": false,
                    "isserving": true,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": true,
                    "title": "Spirituality"
                },
                {
                    "_id": 15,
                    "type": "weight",
                    "description": "Add and track your weight goal",
                    "category_id": "2",
                    "icon": "weight_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": true,
                    "isgoaltracked": true,
                    "issyncable": true,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Weight"
                },
                {
                    "_id": 16,
                    "type": "cholesterol",
                    "description": "Add and track cholesterol levels",
                    "category_id": "2",
                    "icon": "cholesterol_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": true,
                    "isgoaltracked": true,
                    "issyncable": true,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Weight"
                },
                {
                    "_id": 17,
                    "type": "bloodpressure",
                    "description": "Add and track your blood pressure",
                    "category_id": "2",
                    "icon": "bloodpressure_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": true,
                    "isgoaltracked": true,
                    "issyncable": true,
                    "syncapis": "",
                    "allowmultiple": true,
                    "title": "Blood Pressure"
                },
                {
                    "_id": 18,
                    "type": "checkitem",
                    "description": "Add a checklist item",
                    "category_id": "6",
                    "icon": "checkitem_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": true,
                    "title": "Checklist Item"
                }
            ]
        }
    };
};
