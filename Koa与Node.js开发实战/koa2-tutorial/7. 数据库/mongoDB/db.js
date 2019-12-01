const Course = require('./model/course');

const getCourseList = async () => {
    return await Course.find({}).sort({
        'startTime.time': 1
    });
}

const getCourseById = async (id) => {
    return await Course.findById(id);
}

const getCourseByTime = async (start, end, weekday) => {
    return await Course.find({
            weekday: weekday
        })
        .where('startTime.time').gte(start.hour * 100 + start.minute)
        .where('endTime.time').lte(end.hour * 100 + end.minute);
}
const addCourse = async (course) => {
    const { name, weekday, startTime, endTime } = course;
    const item = await getCourseByTime(startTime, endTime, weekday);
    if (item) {
        throw new Error('当前时间段已经安排了课程');
    }
    return await Course.create(course);
}

const updateCourse = async (id, course) => {
    return await Course.update({
        _id: id
    }, course);
}

const removeCourse = async (id) => {
    return await Course.remove({
        _id: id
    });
}

module.exports = {
    getCourseList,
    getCourseById,
    addCourse,
    updateCourse,
    removeCourse
}